import process from "node:process";
import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Cal Video",
  description: "Cal Video は Daily.co を基盤とした自社製の Web ベースのビデオ会議プラットフォームです。ミニマルかつ軽量でありながら、必要な機能の大半を備えています。",
  installed: !!process.env.DAILY_API_KEY,
  type: "daily_video",
  variant: "conferencing",
  url: "https://daily.co",
  categories: ["conferencing"],
  logo: "icon.svg",
  publisher: "Cal.diy",
  category: "conferencing",
  slug: "daily-video",
  title: "Cal Video",
  isGlobal: true,
  email: "help@cal.com",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:daily",
      label: "Cal Video",
    },
  },
  key: { apikey: process.env.DAILY_API_KEY },
  dirName: "dailyvideo",
  isOAuth: false,
} as AppMeta;

export default metadata;
