import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Microsoft 365/Teams (Requires work/school account)",
  description: "Microsoft Teams は Microsoft 365 に含まれるビジネスコミュニケーションプラットフォーム兼共同作業ワークスペースです。ワークスペースチャット、ビデオ会議、ファイル保存、アプリケーション連携を提供します。Web 版およびデスクトップ・モバイルアプリの両方で利用可能です。注意: 職場 / 学校アカウントが必要です。",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:office365_video",
      label: "MS Teams (Requires work/school account)",
    },
  },
  type: "office365_video",
  title: "MS Teams (Requires work/school account)",
  variant: "conferencing",
  category: "conferencing",
  categories: ["conferencing"],
  logo: "icon.svg",
  publisher: "Cal.diy",
  slug: "msteams",
  dirName: "office365video",
  url: "https://www.microsoft.com/en-ca/microsoft-teams/group-chat-software",
  email: "help@cal.com",
  isOAuth: true,
} as AppMeta;

export default metadata;
