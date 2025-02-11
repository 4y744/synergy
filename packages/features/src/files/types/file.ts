import z from "zod";

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
});

export type TFile = z.infer<typeof fileSchema>;
