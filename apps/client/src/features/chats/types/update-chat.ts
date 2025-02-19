import z from "zod";
import { t } from "@synergy/i18n";

export const updateChatInputSchema = z.object({
  name: z
    .string()
    .min(4, t("form.errors.too_short", { min_lenght: 4 }))
    .max(32, t("form.errors.too_long", { max_lenght: 32 })),
});

export type UpdateChatInput = z.infer<typeof updateChatInputSchema>;
