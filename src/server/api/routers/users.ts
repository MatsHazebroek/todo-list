import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "../../db";

export const usersRouter = createTRPCRouter({
    getUsers: protectedProcedure

    .query(async () => {
        return await prisma.user.findMany({
            select: {
                name: true,
                email: true,
            }
        })
    }),
});