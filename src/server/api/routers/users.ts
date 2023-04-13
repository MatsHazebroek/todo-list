import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
    getUsers: protectedProcedure

    .query(async ({ ctx}) => {
        const isAdmin = await prisma.user.findUniqueOrThrow({
            select: {
                admin: true
            },
            where: {
                id: ctx.session.user.id
            }
        }).catch(() => {
            throw new TRPCError({message: "JE BENT GEEN USER", code: "BAD_REQUEST"})
        })
        if(isAdmin.admin != true) {
            throw new TRPCError({message: "JE BENT GEEN ADMIN", code: "UNAUTHORIZED"})
        }
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                admin: true,
                _count: true
            }
        })
    }),

    deleteUser: protectedProcedure
    .input(z.object({
        id: z.string()
    }))
    .mutation(async ({ctx, input}) => {
        const isUser = await prisma.user.findUniqueOrThrow({
            where: {
                id: input.id,
            }
        }).catch(() => {
            throw new TRPCError({message: "User does not exist", code: "BAD_REQUEST"})
        });
        if (isUser.id != ctx.session.user.id) {
            throw new TRPCError({message: "User does not exist", code: "BAD_REQUEST"})
        }
        return await prisma.user.delete({
            where: {
                id: input.id
            }
        })
    }),

    
});