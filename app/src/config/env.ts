/**
 * The platform the application is running in.
 * Used to configure API calls for the current environment.
 */
export const ENV_PLATFORM =
  (window as any).env?.platform == "electron" ? "electron" : "browser";
