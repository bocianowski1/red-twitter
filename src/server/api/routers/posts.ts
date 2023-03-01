import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  getPostById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      const post = ctx.prisma.post.findFirst({
        where: {
          id: input.id,
        },
      });
      return post;
    }),

  getPostByContent: protectedProcedure
    .input(
      z.object({
        searchTerm: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.post.findMany({
        where: {
          caption: {
            contains: input.searchTerm,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        caption: z.string(),
        image: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      const post = ctx.prisma.post.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });

      return post;
    }),

  deletePost: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const post = ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });

      return post;
    }),

  updatePost: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        caption: z.string().optional(),
        image: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      const post = ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return post;
    }),

  incrementLikeCount: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        likes: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      const post = ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          likes: input.likes,
        },
      });

      return post;
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  deleteAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.deleteMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
