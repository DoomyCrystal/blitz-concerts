import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateTodo = z.object({
  name: z.string(),
  description: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateTodo),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const todo = await db.todo.create({ data: input });

    return todo;
  }
);
