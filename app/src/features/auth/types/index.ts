import z from "zod";

export type Auth = {
  uid: string | null;
  email: string | null;
  signedIn: boolean | null;
};

export const SignInCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInCredentials = z.infer<typeof SignInCredentialsSchema>;

export const SignUpCredentialsSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type SignUpCredentials = z.infer<typeof SignUpCredentialsSchema>;
