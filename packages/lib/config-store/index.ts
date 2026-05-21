// REVREX: Vercel @vercel/edge-config の抽象化レイヤ。
// セルフホスト (VPS) 環境では Vercel Edge Config を利用できないため、
// Redis (本番) / in-memory (test) の backend を選択できる ConfigStore interface を提供する。
//
// 利用側 (例: apps/web/proxy.ts) は @vercel/edge-config を直接 import せず、
// `createConfigStore()` の戻り値を介して `get` / `set` を呼ぶ。
//
// 環境変数:
//   EDGE_CONFIG_BACKEND = "memory" | "redis" (default: "memory")
//   REDIS_URL          = redis backend 接続先 (redis 選択時のみ参照)
//   EDGE_CONFIG_PREFIX = redis key のプレフィクス (default: "revrex:edge-config:")
//
// Refs: EXEC-CALDIY-VPS-001 Phase 4 §5-D

export interface ConfigStore {
  get<T = unknown>(key: string): Promise<T | null>;
  set?<T = unknown>(key: string, value: T, opts?: { ttlSec?: number }): Promise<void>;
}

class MemoryConfigStore implements ConfigStore {
  private store = new Map<string, { value: unknown; expiresAt: number | null }>();

  async get<T = unknown>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== null && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  async set<T = unknown>(key: string, value: T, opts?: { ttlSec?: number }): Promise<void> {
    const expiresAt = opts?.ttlSec ? Date.now() + opts.ttlSec * 1000 : null;
    this.store.set(key, { value, expiresAt });
  }
}

// Redis backend は同期的に redis client を import しない (test 環境などで Redis が不要な場合を考慮)。
// 実際の Redis client は createConfigStore() 内で dynamic import する。
class RedisConfigStore implements ConfigStore {
  private prefix: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- redis client の型は dynamic import
  private clientPromise: Promise<any>;

  constructor(redisUrl: string, prefix: string) {
    this.prefix = prefix;
    this.clientPromise = this.initClient(redisUrl);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 同上
  private async initClient(redisUrl: string): Promise<any> {
    // ioredis は cal.diy が既に依存している (packages/features/redis 等で利用) ため
    // 追加の dependency を増やさない。
    const { default: Redis } = await import("ioredis");
    const client = new Redis(redisUrl, {
      lazyConnect: false,
      maxRetriesPerRequest: 2,
    });
    return client;
  }

  private k(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const client = await this.clientPromise;
    const raw = await client.get(this.k(key));
    if (raw === null || raw === undefined) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      // 文字列値は JSON parse できないので raw を返す
      return raw as unknown as T;
    }
  }

  async set<T = unknown>(key: string, value: T, opts?: { ttlSec?: number }): Promise<void> {
    const client = await this.clientPromise;
    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    if (opts?.ttlSec) {
      await client.set(this.k(key), serialized, "EX", opts.ttlSec);
    } else {
      await client.set(this.k(key), serialized);
    }
  }
}

// Singleton: モジュール load 時に 1 度だけ生成。
let cachedStore: ConfigStore | null = null;

export function createConfigStore(): ConfigStore {
  if (cachedStore) return cachedStore;

  const backend = (process.env.EDGE_CONFIG_BACKEND ?? "memory").toLowerCase();
  const prefix = process.env.EDGE_CONFIG_PREFIX ?? "revrex:edge-config:";

  if (backend === "redis") {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      throw new Error(
        "[config-store] EDGE_CONFIG_BACKEND=redis is set but REDIS_URL is missing"
      );
    }
    cachedStore = new RedisConfigStore(redisUrl, prefix);
    return cachedStore;
  }

  if (backend !== "memory") {
    // 未知の backend 名は明示的にエラー (silent fallback は debug を困難にする)
    throw new Error(`[config-store] unknown EDGE_CONFIG_BACKEND: ${backend}`);
  }

  cachedStore = new MemoryConfigStore();
  return cachedStore;
}

// Test 用: cached singleton を破棄。
export function _resetConfigStoreForTests(): void {
  cachedStore = null;
}
