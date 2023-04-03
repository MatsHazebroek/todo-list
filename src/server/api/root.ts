import { createTRPCRouter } from "n/server/api/trpc";
// import { exampleRouter } from "n/server/api/routers/example";
import { tasksRouter } from "./routers/tasks";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  tasks: tasksRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
