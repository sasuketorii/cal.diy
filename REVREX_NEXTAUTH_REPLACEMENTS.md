# next-auth/react Replacement Map (revrex/main)

Phase 4 (EXEC-CALDIY-VPS-001) では `next-auth/react` の import を含むファイルが 67 件存在する。
**本ブランチではこれらのファイルの import 自体は削除しない** (UI コンポーネント本体の改造は最小限という方針のため)。

理由:
- 本番では Cloudflare Worker (`infra/cloudflare-worker/`) が前段でリクエストを intercept し、rev_license の AAL2 セッションを検証してから upstream に到達する。
- ボタン押下時に `signIn()` などが呼ばれても、遷移先 (`/api/auth/signin` 等) は本ハンドラ (`pages/api/auth/[...nextauth].ts`) が 410 を返すため、副作用は発生しない (UI 上のリンクが死んでいるだけ)。
- 67 ファイルを大規模に書き換えると上流 sync (`git rebase main`) で conflict が頻発するため、影響を最小化する。

ただし将来 (Phase 5 以降) で UI を整理する際に参照できるよう、置換マッピングを記録する。

## 対象 import パターン

```typescript
import { signIn, signOut, useSession, getSession, SessionProvider } from "next-auth/react";
```

## 推奨置換 (将来作業)

### `signIn(provider, options)` / `signIn()`

ユーザを login 画面へ送るだけのケースが大半。代替:

```typescript
// Before
import { signIn } from "next-auth/react";
signIn();
// or
signIn("credentials", { callbackUrl: "/" });

// After (rev_license redirect)
const goToLogin = (callbackUrl?: string) => {
  const next = callbackUrl ? `?next=${encodeURIComponent(callbackUrl)}` : "";
  window.location.href = `/auth/login${next}`;
  // CF Worker が /auth/login を rev_license の AAL2 challenge にリダイレクト
};
```

### `signOut(options)`

```typescript
// Before
import { signOut } from "next-auth/react";
signOut({ callbackUrl: "/auth/logout" });

// After
const logout = () => {
  window.location.href = "/auth/logout";
  // CF Worker が rev_license のセッションを invalidate
};
```

### `useSession()` / `getSession()`

セッション情報の取得は rev_license が発行する JWT (or signed cookie) を CF Worker が
upstream に `x-revrex-user-id` / `x-revrex-user-email` 等のヘッダで渡す前提。
フロントエンドでセッション state が必要な場合は API (`/api/me`) 経由で取得するよう書き換える。

```typescript
// Before
const { data: session, status } = useSession();

// After
import useSWR from "swr";
const { data: session } = useSWR("/api/me", fetcher);
// session は { user: { id, email, name } } の形を想定
```

### `<SessionProvider>`

ルートからは削除可能 (上記の SWR ベース fetch に統一)。
ただし `apps/web/app/providers.tsx` などで使われているため、Phase 5 で context shim に置換するか
SWR provider に置き換える。

## 影響ファイル一覧 (67 件、2026-05-22 時点)

詳細は以下コマンドで再生成可能:

```bash
grep -rln 'from "next-auth/react"' apps/web packages \
  --include="*.ts" --include="*.tsx" | sort
```

主要なグルーピング:

- **モーダル / ダイアログ系**: `modules/users/components/UserTable/*`, `modules/data-table/components/segment/*`
- **設定画面**: `modules/settings/security/*`, `modules/settings/my-account/*`
- **認証 view 本体**: `modules/auth/login-view.tsx`, `modules/auth/signin-view.tsx`, `modules/auth/logout-view.tsx`, `modules/auth/verify-*.tsx`
- **シェル / ナビ**: `modules/shell/Shell.tsx`, `modules/shell/SideBar.tsx`, `modules/shell/TopNav.tsx`, `modules/shell/Kbar.tsx`
- **App プロバイダ**: `app/providers.tsx`, `lib/app-providers.tsx`, `lib/app-providers-app-dir.tsx`
- **その他 hooks**: `modules/bookings/hooks/*`, `modules/auth/hooks/*`, `modules/shell/banners/useBanners.ts`

## CI gate との関係

rev_rex 直下の CI grep gate (`.github/workflows/*` の secret-scan / nextauth-scan) は `apps/caldiy/**` を
明示的に除外しているため、fork 側でこれらの import が残っていても CI は通る。

ただし Phase 6 の検証で実際に画面遷移が発生するボタンが残っていないか、
playwright で smoke test を行う予定。
