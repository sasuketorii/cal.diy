# Cal.diy — REV-C Fork (revrex/main)

このブランチは [REV-C](https://github.com/sasuketorii) によるカスタマイズ版です。
上流: [calcom/cal.diy](https://github.com/calcom/cal.diy) (MIT)

## ブランチ戦略

- `main`: 上流 calcom/cal.diy/main の純粋ミラー (改造を入れない、月次 sync 専用)
- `revrex/main`: 改造積上ブランチ (このブランチ)

rev_rex リポジトリの `apps/caldiy/` submodule は `revrex/main` を pin します。

## 同期手順 (月次)

```bash
git fetch upstream
git checkout main && git merge --ff-only upstream/main && git push origin main
git checkout revrex/main && git rebase main && git push origin revrex/main --force-with-lease
```

注意:
- `--force-with-lease` 必須 (`--force` は使わない)。並走作業者がいないことを確認してから実施。
- conflict が出た場合は手動で resolve し、改造ポリシー範囲内に収まることを確認。
- sync 完了後、rev_rex 側の submodule pin を更新する PR を作成。

## 改造ポリシー

本ブランチへの改造は以下に限定します。それ以外 (ビジネスロジック / UI コンポーネント本体) は無改変が原則:

1. **Next.js 16.2.6+ resolutions** (脆弱性対応) — Phase 4 で実施
   - `package.json` の `resolutions` に Next.js 最新を pin
2. **NextAuth ルート無効化** (`apps/web/app/api/auth/[...nextauth]/route.ts` の 410 化) — Phase 4 で実施
   - 認証は rev_license + Cloudflare Worker で一本化
3. **ja locale の品質向上** (`packages/i18n/locales/ja/common.json` 等) — Phase 5 で実施
   - 既存翻訳の不足/誤訳の修正
4. **Vercel 依存抽象化** (`@vercel/edge-config` 等の Redis 代替) — Phase 4 で実施
   - セルフホスト環境では Vercel SDK を利用できないため

## 統合先

[sasuketorii/rev_rex](https://github.com/sasuketorii/rev_rex) の `apps/caldiy/` に git submodule として組み込まれます。

統合の詳細設計:
- [docs/EXEC_PLAN_CALDIY.md](https://github.com/sasuketorii/rev_rex/blob/main/docs/EXEC_PLAN_CALDIY.md)
- [docs/INTEGRATION_CALDIY.md](https://github.com/sasuketorii/rev_rex/blob/main/docs/INTEGRATION_CALDIY.md)

Plan ID: `EXEC-CALDIY-VPS-001`

## ライセンス

上流 calcom/cal.diy と同じ MIT ライセンスを継承します。詳細は [LICENSE](./LICENSE) を参照。
