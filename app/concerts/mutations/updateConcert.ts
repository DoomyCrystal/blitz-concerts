import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateConcert = z.object({
  id: z.number(),
  date: z.string(),
  description: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateConcert),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const concert = await db.concert.update({ where: { id }, data });

    return concert;
  }
);
