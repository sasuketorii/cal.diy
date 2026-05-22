import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Outlook Calendar",
  description: "Microsoft Office 365 は他者とつながり、仕事を進めるためのアプリ群です。Microsoft Word、PowerPoint、Excel、Teams、OneNote、OneDrive などが含まれます。Office 365 を使えば、リモートでチームと協働し、オンライン環境で共同作業ができます。Web 版およびデスクトップ・モバイルアプリの両方で利用可能です。",
  type: "office365_calendar",
  title: "Outlook Calendar",
  variant: "calendar",
  category: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Cal.diy",
  slug: "office365-calendar",
  dirName: "office365calendar",
  url: "https://cal.com/",
  email: "help@cal.com",
  isOAuth: true,
} as AppMeta;

export default metadata;
