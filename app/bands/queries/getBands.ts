import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetBandsInput
  extends Pick<
    Prisma.BandFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBandsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: bands,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.band.count({ where }),
      query: (paginateArgs) =>
        db.band.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      bands,
      nextPage,
      hasMore,
      count,
    };
  }
);
