# REVREX App Store Description Translations (ja)

REV-C 社の `apps/caldiy` 改造 (Phase 5.5 / EXEC-CALDIY-VPS-001) で、
App Store の各アプリ `description` (hard-code 英文) を日本語化するための
方針と語彙リファレンス。実際の翻訳マッピングは
`apps/caldiy/scripts/app-descriptions-ja.json` を正本とし、本ファイルは
意思決定の根拠と用語統一を記録する。

本ファイルは `revrex/main` 改造ブランチ専用。上流 (`calcom/cal.diy`) には
push しない。

---

## 1. 背景

Cal.com 上流の `packages/app-store/<app>/{config.json,_metadata.ts}` には、
i18n 化されていない hard-code の英文 `description` が 113 件残っている。
セットアップウィザード (`/getting-started` → step 3「アプリを有効にする」)
や App Store 一覧画面で、この英文がそのまま日本語ユーザーに表示されて
しまうため、Phase 5.5 で例外なく日本語化する。

---

## 2. 対象範囲

| 対象 | パターン |
|------|----------|
| ✅ JSON config | `packages/app-store/<app>/config.json` の `description` |
| ✅ TS metadata | `packages/app-store/<app>/_metadata.ts` の `description: "..."` |
| ✅ templates | `packages/app-store/templates/<tpl>/config.json` も対象 |
| ❌ アプリ内部 UI / ロジック | 触らない |
| ❌ `packages/i18n/locales/ja/common.json` | 既存翻訳がある場合はそれを優先 |
| ❌ Cal.com MIT attribution | Phase 5 と同じく維持 |

---

## 3. 用語統一 (`REVREX_GLOSSARY.md` 準拠)

| 原語 (en) | 訳語 (ja) | 補足 |
|-----------|-----------|------|
| Cal.diy / Cal.com | Cal.diy / Cal.com (description 内では原文ママ) | description は外部サービス文脈が多く、上流の MIT attribution を尊重して原文 brand を維持する。Phase 6 以降で再検討。 |
| meeting | ミーティング | "call" も基本「ミーティング」/「通話」 |
| booking | 予約 | |
| schedule (v) | スケジュールする / 予約する | |
| reschedule | 予約変更 | 「リスケ」「再スケジュール」は不可 |
| cancel | キャンセル | |
| availability | 空き時間 | |
| calendar | カレンダー | |
| video call | ビデオ通話 | |
| video conferencing | ビデオ会議 | |
| Web / web | Web | カタカナ化しない |
| privacy-first / privacy-focused | プライバシー重視 | |
| GDPR-compliant | GDPR 準拠 | |
| Google Analytics alternative | Google Analytics 代替 | |
| open-source | オープンソース | ハイフン無し |
| self-hosted | セルフホスト | |
| AI agent / AI voice agent | AI エージェント / AI 音声エージェント | |
| analytics | 分析 | "web analytics" → 「Web 分析」 |
| workflow automation | ワークフロー自動化 | |
| CRM | CRM | 英語のまま |
| short link | 短縮 URL | |
| conversion analytics | コンバージョン分析 | |
| affiliate program | アフィリエイトプログラム | |
| EWS (Exchange Web Services) | Exchange Web Services (EWS) | 略号は丸括弧で原語併記 |

固有名詞 (Google, Slack, Stripe, PostHog, Twilio, ... ) は英語のまま維持。

---

## 4. 翻訳例 (代表 15 件)

| App | 原文 (en) | 訳文 (ja) |
|-----|-----------|-----------|
| databuddy | Privacy-first web analytics for devs (Google Analytics alternative) — 3 KB, GDPR-compliant | 開発者向けプライバシー重視 Web 分析 (Google Analytics 代替) — 3 KB、GDPR 準拠。 |
| dub | Dub is the modern link attribution platform for you to create short links, track conversion analytics, and run affiliate programs. | Dub はモダンなリンクアトリビューションプラットフォームです。短縮 URL の作成、コンバージョン分析、アフィリエイトプログラムの運用ができます。 |
| fathom | Fathom Analytics provides simple, privacy-focused website analytics. We're a GDPR-compliant, Google Analytics alternative. | Fathom Analytics はシンプルでプライバシー重視のサイト分析を提供します。GDPR 準拠の Google Analytics 代替です。 |
| googlecalendar | Google Calendar is a time management and scheduling service developed by Google. | Google カレンダーは Google が開発したタイムマネジメント・スケジューリングサービスです。 |
| office365video | Microsoft Teams is a business communication platform and collaborative workspace included in Microsoft 365. NOTE: MUST HAVE A WORK / SCHOOL ACCOUNT | Microsoft Teams は Microsoft 365 に含まれるビジネスコミュニケーションプラットフォーム兼共同作業ワークスペースです。注意: 職場 / 学校アカウントが必要です。 |
| zoomvideo | Zoom is a secure and reliable video platform that supports all of your online communication needs. | Zoom はセキュアで信頼性の高いビデオプラットフォームで、あらゆるオンラインコミュニケーションのニーズに対応します。 |
| stripepayment | A Saas company a payment processing software, and application programming interfaces for e-commerce websites and mobile applications. | SaaS 企業として、決済処理ソフトウェアと、EC サイトやモバイルアプリ向けの API を提供します。 |
| sendgrid | SendGrid delivers your transactional and marketing emails through the world's largest cloud-based email delivery platform. | SendGrid は世界最大級のクラウドベースのメール配信プラットフォームを通じて、トランザクションメールやマーケティングメールを配信します。 |
| slack (templates) | -- (Slack 自体は app-store には config description が無いので templates の link-as-an-app で代用) | -- |
| discord | Copy your server invite link and start scheduling calls in Discord! | サーバー招待リンクをコピーすれば、Discord 上で通話のスケジュールを始められます。 |
| webex | Create meetings with Cisco Webex | Cisco Webex でミーティングを作成します。 |
| whereby | Whereby makes it super simple for collaborating teams to jump on a video call. | Whereby を使えば、共同作業中のチームがすぐにビデオ通話を始められます。 |
| dailyvideo (Cal Video) | Cal Video is the in-house web-based video conferencing platform powered by Daily.co, ... | Cal Video は Daily.co を基盤とした自社製の Web ベースのビデオ会議プラットフォームです。... |
| zapier | Workflow automation for everyone. Use the Cal.diy Zapier app to trigger your workflows when a booking is created, rescheduled, or cancelled, or after a meeting ends. | 誰でも使えるワークフロー自動化です。Cal.diy の Zapier アプリを使って、予約の作成・予約変更・キャンセル時、またはミーティング終了後にワークフローをトリガーできます。 |
| n8n | Automate without limits. The workflow automation platform that doesn't box you in, that you never outgrow | 制限なく自動化できます。あなたを枠にはめず、使いこなしても物足りなくなることのないワークフロー自動化プラットフォームです。 |
| make | From tasks and workflows to apps and systems, build and automate anything in one powerful visual platform. | タスクやワークフローからアプリやシステムまで、強力なビジュアルプラットフォームで何でも構築・自動化できます。 |

優先 App (top 20): Google Calendar, Office365 Calendar, Office365 Video (Teams),
Zoom, Stripe (Stripe Payment), SendGrid, Discord, Webex, Whereby, Cal Video
(Daily.co), Zapier, Make, n8n, Pipedream, HubSpot, Salesforce, Pipedrive,
Zoho CRM, Twilio (該当 description 無し、SendGrid で代用), GA4。

---

## 5. 機械置換 vs 個別翻訳

| 区分 | 件数 | 内訳 |
|------|------|------|
| 短文 (< 80 chars, 機械置換に近い) | 38 | 単一フレーズの直訳が中心 (例: "The joyful productivity app" → 「楽しさを大切にした生産性向上アプリ。」) |
| 長文 (>= 80 chars, 個別翻訳) | 75 | マーケティング文面が中心。文意・トーンを保ちつつ敬体・句読点を統一。 |
| 合計 | 113 | 全 App 例外なし。 |

すべての翻訳マッピングは `apps/caldiy/scripts/app-descriptions-ja.json` に
正本として保存し、`apps/caldiy/scripts/translate-app-descriptions.mjs` で
冪等に適用する。再実行しても同じ結果になる。

---

## 6. 注意事項

- description 内に埋め込まれている Markdown link 記法
  (`[Cal.diy](https://cal.com)`) は原文ママ維持。
- 上流の description 末尾に CRLF や余分なクオートが含まれている
  ケース (`alby`, `element-call`, `pipedrive-crm` など) があるが、
  翻訳時は綺麗な日本語のみを書き、制御文字は除去する。
- Cal.com 公式 `ja` locale (`packages/i18n/locales/ja/common.json`)
  に既存翻訳がある場合は **そちらを優先**。本翻訳は description のみ。
- README.md などのドキュメント翻訳は本 Phase の対象外
  (Phase 6 以降で検討)。

---

## 7. 改訂履歴

- 2026-05-23 Phase 5.5 初版 (App Store description 113 件を ja に統一)
