import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Jitsi Video",
  description: "Jitsi は Web とモバイル向けの無料オープンソースビデオ会議ソフトウェアです。通話を行ったり、自前のサーバーで起動したり、自分のアプリに統合したりできます。",
  installed: true,
  type: "jitsi_video",
  variant: "conferencing",
  categories: ["conferencing"],
  logo: "icon.svg",
  publisher: "Cal.diy",
  url: "https://jitsi.org/",
  slug: "jitsi",
  title: "Jitsi Meet",
  isGlobal: false,
  email: "help@cal.com",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:jitsi",
      label: "Jitsi Video",
    },
  },
  dirName: "jitsivideo",
  concurrentMeetings: true,
  isOAuth: false,
} as AppMeta;

export default metadata;
