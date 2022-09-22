import * as z from "zod"

export const CreateConcert = z.object({
  date: z.string(),
  description: z.string(),
  bands: z.array(z.object({ name: z.string() })),
});