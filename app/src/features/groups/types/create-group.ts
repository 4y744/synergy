import { MutationOptions, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";
import z from "zod";

export const CreateGroupSchema = z.object({
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
  uid: z.string(),
});

export type CreateGroup = z.infer<typeof CreateGroupSchema>;

export type CreateGroupMutationOptions = MutationOptions<
  string,
  FirestoreError,
  CreateGroup
>;

export type UseCreateGroupMutationOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateGroup
>;
