import i18n, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import bg from "./bg.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    bg: {
      translation: bg,
    },
  },
  lng: "en",
  fallbackLng: "en",
} satisfies InitOptions<typeof i18n>);

export default i18n;
