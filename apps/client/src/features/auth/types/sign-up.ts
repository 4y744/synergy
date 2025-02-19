import z from "zod";
import { t } from "@synergy/i18n";

export const signUpInputSchema = z
  .object({
    username: z
      .string()
      .min(4, t("form.errors.too_short", { min_lenght: 4 }))
      .max(32, t("form.errors.too_long", { max_lenght: 32 })),
    email: z.string().email(t("auth.form.errors.invalid_email")),
    password: z
      .string()
      .min(6, t("form.errors.too_short", { min_lenght: 6 }))
      .max(32, t("form.errors.too_long", { max_lenght: 32 })),
    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword }) =>
      password == confirmPassword && confirmPassword,
    {
      message: t("auth.form.errors.password_mismatch"),
      path: ["confirmPassword"],
    }
  );

export type SignUpInput = z.infer<typeof signUpInputSchema>;
