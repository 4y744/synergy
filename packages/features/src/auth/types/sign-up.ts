import z from "zod";

export const signUpInputSchema = z
  .object({
    username: z
      .string()
      .min(4, "form/username-too-short")
      .max(30, "form/username-too-long"),
    email: z.string().email("form/invalid-email"),
    password: z
      .string()
      .min(6, "form/password-too-short")
      .max(30, "form/password-too-long"),
    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword }) =>
      password == confirmPassword && confirmPassword,
    {
      message: "form/password-mismatch",
      path: ["confirmPassword"],
    }
  );

export type SignUpInput = z.infer<typeof signUpInputSchema>;
