import { t } from "i18next";

export const getAuthError = (error: string) => {
  switch (error) {
    case "auth/invalid-email":
      return t("client.form.errors.invalid_email");
    case "auth/email-already-in-use":
      return t("client.feature.auth.form.errors.email_in_use");
    case "auth/weak-password":
      return t("client.feature.auth.form.errors.weak_password");
    case "auth/wrong-password":
      return t("client.feature.auth.form.errors.wrong_password");
    case "auth/missing-password":
      return t("client.feature.auth.form.errors.missing_password");
    case "auth/user-not-found":
      return t("client.feature.auth.form.errors.user_not_found");
    case "auth/disabled-user":
      return t("client.feature.auth.form.errors.disabled_user");
  }
};
