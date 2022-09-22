import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateBand = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateBand),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const band = await db.band.update({ where: { id }, data });

    return band;
  }
);
