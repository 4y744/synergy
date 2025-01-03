import z from "zod";

export const SignInSchema = z.object({
  email: z.string().email("form/invalid-email"),
  password: z.string().min(1, "form/password-required"),
});

export type SignIn = z.infer<typeof SignInSchema>;
