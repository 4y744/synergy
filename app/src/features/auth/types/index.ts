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
