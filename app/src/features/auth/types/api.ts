import z from "zod";
import { SignInCredentialsSchema, SignUpCredentialsSchema } from "../schemas";

export type SignInCredentials = z.infer<typeof SignInCredentialsSchema>;

export type SignUpCredentials = z.infer<typeof SignUpCredentialsSchema>;
