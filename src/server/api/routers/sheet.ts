import { z } from "zod"

import { combinedOrderSchema } from "@/lib/schemas"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { type PrismaClient } from "@prisma/client"

export const sheetRouter = createTRPCRouter({
    create: publicProcedure
        .input(combinedOrderSchema)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.$transaction(async (prisma) => {
                const client = await prisma.client.findUnique({
                    where: {
                        email: input.clientName,
                    },
                    select: {
                        id: true,
                    },
                })

                if (!client) {
                    throw new Error("No existe el cliente.")
                }

                const orderData = await createOrderDetail({
                    prisma: ctx.db,
                    input,
                })
                const orderPayment = await createOrderPayment({
                    prisma: ctx.db,
                    input,
                })

                return createOrder({
                    prisma: ctx.db,
                    clientId: client.id,
                    orderDataId: orderData.id,
                    orderPaymentId: orderPayment.id,
                })
            })
        }),

    rowsByDateRange: publicProcedure
        .input(
            z.object({
                from: z.date(),
                to: z.date(),
            })
        )
        .query(async ({ ctx, input }) => {
            return ctx.db.order.findMany({
                where: {
                    OrderData: {
                        checkin: {
                            gte: input.from,
                            lte: input.to,
                        },
                    },
                },
                include: {
                    OrderData: true,
                    OrderPayment: true,
                    Client: true,
                },
                orderBy: {
                    OrderData: {
                        checkin: "desc",
                    },
                },
            })
        }),

    updateRows: publicProcedure
        .input(
            z.object({
                from: z.date(),
                to: z.date(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.order.findMany({
                where: {
                    OrderData: {
                        checkin: {
                            gte: input.from,
                            lte: input.to,
                        },
                    },
                },
                include: {
                    OrderData: true,
                    OrderPayment: true,
                    Client: true,
                },
            })
        }),

    userInfo: publicProcedure
        .input(
            z.object({
                fname: z.string(),
                lname: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.client.findMany({
                where: {
                    fname: input.fname,
                    lname: input.lname,
                },
            })
        }),
})

async function createOrderDetail({
    prisma,
    input,
}: {
    prisma: PrismaClient
    input: z.infer<typeof combinedOrderSchema>
}) {
    return prisma.orderDetail.create({
        data: {
            checkin: input.checkin,
            checkout: input.checkout,
            // details: input.secoDetails,
            ticket: input.ticket,
            // external: input.seco,
            // externalDetails: input.secoDetails,
        },
    })
}

async function createOrderPayment({
    prisma,
    input,
}: {
    prisma: PrismaClient
    input: z.infer<typeof combinedOrderSchema>
}) {
    return prisma.orderPayment.create({
        data: {
            amount: Number(input.amount),
            shippingCost: Number(input.shippingCost),
            paymentDate: input.paymentDate,
            paymentMethod: input.paymentMethod,
            status: input.status,
            paymentType: input.paymentMethod,
            invoiceNumber: input.invoiceNumber,
            paymentDetails: input.paymentDetails,
        },
    })
}

async function createOrder({
    prisma,
    clientId,
    orderDataId,
    orderPaymentId,
}: {
    prisma: PrismaClient
    clientId: string
    orderDataId: string
    orderPaymentId: string
}) {
    return prisma.order.create({
        data: {
            clientId,
            orderDataId,
            orderPaymentId,
        },
    })
}
