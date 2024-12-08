import { QueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";
import z from "zod";

export const GroupSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
  creator: z.string(),
  created: z.date().optional(),
});

export type Group = z.infer<typeof GroupSchema>;

export type GroupQueryOptions = QueryOptions<
  Group,
  FirestoreError,
  Group,
  string[]
>;

export type UseGroupQueryOptions = UseMutationOptions<
  Group,
  FirestoreError,
  Group,
  string[]
>;
