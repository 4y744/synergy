import z from "zod";

export const signInInputSchema = z.object({
  email: z.string().email("form/invalid-email"),
  password: z.string().min(1, "form/password-required"),
});

export type SignInInput = z.infer<typeof signInInputSchema>;
