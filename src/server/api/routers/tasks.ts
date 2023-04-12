import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tasksRouter = createTRPCRouter({
    getTasks: protectedProcedure
    .query(async ({ctx  }) => {
        return await prisma.tasks.findMany({
            select: {
                id: true,
                userId: true,
                title: true,
                description: true,
                status: true,
            },
            where: {
                userId: ctx.session.user.id
            }
            
        })
    }),
    createTasks: protectedProcedure
    .input(z.object({
        title: z.string(),
        description: z.string(),
        status: z.string(),

    }))
    .mutation(async ({
        input, ctx
    }) => {
        return await prisma.tasks.create({
            data: {
                userId: ctx.session.user.id,
                title: input.title,
                description: input.description,
                status: input.status,
            },
        
            // COMMENT: if you want to send a specific thing back to the user
            // select: {
            //   title: true
            // }
        }).catch((err) => {
            console.log(err)
            throw new TRPCError({code: "BAD_REQUEST", message: "Something went wrong"});
        })
    }),
    deleteTask: protectedProcedure
    .input(z.object({
        id: z.string()
    }))
    .mutation(async ({ctx, input }) => {
        const isMyTask =  await prisma.tasks.findUniqueOrThrow({
            where: {
               id: input.id 
            }
        }).catch(() => {
            throw new TRPCError({message: "task does not exist", code: "BAD_REQUEST"});
        });
        if(isMyTask.userId != ctx.session.user.id) {
            throw new TRPCError({message: "task does not exist", code: "BAD_REQUEST"});
        }
        return await prisma.tasks.delete({
            where: {
                id: input.id
            }
        })
    })
});