import { MutationOptions, UseMutationOptions } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";
import z from "zod";
import { Auth } from "./auth";

export const SignInSchema = z.object({
  email: z.string().email("form/invalid-email"),
  password: z.string().min(1, "form/password-required"),
});

export type SignInCredentials = z.infer<typeof SignInSchema>;

export type SignInMutationOptions = MutationOptions<
  Auth,
  AuthError,
  SignInCredentials
>;

export type UseSignInMutationOptions = UseMutationOptions<
  Auth,
  AuthError,
  SignInCredentials
>;
