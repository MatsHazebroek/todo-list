import { createTRPCRouter } from "n/server/api/trpc";
// import { exampleRouter } from "n/server/api/routers/example";
import { tasksRouter } from "./routers/tasks";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  tasks: tasksRouter,
  users: usersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
