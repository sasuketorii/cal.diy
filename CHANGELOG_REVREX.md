# Changelog — revrex/main

このファイルは sasuketorii/cal.diy `revrex/main` ブランチ独自の変更履歴です。
上流 calcom/cal.diy の CHANGELOG とは別管理。

形式: [Keep a Changelog](https://keepachangelog.com/) 準拠、SemVer 風だが上流追従のため日付ベース。

---

## v0.3.0 — 2026-05-22 (Phase 4: VPS hardening)

Plan: [EXEC-CALDIY-VPS-001](https://github.com/sasuketorii/rev_rex/blob/main/docs/EXEC_PLAN_CALDIY.md) §5 Phase 4

### Security

- **next を 16.2.6+ に固定** (`fix(security): pin next to 16.2.6+ via resolutions (CVE-2026-44574 series)`)
  - 上流 cal.diy main は次に `next@16.2.3` を使用しているが、CVE-2026-44574 / 44575 / 44578 / 44579 への
    対応として `resolutions` に `next` / `@next/bundle-analyzer` / `@next/env` / `@next/swc` を 16.2.6 に pin。
  - 併せて `react` / `react-dom` を 18.2.0 に明示 pin (apps/web/package.json と整合)。
  - 影響範囲: `apps/caldiy/package.json` のみ。Lockfile (yarn.lock) は Phase 6 (VPS 実機ビルド) で再生成。

### Auth

- **NextAuth ルートを 410 Gone 化** (`feat(auth): disable nextauth routes (410 Gone)`)
  - 認証は rev_license + Cloudflare Worker (AAL2 強制) に一本化。
  - `apps/web/pages/api/auth/[...nextauth].ts` を 410 を返すハンドラに置換 (Pages Router)。
  - App Router (`apps/web/app/api/auth/[...nextauth]/route.ts`) は元々存在しないため新規作成不要。
  - Phase 6 で `curl -i /api/auth/signin` が 410 を返すことを E2E で確認する。

- **next-auth/react 依存の処理** (`chore(auth): document next-auth/react replacements`)
  - クライアント側 `signIn` / `signOut` 呼出は 67 ファイルに散在。
  - 本番では Cloudflare Worker が前段でリクエストを intercept し、ボタン押下時の遷移先がそもそも到達不能になるため、
    UI 層の大規模改造は行わず、置換マッピングを `REVREX_NEXTAUTH_REPLACEMENTS.md` に記録 (Phase 5 以降で必要に応じて整理)。
  - rev_rex の CI grep gate (`/api/auth/(signin|callback)|next-auth/react.*signIn`) は `apps/caldiy/**` を対象外としているため fork 側は CI 制約なし。

### Infrastructure (Vercel 依存抽象化)

- **`@vercel/edge-config` を `ConfigStore` 抽象化** (`refactor(vercel): abstract edge-config to ConfigStore + redis backend`)
  - 新規 `packages/lib/config-store/` (memory + redis 実装) を追加。
  - `apps/web/proxy.ts` の `@vercel/edge-config` 直接呼出を `ConfigStore.get` に置換。
  - 環境変数 `EDGE_CONFIG_BACKEND` (`memory` / `redis`) で切替、`REDIS_URL` で接続先を指定。

- **`botid` と `vercel.json` cron を削除** (`chore(vercel): remove botid plugin and vercel.json cron`)
  - `botid/next/config` の `withBotId` プラグインを `next.config.ts` から除去。
  - `instrumentation-client.ts` の `initBotId()` をコメントアウト (no-op)。
  - `BotDetectionService.checkBotDetection` は `NEXT_PUBLIC_VERCEL_USE_BOTID_IN_BOOKER === "1"` ゲートで dormant 状態のため挙動は変わらず。
  - `apps/web/vercel.json` の `crons` 配列を削除 (cron は VPS の systemd timer + Cloudflare Cron Triggers に移管)。
  - `apps/web/package.json` の `botid` 依存はビルド時に必要なため当面保持 (Phase 5 で完全削除予定)。

### Operational notes

- 上流 calcom/cal.diy への push は禁止 (`origin = sasuketorii/cal.diy` のみ)。
- 本リリースの統合先 SHA は rev_rex 側 `docs/PHASE_4_REPORT.md` 参照。

---

## v0.2.0 — 2026-05-22 (Phase 1: submodule bootstrap)

- `revrex/main` ブランチを `calcom/cal.diy@180ede28f0` (main の commit) から派生。
- `REVREX.md` を追加 (ブランチ戦略、改造ポリシー、sync 手順)。
- 改造はまだ入っていない (Phase 4 で本格的な変更開始)。
