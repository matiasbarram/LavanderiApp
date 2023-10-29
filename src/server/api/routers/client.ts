import { z } from "zod";

import { clientSchema } from "@/lib/schemas";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";


export const clientRouter = createTRPCRouter({
    create: publicProcedure.input({ ...clientSchema })
        .mutation(async ({ ctx, input }) => {
            return ctx.db.client.create({
                data: {
                    address: input.address,
                    email: input.email,
                    fname: input.firstname,
                    lname: input.lastname,
                    phone: input.phone,
                    rut: input.rut,
                },
            });
        }),
    get: publicProcedure.input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.client.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    getByEmail: publicProcedure.input(z.object({ email: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.client.findUnique({
                where: {
                    email: input.email,
                },
            });
        }),
    getAll: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.client.findMany({
                orderBy: {
                    fname: "asc",
                }
            });
        }),
})