import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  AuthError,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import z from "zod";

import { auth } from "@synergy/libs/firebase";

export const upgradeGuestInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
  confirmPassword: z.string(),
});

export type UpgradeGuestInput = z.infer<typeof upgradeGuestInputSchema>;

type UpgradeGuestOptions = MutationOptions<void, AuthError, UpgradeGuestInput>;

export const upgradeGuestOptions = () => {
  return {
    mutationFn: async (data) => {
      const credential = EmailAuthProvider.credential(
        data.email,
        data.password
      );
      await linkWithCredential(auth.currentUser!, credential);
    },
  } satisfies UpgradeGuestOptions;
};

type UseUpgradeGuestOptions = UseMutationOptions<
  void,
  AuthError,
  UpgradeGuestInput
>;

export const useUpgradeGuest = (options: UseUpgradeGuestOptions) => {
  return useMutation({
    ...options,
    ...upgradeGuestOptions(),
  } satisfies UseUpgradeGuestOptions);
};
