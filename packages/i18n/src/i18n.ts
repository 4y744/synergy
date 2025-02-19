import i18n, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./resources/en.json";
import bg from "./resources/bg.json";

i18n.use(initReactI18next).init({
  resources: { en, bg },
  lng: localStorage.getItem("language") || "en",
} satisfies InitOptions<typeof i18n>);

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export { i18n };
