import { z } from "zod"

import { dbOrderStatus } from "@/lib/constants"
import { addPaymentSchema, createOrderSchema, createOrderWithPaymentSchema, type OrderItemsDetailsSchema, type orderDetailSchema, type orderPaymentSchema } from "@/lib/schemas"
import { type PrismaFormatClothes } from "@/lib/types"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { type PrismaClient } from "@prisma/client"

export const sheetRouter = createTRPCRouter({
    createWithPayment: publicProcedure
        .input(createOrderWithPaymentSchema)
        .mutation(async ({ ctx, input }) => {

            const client = await findClientByEmail({
                prisma: ctx.db,
                email: input.order.clientName,
            })

            const orderDetails = await createOrderDetail({
                prisma: ctx.db,
                input: input.order
            })

            const orderPayment = await createOrderPayment({
                prisma: ctx.db,
                input: input.order,
            })
            const order = await createOrder({
                prisma: ctx.db,
                clientId: client.id,
                orderDataId: orderDetails.id,
                orderPaymentId: orderPayment.id,
            })

            const clothes = createClothes({
                prisma: ctx.db,
                input: input.items,
                orderId: order.id,
            })
        }),


    createWithoutPayment: publicProcedure
    .input(createOrderSchema)
    .mutation(async ({ ctx, input }) => {
        const client = await findClientByEmail({
            prisma: ctx.db,
            email: input.order.clientName,
        })

        const orderDetails = await createOrderDetail({
            prisma: ctx.db,
            input: input.order
        })
        const order = await createOrder({
            prisma: ctx.db,
            clientId: client.id,
            orderDataId: orderDetails.id,
        })
        const clothes = createClothes({
            prisma: ctx.db,
            input: input.items,
            orderId: order.id,
        })
    }),

    addPayment: publicProcedure
    .input(addPaymentSchema)
    .mutation(async ({ ctx, input }) => {
        const payment = input.payment
        return ctx.db.orderPayment.create({
            data: {
                paymentDate: payment.paymentDate,
                paymentMethod: payment.paymentMethod,
                status: dbOrderStatus.paid,
                invoiceType: payment.invoiceType,
                invoiceNumber: payment.invoiceNumber,
                paymentDetails: payment.paymentDetails,
                paymentTicket: payment.paymentTicket,
                Order:{
                    connect: {
                        id: input.orderId,
                    }
                }
            },
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
                    Clothing: true,
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

async function createClothes({
    prisma,
    input,
    orderId,
}: {
    prisma: PrismaClient
    input: z.infer<typeof OrderItemsDetailsSchema>
    orderId: string
}) {
    const items = transformItems(input, orderId)
    const newClothes = await prisma.clothing.createMany({
        data: items,
        skipDuplicates: true,
    })
}


function transformItems(itemsDetails: z.infer<typeof OrderItemsDetailsSchema>, orderId: string): PrismaFormatClothes[] {
    return Object.keys(itemsDetails).flatMap((key) => {
        const k = key as keyof typeof itemsDetails
        const category_items = itemsDetails[k]
        return category_items.items.flatMap((item) => {
            return {
                orderId: orderId,
                description: item.name,
                quantity: item.quantity,
                category: k
            }
        })
     })
}
