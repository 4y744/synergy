import z from "zod";

export const userSchema = z.object({
  uid: z.string(),
  username: z.string(),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
