import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tasksRouter = createTRPCRouter({
    getTasks: publicProcedure
    .query(async () => {
        return await prisma.tasks.findMany({
            select: {
                title: true
            }
        })
    }),
    createTask: protectedProcedure
    .input(z.object({
        title: z.string()
    }))
    .mutation(async ({
        input, ctx
    }) => {
        return await prisma.tasks.create({
            data: {
                title: input.title,
                userId: ctx.session.user.id
            },
            // COMMENT: if you want to send a specific thing back to the user
            // select: {
            //   title: true
            // }
        })
    })
});