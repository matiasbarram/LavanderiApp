
import { setNullTime } from "@/lib/utils"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"

export const deliveryRouter = createTRPCRouter({
    today: publicProcedure.query(async ({ ctx }) => {
        const today =  setNullTime(new Date())
        return ctx.db.order.findMany({
            where: {
                OrderDetail: {
                    checkout: {
                        gte: today,
                        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    }
                    }
                },
                include: {
                    OrderDetail: true,
                    OrderPayment: true,
                    Client: true,
                },
                orderBy: {
                    clientId: "asc"
                }
            })
})

})