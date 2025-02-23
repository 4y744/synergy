import { t } from "i18next";
import z from "zod";

export const createGroupInputSchema = z.object({
  name: z
    .string()
    .min(4, t("client.form.errors.too_short", { min_lenght: 4 }))
    .max(32, t("client.form.errors.too_long", { max_lenght: 32 })),
});

export type CreateGroupInput = z.infer<typeof createGroupInputSchema>;
