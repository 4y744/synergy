import { QueryOptions, UseQueryOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

export type FindGroupsQueryOptions = QueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export type UseFindGroupsQueryOptions = UseQueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;
