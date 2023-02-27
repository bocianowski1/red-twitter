import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const message = ctx.prisma.message.create({
        data: {
          message: input.message,
          userId: ctx.session.user.id,
        },
      });

      return message;
    }),
  deleteMessage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const message = ctx.prisma.message.delete({
        where: {
          id: input.id,
        },
      });

      return message;
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.message.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
