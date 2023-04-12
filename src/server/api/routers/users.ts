import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { TRPCError } from "@trpc/server";

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
            console.log('weg[')
            throw new TRPCError({message: "JE BENT GEEN USER", code: "BAD_REQUEST"})
        })
        if(isAdmin.admin != true) {
            throw new TRPCError({message: "JE BENT GEEN ADMIN", code: "UNAUTHORIZED"})
        }
        return await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                admin: true,
            }
        })
    }),
});