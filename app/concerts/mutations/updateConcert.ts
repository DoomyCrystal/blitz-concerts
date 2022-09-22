import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateConcert = z.object({
  id: z.number(),
  date: z.string(),
  description: z.string(),
  bands: z.array(
    z.object({ id: z.number().optional(), name: z.string() })
  ),
});

export default resolver.pipe(
  resolver.zod(UpdateConcert),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const concert = await db.concert.update({ 
      where: { id }, 
      data: {
        ...data,
        bands: {
          upsert: data.bands.map(band => ({
            // Appears to be a prisma bug, because `|| 0` shouldn't be needed
            where: { id: band.id || 0},
            create: { name: band.name },
            update: { name: band.name },
          })),
        },
      },
      include: {
        bands: true,
      },
     });

    return concert;
  }
);
