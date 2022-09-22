import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteConcert = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteConcert),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const concert = await db.concert.deleteMany({ where: { id } });

    return concert;
  }
);
