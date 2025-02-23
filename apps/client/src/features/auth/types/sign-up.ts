import { t } from "i18next";
import z from "zod";

export const signUpInputSchema = z
  .object({
    username: z
      .string()
      .min(4, t("client.form.errors.too_short", { min_lenght: 4 }))
      .max(32, t("client.form.errors.too_long", { max_lenght: 32 })),
    email: z.string().email(t("client.feature.auth.form.errors.invalid_email")),
    password: z
      .string()
      .min(6, t("client.form.errors.too_short", { min_lenght: 6 }))
      .max(32, t("client.form.errors.too_long", { max_lenght: 32 })),
    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword }) =>
      password == confirmPassword && confirmPassword,
    {
      message: t("client.feature.auth.form.errors.password_mismatch"),
      path: ["confirmPassword"],
    }
  );

export type SignUpInput = z.infer<typeof signUpInputSchema>;
