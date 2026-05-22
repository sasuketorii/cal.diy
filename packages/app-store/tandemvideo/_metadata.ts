import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "Tandem Video",
  description: "Tandem は、まるで物理オフィスにいるかのようにオンラインでチームをつなぐ、新しいバーチャルオフィス空間です。コワーキングルーム、対応可否ステータス、リアルタイムのビデオ通話、チャットなどを通じて、誰がいるかを確認しながら 1 クリックで会話・共同作業ができます。デスクトップ版とモバイル版の両方に対応したクロスプラットフォームです。",
  type: "tandem_video",
  title: "Tandem Video",
  variant: "conferencing",
  categories: ["conferencing"],
  slug: "tandem",
  category: "conferencing",
  logo: "icon.svg",
  publisher: "",
  url: "",
  isGlobal: false,
  email: "help@cal.com",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:tandem",
      label: "Tandem Video",
    },
  },
  dirName: "tandemvideo",
  isOAuth: true,
} as AppMeta;

export default metadata;
