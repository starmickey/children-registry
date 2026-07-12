import z from "zod";

export const childIdSchema = z.object({
  id: z.coerce.number().int().positive().min(1),
});