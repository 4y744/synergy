import z from "zod";
import { t } from "@synergy/i18n";

export const signInInputSchema = z.object({
  email: z.string().email(t("auth.form.errors.invalid_email")),
  password: z.string().min(1, t("auth.form.errors.password_required")),
});

export type SignInInput = z.infer<typeof signInInputSchema>;
