import { t } from "i18next";

export const AUTH_ERRORS = {
  "auth/email-already-in-use": t(
    "client.feature.auth.form.errors.email_in_use"
  ),
  "auth/invalid-email": t("client.feature.auth.form.errors.invalid_email"),
  "auth/weak-password": t("client.feature.auth.form.errors.weak_password"),
  "auth/wrong-password": t("client.feature.auth.form.errors.wrong_password"),
  "auth/user-not-found": t("client.feature.auth.form.errors.user_not_found"),
  "auth/disabled-user": t("client.feature.auth.form.errors.disabled_user"),
};
