import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  linkType: "dynamic",
  name: "Zoom Video",
  description: "Zoom はセキュアで信頼性の高いビデオプラットフォームで、あらゆるオンラインコミュニケーションのニーズに対応します。1 対 1 のミーティング、チャット、電話、ウェビナー、大規模オンラインイベントまで提供できます。デスクトップ版、Web 版、モバイル版のすべてで利用可能です。",
  type: "zoom_video",
  categories: ["conferencing"],
  variant: "conferencing",
  logo: "icon.svg",
  publisher: "Cal.diy",
  url: "https://zoom.us/",
  category: "conferencing",
  slug: "zoom",
  title: "Zoom Video",
  email: "help@cal.com",
  appData: {
    location: {
      default: false,
      linkType: "dynamic",
      type: "integrations:zoom",
      label: "Zoom Video",
    },
  },
  dirName: "zoomvideo",
  isOAuth: true,
} as AppMeta;

export default metadata;
