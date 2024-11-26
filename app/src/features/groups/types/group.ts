import { GroupSchema } from "../schemas/group";
import z from "zod";

export type Group = z.infer<typeof GroupSchema>;
