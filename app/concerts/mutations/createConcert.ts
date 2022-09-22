import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateConcert } from "../validations";

export default resolver.pipe(
  resolver.zod(CreateConcert),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const concert = await db.concert.create({
      data: {
        ...input,
        bands: { create: input.bands },
      } });

    return concert;
  }
);
