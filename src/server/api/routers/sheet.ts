import { z } from "zod";

import { sheetSchema } from "@/lib/schemas";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type PrismaClient } from "@prisma/client";

export const sheetRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(sheetSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (prisma) => {
        const client = await prisma.client.findUnique({
          where: {
            email: input.clientName,
          },
          select: {
            id: true,
          },
        });

        if (!client) {
          throw new Error("No existe el cliente.");
        }

        const orderData = await createOrderDetail({ prisma: ctx.db, input });
        const orderPayment = await createOrderPayment({ prisma: ctx.db, input });

        return createOrder({ prisma: ctx.db, clientId: client.id, orderDataId: orderData.id, orderPaymentId: orderPayment.id });
      })
    })
});



async function createOrderDetail({ prisma, input }: { prisma: PrismaClient, input: z.infer<typeof sheetSchema> }) {
  return prisma.orderDetail.create({
    data: {
      checkin: input.checkin,
      checkout: input.checkout,
      details: input.secoDetails,
      ticket: input.ticket,
    },
  });
}

async function createOrderPayment({ prisma, input }: { prisma: PrismaClient, input: z.infer<typeof sheetSchema> }) {
  return prisma.orderPayment.create({
    data: {
      amount: Number(input.total),
      shippingCost: Number(input.deliveryCost),
      paymentDate: input.paymentDate,
      paymentMethod: input.paymentMethod,
      status: input.status,
      invoiceNumber: input.invoice,
      paymentDetails: input.paymentDetails,
    },
  });
}

async function createOrder({ prisma, clientId, orderDataId, orderPaymentId }: { prisma: PrismaClient, clientId: string, orderDataId: string, orderPaymentId: string }) {
  return prisma.order.create({
    data: {
      clientId,
      orderDataId,
      orderPaymentId,
    },
  });
}