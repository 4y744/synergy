import z from "zod";
import { InviteSchema } from "../schemas/invite";

export type Invite = z.infer<typeof InviteSchema>;
