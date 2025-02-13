import { en } from "@synergy/locale";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: typeof en;
  }
}
