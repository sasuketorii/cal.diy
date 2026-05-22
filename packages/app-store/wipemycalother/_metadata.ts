import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "WipeMyCal",
  description: "Wipe My Cal は Cal.diy 限定アプリで、複数のミーティングを同時に予約変更する体験を再定義します。アプリをインストールし、一括で予約変更したい日付に対して「Wipe」を選択するだけです。緊急事態、突然の体調不良、直前のイベントにも、ボタン 1 つで対応できます。",
  installed: true,
  category: "automation",
  categories: ["automation"],
  // If using static next public folder, can then be referenced from the base URL (/).
  logo: "icon-dark.svg",
  publisher: "Cal.diy",
  slug: "wipe-my-cal",
  title: "Wipe my cal",
  type: "wipemycal_other",
  url: "https://cal.com/apps/wipe-my-cal",
  variant: "other",
  email: "help@cal.com",
  dirName: "wipemycalother",
  isOAuth: false,
} as AppMeta;

export default metadata;
