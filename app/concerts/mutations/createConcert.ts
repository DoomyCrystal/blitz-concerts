import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateConcert = z.object({
  date: z.string(),
  description: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateConcert),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const concert = await db.concert.create({ data: input });

    return concert;
  }
);
