import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as z from "zod";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
    }),

  fetch: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.id === undefined) return undefined;

      if (input.id.length != 24) return undefined;
      return ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
