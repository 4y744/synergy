import z from "zod";

export const InviteSchema = z.object({
  url: z.string().url("form/invalid-url"),
});
