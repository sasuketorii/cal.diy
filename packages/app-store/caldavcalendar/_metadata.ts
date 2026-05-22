import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "CalDav (Beta)",
  description: "CalDAV は、異なるクライアントやサーバーがリモートサーバー上のスケジュール情報にアクセスし、同一サーバーや他サーバーのユーザーとミーティングをスケジュールできるようにするプロトコルです。WebDAV 仕様を拡張し、データには iCalendar 形式を用います。",
  installed: true,
  type: "caldav_calendar",
  title: "CalDav (Beta)",
  variant: "calendar",
  category: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Cal.diy",
  slug: "caldav-calendar",
  url: "https://cal.com/",
  email: "help@cal.com",
  dirName: "caldavcalendar",
  isOAuth: false,
} as AppMeta;

export default metadata;
