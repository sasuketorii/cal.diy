import process from "node:process";
import { validJson } from "@calcom/lib/jsonUtils";
import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Google Meet",
  description: "Google Meet は Google が提供する Web ベースのビデオ会議プラットフォームで、主要な会議プラットフォームに対抗するために設計されています。",
  installed: !!(process.env.GOOGLE_API_CREDENTIALS && validJson(process.env.GOOGLE_API_CREDENTIALS)),
  slug: "google-meet",
  category: "conferencing",
  categories: ["conferencing"],
  type: "google_video",
  title: "Google Meet",
  variant: "conferencing",
  logo: "logo.webp",
  publisher: "Cal.diy",
  url: "https://cal.com/",
  isGlobal: false,
  email: "help@cal.com",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:google:meet",
      label: "Google Meet",
    },
  },
  dirName: "googlevideo",
  dependencies: ["google-calendar"],
  isOAuth: false,
} as AppMeta;

export default metadata;
