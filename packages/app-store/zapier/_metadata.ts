import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Zapier",
  description: "誰でも使えるワークフロー自動化です。Cal.diy の Zapier アプリを使って、予約の作成・予約変更・キャンセル時、またはミーティング終了後にワークフローをトリガーできます。",
  installed: true,
  category: "automation",
  categories: ["automation"],
  logo: "icon.svg",
  publisher: "Cal.diy",
  slug: "zapier",
  title: "Zapier",
  type: "zapier_automation",
  url: "https://zapier.com/apps/calcom/integrations",
  variant: "automation",
  email: "help@cal.com",
  dirName: "zapier",
  isOAuth: false,
} as AppMeta;

export default metadata;
