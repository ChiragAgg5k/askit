import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { postRouter } from "~/server/api/routers/post";
import { gptRouter } from "~/server/api/routers/gpt";
import { ansRouter } from "~/server/api/routers/ans";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  gpt: gptRouter,
  ans: ansRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
