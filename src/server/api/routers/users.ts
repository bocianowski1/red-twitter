import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
      });
    }),

  getUserByName: protectedProcedure
    .input(
      z.object({
        searchTerm: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findMany({
        where: {
          name: {
            contains: input.searchTerm,
          },
        },
        orderBy: {
          name: "asc",
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
