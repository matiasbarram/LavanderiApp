import { z } from "zod"

import { dbOrderStatus } from "@/lib/constants"
import { combinedOrderSchema, orderDetailSchema, type orderPaymentSchema } from "@/lib/schemas"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { type PrismaClient } from "@prisma/client"

export const sheetRouter = createTRPCRouter({
    createWithPayment: publicProcedure
        .input(combinedOrderSchema)
        .mutation(async ({ ctx, input }) => {

            const client = await findClientByEmail({
                prisma: ctx.db,
                email: input.clientName,
            })

            const orderDetails = await createOrderDetail({
                prisma: ctx.db,
                input,
            })

            const orderPayment = await createOrderPayment({
                prisma: ctx.db,
                input,
            })

            return await createOrder({
                prisma: ctx.db,
                clientId: client.id,
                orderDataId: orderDetails.id,
                orderPaymentId: orderPayment.id,
            })
        }),


    createWithoutPayment: publicProcedure
    .input(orderDetailSchema)
    .mutation(async ({ ctx, input }) => {
        const client = await findClientByEmail({
            prisma: ctx.db,
            email: input.clientName,
        })

        const orderDetails = await createOrderDetail({
            prisma: ctx.db,
            input,
        })
        return await createOrder({
            prisma: ctx.db,
            clientId: client.id,
            orderDataId: orderDetails.id,
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
                    deleted: false,
                    OrderDetail: {
                        checkin: {
                            gte: input.from,
                            lte: input.to,
                        },
                    },
                },
                include: {
                    OrderDetail: true,
                    OrderPayment: true,
                    Client: true,
                },
                orderBy: {
                    OrderDetail: {
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
                    OrderDetail: {
                        checkin: {
                            gte: input.from,
                            lte: input.to,
                        },
                    },
                },
                include: {
                    OrderDetail: true,
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

    deleteRow: publicProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        return ctx.db.order.update({
            where: {
                id: input.id,
            },
            data: {
                deleted: true,
            },
        })
})
    
    })

async function createOrderDetail({
    prisma,
    input,
}: {
    prisma: PrismaClient
    input: z.infer<typeof orderDetailSchema>
}) {
    return prisma.orderDetail.create({
    data: {
        orderAmount: Number(input.amount),
        details: input.details,
        checkin: input.checkin,
        checkout: input.checkout,
        shippingCost: Number(input.shippingCost),
        ticket: input.ticket,
        external: input.external,
    }
    })
}

async function createOrderPayment({
    prisma,
    input,
}: {
    prisma: PrismaClient
    input: z.infer<typeof orderPaymentSchema>
}) {
    return prisma.orderPayment.create({
    data: {
        paymentDate: input.paymentDate,
        paymentMethod: input.paymentMethod,
        status: dbOrderStatus.paid,
        invoiceType: input.invoiceType,
        invoiceNumber: input.invoiceNumber,
        paymentDetails: input.paymentDetails,
        paymentTicket: input.paymentTicket,
    }
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
    orderPaymentId?: string | null
}) {
    return prisma.order.create({
        data: {
            clientId,
            orderDetailId: orderDataId,
            orderPaymentId,
        },
    })
}


async function findClientByEmail({
    prisma,
    email,
}: {
    prisma: PrismaClient
    email: string
}) {
    const client = await prisma.client.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    })

    if (!client) {
        throw new Error("No existe el cliente.")
    }

    return client
}
