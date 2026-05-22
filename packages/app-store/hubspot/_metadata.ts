import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "HubSpot CRM",
  // biome-ignore lint/correctness/noProcessGlobal: Server-only metadata evaluated at build time
  installed: !!process.env.HUBSPOT_CLIENT_ID,
  description: "HubSpot はクラウドベースの CRM で、営業とマーケティングの連携、セールスイネーブルメントの推進、ROI の向上、インバウンドマーケティング戦略の最適化により、より質の高いリードを多く獲得することを目的としています。",
  type: "hubspot_crm",
  variant: "crm",
  logo: "icon.svg",
  publisher: "Cal.diy",
  url: "https://hubspot.com/",
  categories: ["crm"],
  label: "HubSpot CRM",
  slug: "hubspot",
  extendsFeature: "EventType",
  title: "HubSpot CRM",
  email: "help@cal.com",
  dirName: "hubspot",
  isOAuth: true,
} as AppMeta;

export default metadata;
