// REVREX: NextAuth disabled — auth is delegated to rev_license via CF Worker.
// See: https://github.com/sasuketorii/rev_rex/blob/main/docs/EXEC_PLAN_CALDIY.md §5 Phase 4
//
// 本ルートは 410 Gone を返すだけのスタブです。実際の認証フローは Cloudflare Worker
// (infra/cloudflare-worker/) が前段で intercept し、rev_license の AAL2 セッションを
//検証してから upstream に到達します。Worker をバイパスして直接アクセスされた場合の
// fail-closed 動作として 410 を返します。
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("cache-control", "no-store");
  res.status(410).json({
    error: "auth_disabled",
    message:
      "Authentication is handled by rev_license. Visit https://caldiy.internal.revrex/ via the CF Worker gate.",
  });
};

export default handler;
