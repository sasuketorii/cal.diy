# REVREX i18n Glossary (ja)

REV-C 社の `apps/caldiy` 改造に伴い、`packages/i18n/locales/ja/common.json` で
使用する日本語訳を統一するための用語集。新規キー追加・既存キー校正時の
参照ルールであり、本ガイドラインに従わない訳は PR レビューで指摘する。

本ファイルは `revrex/main` 改造ブランチ専用。上流 (`calcom/cal.diy`) へは
push しない。

---

## 1. ブランド・固有名詞

| 原語 (en) | 訳語 (ja) | 備考 |
|-----------|-----------|------|
| Cal.diy / Cal.com | REV-C | 製品ブランドは REV-C に統一。MIT attribution (`powered by Cal.com`) のみ維持 |
| Cal Video | Cal Video | 機能名はそのまま (REV-C Video へのブランド差替は Phase 6 以降で検討) |
| Google Meet / Zoom / Daily.co | (英語のまま) | 外部サービス名は変更しない |
| REV-C | REV-C | 自社ブランド (社内利用) |
| rev_license | rev_license | 内部システム名はそのまま |

**注意**: `Cal.com` / `Cal.diy` の直接的な文字列差替は機械的に
`ops/scripts/i18n-polish.mjs` が処理する。例外は同 script の
`PRESERVE_KEYS` に登録する。

---

## 2. 基本用語 (Scheduling 領域)

| 原語 (en) | 訳語 (ja) | 補足 |
|-----------|-----------|------|
| booking | 予約 | "appointment" との混在禁止 (どちらも「予約」で OK) |
| event type | イベントタイプ | カタカナ統一 (「イベント種別」とは訳さない) |
| availability | 空き時間 | 「利用可能時間」「予約可能枠」は不可 |
| schedule | スケジュール | 動詞: 「予約する」or「スケジュールを組む」 |
| reschedule | 予約変更 | 「リスケ」「再スケジュール」は不可 |
| cancel | キャンセル | 動詞「キャンセルする」 |
| attendee | 参加者 | 「出席者」は不可 |
| host | ホスト | 「主催者」「ホスト役」は不可 |
| organizer | 主催者 | host と区別: organizer = 予約を作った主体 |
| invitee | 招待者 | "guest" と区別: invitee は予約を受けた参加者 |
| organization | 組織 | "team" の上位概念 |
| team | チーム | |
| workspace | ワークスペース | |
| credential | 認証情報 | "API key" は「APIキー」 |
| webhook | Webhook | カタカナ化せず英語表記 |
| meeting | ミーティング | "call" も「ミーティング」に統一 |
| time slot | 時間枠 | |
| time zone | タイムゾーン | スペースなし |

---

## 3. 敬体・文末ルール

- **敬体 (です・ます調)** で統一。常体 (だ・である調) は使用しない。
- **「下さい」(漢字) → 「ください」(ひらがな)** に統一 (公用文ルール準拠)。
  - 例: 「お試し下さい」→「お試しください」
- **「お願いします」は冗長**なので、可能なら「〜してください」に置き換える。
- **句点 `。` / 読点 `、`** は全角。文末必ず `。` で終える (UI ボタン文言を除く)。
- **感嘆符 `!` `！`** は原則使わない。UI 都合で必要な場合のみ全角 `！`。
- **疑問符 `?` `？`** はユーザ操作確認ダイアログのみ全角 `？` で使用可。

---

## 4. 日付・時刻フォーマット

UI 表示は `Intl.DateTimeFormat('ja-JP')` に委譲することを前提とする。
ハードコードされた日付表記がある場合は以下のフォーマットに揃える:

| 用途 | フォーマット | 例 |
|------|-------------|-----|
| 完全な日時 | `YYYY年MM月DD日 HH:mm` | `2026年05月22日 14:30` |
| 日付のみ | `YYYY年MM月DD日` | `2026年05月22日` |
| 時刻のみ | `HH:mm` | `14:30` |
| 曜日付き | `YYYY年MM月DD日(曜)` | `2026年05月22日(金)` |
| 短縮日付 | `MM/DD` | `05/22` |
| ISO (debug) | `YYYY-MM-DDTHH:mm:ss` | (UI には出さない) |

タイムゾーンを併記する場合は末尾 ` (JST)` を付ける。`+09:00` は使わない。

---

## 5. UI コンポーネント語彙

| 原語 (en) | 訳語 (ja) | 補足 |
|-----------|-----------|------|
| Save | 保存 | "Save changes" → 「変更を保存」 |
| Cancel (button) | キャンセル | 操作中止 |
| Delete | 削除 | |
| Edit | 編集 | |
| Create | 作成 | |
| Add | 追加 | |
| Remove | 削除 | (collection からの除去は「外す」も可) |
| Continue | 続ける | "Continue with Google" → 「Google で続ける」 |
| Sign in / Log in | サインイン / ログイン | 上流に合わせ両方使用可。一つの画面では統一する |
| Sign up | 新規登録 | |
| Submit | 送信 | |
| Confirm | 確認 | |
| Loading… | 読み込み中… | 三点リーダは `…` (全角) |
| Error | エラー | |
| Warning | 警告 | |
| Required | 必須 | フォームフィールドのラベル |
| Optional | 任意 | |

---

## 6. エラーメッセージ語彙

| 原語 (en) | 訳語 (ja) |
|-----------|-----------|
| Something went wrong | エラーが発生しました |
| Please try again | もう一度お試しください |
| Not found | 見つかりません |
| Unauthorized | 認証が必要です |
| Forbidden | アクセス権限がありません |
| Invalid input | 入力内容が正しくありません |
| Already exists | 既に存在します |

---

## 7. 機械置換の範囲外 (人手対応)

以下のパターンは `i18n-polish.mjs` の機械置換では扱わず、Phase 6 以降の
運用フェーズで継続改善する:

- 微妙な言い回し (例: "Please review" の "review" を「確認」とするか「レビュー」とするか)
- 専門用語 (例: SCIM, OAuth, SAML 等の正規ガイドラインに従う訳)
- マーケティング文面 (例: feature description の自然な訳)
- 文脈依存の代名詞 ("you" を「あなた」「お客様」「ユーザー」のどれにするか)

---

## 8. 改訂履歴

- 2026-05-22 Phase 5 初版 (REV-C ブランド差替・敬体統一・日付フォーマット定義)
