import process from "node:process";
import { validJson } from "@calcom/lib/jsonUtils";
import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Google Calendar",
  description: "Google カレンダーは Google が開発したタイムマネジメント・スケジューリングサービスです。種類や時間を選択しながらイベントを作成・編集できます。Gmail アカウントを持つすべてのユーザーが、モバイル版・Web 版の両方で利用できます。",
  installed: !!(process.env.GOOGLE_API_CREDENTIALS && validJson(process.env.GOOGLE_API_CREDENTIALS)),
  type: "google_calendar",
  title: "Google Calendar",
  variant: "calendar",
  category: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Cal.diy",
  slug: "google-calendar",
  url: "https://cal.com/",
  email: "help@cal.com",
  dirName: "googlecalendar",
  isOAuth: true,
  delegationCredential: {
    // This is unused at the moment but should be used in future
    // For now, we have hardcoded imports in the codebase that are supported with Google Workspace(i.e. Google Calendar and Google Meet)
    workspacePlatformSlug: "google",
  },
} as AppMeta;

export default metadata;
