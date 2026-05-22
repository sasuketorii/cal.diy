import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Huddle01",
  description: "Huddle01 は Web3 ネイティブの新しいビデオ会議ソフトウェアで、分散版の Zoom に相当するものです。NFT コミュニティ、DAO、ビルダー向けの会話をサポートし、トークンゲーティング、NFT アバター、Web3 ログイン + ENS、IPFS への録画などの機能を備えています。",
  installed: true,
  type: "huddle01_video",
  variant: "conferencing",
  categories: ["video", "conferencing"],
  logo: "icon.svg",
  publisher: "huddle01.com",
  url: "https://huddle01.com",
  category: "conferencing",
  slug: "huddle01",
  title: "Huddle01",
  isGlobal: false,
  email: "support@huddle01.com",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:huddle01_video",
      label: "Huddle01 Video",
    },
  },
  dirName: "huddle01video",
  concurrentMeetings: true,
  isOAuth: false,
} as AppMeta;

export default metadata;
