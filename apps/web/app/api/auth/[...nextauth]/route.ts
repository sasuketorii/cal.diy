// REVREX: NextAuth disabled — auth is delegated to rev_license via CF Worker.
// See: https://github.com/sasuketorii/rev_rex/blob/main/docs/EXEC_PLAN_CALDIY.md §5 Phase 4
//
// 上流 cal.diy main では NextAuth ハンドラは Pages Router 側 (pages/api/auth/[...nextauth].ts)
// にしか存在しないが、Phase 6 で fork が App Router に migration された場合に備えて
// App Router 用の 410 ハンドラも同時に置いておく (defense in depth)。
import { NextResponse } from "next/server";

const GONE = () =>
  new NextResponse(
    JSON.stringify({
      error: "auth_disabled",
      message:
        "Authentication is handled by rev_license. Visit https://caldiy.internal.revrex/ via the CF Worker gate.",
    }),
    {
      status: 410,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    }
  );

export const GET = GONE;
export const POST = GONE;
export const PUT = GONE;
export const DELETE = GONE;
export const PATCH = GONE;
