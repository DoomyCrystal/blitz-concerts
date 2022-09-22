import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetConcertsInput
  extends Pick<
    Prisma.ConcertFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetConcertsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: concerts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.concert.count({ where }),
      query: (paginateArgs) =>
        db.concert.findMany({ ...paginateArgs, where, orderBy, include: { bands: true} }),
    });

    return {
      concerts,
      nextPage,
      hasMore,
      count,
    };
  }
);
