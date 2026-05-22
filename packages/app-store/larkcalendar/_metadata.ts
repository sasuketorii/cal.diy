import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Lark Calendar",
  description: "Lark カレンダーは Lark が開発したタイムマネジメント・スケジューリングサービスです。種類や時間を選択しながらイベントを作成・編集できます。Lark アカウントを持つすべてのユーザーが、モバイル版・Web 版の両方で利用できます。",
  installed: true,
  type: "lark_calendar",
  title: "Lark Calendar",
  variant: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Lark",
  slug: "lark-calendar",
  url: "https://larksuite.com/",
  email: "alan@larksuite.com",
  dirName: "larkcalendar",
  isOAuth: true,
} as AppMeta;

export default metadata;
