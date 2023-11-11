import { sheetRouter } from "@/server/api/routers/sheet"
import { createTRPCRouter } from "@/server/api/trpc"
import { clientRouter } from "./routers/client"
import { deliveryRouter } from "./routers/delivery"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    sheets: sheetRouter,
    clients: clientRouter,
    delivery: deliveryRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
