import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Giphy",
  description: "GIPHY は最高で最新の GIF とアニメーションステッカーを集めた一大ソースです。面白い GIF、リアクション GIF、ユニークな GIF など、あらゆる種類が見つかります。",
  installed: true,
  categories: ["other"],
  logo: "icon.svg",
  publisher: "Cal.diy",
  slug: "giphy",
  title: "Giphy",
  type: "giphy_other",
  url: "https://cal.com/apps/giphy",
  variant: "other",
  extendsFeature: "EventType",
  email: "help@cal.com",
  dirName: "giphy",
  isOAuth: false,
} as AppMeta;

export default metadata;
