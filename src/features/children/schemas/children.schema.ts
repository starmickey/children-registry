import z from "zod";

export const getChildResumeParamsSchema = z.object({
  id: z.coerce.number().int().positive().min(1),
});
