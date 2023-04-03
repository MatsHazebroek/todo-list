import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tasksRouter = createTRPCRouter({
    getTasks: protectedProcedure
    .query(async ({ctx  }) => {
        return await prisma.tasks.findMany({
            select: {
                userId: true,
                title: true,
                description: true
            },
            where: {
                userId: ctx.session.user.id
            }
            
        })
    }),
    createTasks: protectedProcedure
    .input(z.object({
        title: z.string(),
        description: z.string()

    }))
    .mutation(async ({
        input, ctx
    }) => {
        return await prisma.tasks.create({
            data: {
                userId: ctx.session.user.id,
                title: input.title,
                description: input.description,
            },
        
            // COMMENT: if you want to send a specific thing back to the user
            // select: {
            //   title: true
            // }
        }).catch((err) => {
            console.log(err)
            throw new TRPCError({code: "BAD_REQUEST", message: "Something went wrong"});
        })
    })
});