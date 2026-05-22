import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Apple Calendar",
  description: "Apple カレンダーは macOS および iOS の両モバイル OS で動作します。Apple の iCloud サービスを用いたカレンダーのクラウドバックアップを提供し、Google Calendar や Microsoft Exchange Server とも同期できます。時間・場所・所要時間・補足メモを含むイベントをスケジュールできます。",
  installed: true,
  type: "apple_calendar",
  title: "Apple Calendar",
  variant: "calendar",
  categories: ["calendar"],
  category: "calendar",
  logo: "icon.svg",
  publisher: "Cal.diy",
  slug: "apple-calendar",
  url: "https://cal.com/",
  email: "help@cal.com",
  dirName: "applecalendar",
  isOAuth: false,
} as AppMeta;

export default metadata;
