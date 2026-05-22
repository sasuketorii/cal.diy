import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Feishu Calendar",
  description: "Feishu カレンダーは Feishu が開発したタイムマネジメント・スケジューリングサービスです。種類や時間を選択しながらイベントを作成・編集できます。Feishu アカウントを持つすべてのユーザーが、モバイル版・Web 版の両方で利用できます。",
  installed: true,
  type: "feishu_calendar",
  title: "Feishu Calendar",
  variant: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Feishu",
  slug: "feishu-calendar",
  url: "https://feishu.cn/",
  email: "alan@larksuite.com",
  dirName: "feishucalendar",
} as AppMeta;

export default metadata;
