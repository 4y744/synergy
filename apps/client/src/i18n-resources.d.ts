import { en } from "@synergy/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: typeof en;
  }
}
