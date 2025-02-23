import { t } from "i18next";
import z from "zod";

export const signInInputSchema = z.object({
  email: z.string().email(t("client.feature.auth.form.errors.invalid_email")),
  password: z
    .string()
    .min(1, t("client.feature.auth.form.errors.password_required")),
});

export type SignInInput = z.infer<typeof signInInputSchema>;
