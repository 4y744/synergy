import z from "zod";
import { t } from "@synergy/i18n";

export const createGroupInputSchema = z.object({
  name: z
    .string()
    .min(6, t("form.errors.too_short", { min_lenght: 6 }))
    .max(32, t("form.errors.too_long", { max_lenght: 32 })),
});

export type CreateGroupInput = z.infer<typeof createGroupInputSchema>;
