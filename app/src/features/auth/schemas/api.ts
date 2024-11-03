import z from "zod";

export const SignInCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignUpCredentialsSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});
