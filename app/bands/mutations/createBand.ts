import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateBand = z.object({
  name: z.string(),
  country: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateBand),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const band = await db.band.create({ data: input });

    return band;
  }
);
