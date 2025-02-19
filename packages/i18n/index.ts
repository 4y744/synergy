import { i18n } from "~/i18n";
import { useTranslation } from "react-i18next";
import en from "~/resources/en.json";

export const t = i18n.t;
export const language = i18n.language;
export const languages = i18n.languages;
export const changeLanguage = i18n.changeLanguage;
export { useTranslation };

export default i18n;
export { en };
