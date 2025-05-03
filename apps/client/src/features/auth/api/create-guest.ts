import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AuthError, signInAnonymously } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import z from "zod";

import { auth, db } from "@synergy/libs/firebase";

import { useAuth } from "../hooks/use-auth";
import { Auth } from "../types/auth";

export const createGuestSchema = z.object({
  username: z.string().min(4).max(32),
});

export type CreateGuestInput = z.infer<typeof createGuestSchema>;

type CreateGuestOptions = MutationOptions<
  Partial<Auth>,
  AuthError,
  CreateGuestInput
>;

export const createGuestOptions = () => {
  return {
    mutationFn: async (data) => {
      const credential = await signInAnonymously(auth);
      await setDoc(doc(db, "users", credential.user.uid), {
        username: data.username,
        createdAt: serverTimestamp(),
      });
      return {
        uid: credential.user.uid,
      };
    },
  } satisfies CreateGuestOptions;
};

type UseCreateGuestOptions = UseMutationOptions<
  Partial<Auth>,
  AuthError,
  CreateGuestInput
>;

export const useCreateGuest = ({
  onSuccess,
  ...rest
}: UseCreateGuestOptions = {}) => {
  const { signIn } = useAuth();
  return useMutation({
    ...rest,
    onSuccess: (auth, ...args) => {
      signIn(auth);
      onSuccess?.(auth, ...args);
    },
    ...createGuestOptions(),
  } satisfies UseCreateGuestOptions);
};
