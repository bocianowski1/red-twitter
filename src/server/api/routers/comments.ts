import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentsRouter = createTRPCRouter({
  comment: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        postId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const comment = ctx.prisma.comment.create({
        data: {
          postId: input.postId,
          message: input.message,
          userId: ctx.session.user.id,
        },
      });

      return comment;
    }),

  deleteAllCommentsOnPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const commentsToDelete = ctx.prisma.comment.deleteMany({
        where: {
          postId: input.postId,
        },
      });
      return commentsToDelete;
    }),

  incrementLikeCount: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        likes: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      const comment = ctx.prisma.comment.update({
        where: {
          id: input.id,
        },
        data: {
          likes: input.likes,
        },
      });

      return comment;
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
      });
    }),
});
