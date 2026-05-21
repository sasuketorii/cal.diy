const path = require("node:path");
const i18n = require("../../i18n.json");

// REVREX Phase 5: defaultLocale を ja に変更。
// 上流 lingo.dev tooling は引き続き i18n.json の locale.source (en) を
// translation source として使うため、本ファイルでのみ override する。
// REVREX_I18N_DEFAULT_LOCALE で運用時に上書き可能 (デフォルト ja)。
const REVREX_DEFAULT_LOCALE = process.env.REVREX_I18N_DEFAULT_LOCALE || "ja";

/** @type {import("next-i18next").UserConfig} */
const config = {
  i18n: {
    defaultLocale: REVREX_DEFAULT_LOCALE,
    locales: i18n.locale.targets.concat([i18n.locale.source]),
  },
  fallbackLng: {
    default: ["en"],
    zh: ["zh-CN"],
  },
  reloadOnPrerender: process.env.NODE_ENV !== "production",
  localePath: path.resolve(__dirname, "./locales"),
};

module.exports = config;
