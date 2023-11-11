
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"

export const deliveryRouter = createTRPCRouter({
    today: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.orderDetail.findMany({
            where: {
                checkout: new Date()
            },
            include: {
                Order: {
                    include: {
                        Client: true,
                    },
                },
            },
        })
})

})