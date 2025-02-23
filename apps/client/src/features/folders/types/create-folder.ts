import z from "zod";
import { t } from "i18next";

export const createFolderInputSchema = z.object({
  name: z
    .string()
    .min(4, t("client.form.errors.too_short", { min_lenght: 4 }))
    .max(32, t("client.form.errors.too_long", { max_lenght: 32 })),
});

export type CreateFolderInput = z.infer<typeof createFolderInputSchema>;
