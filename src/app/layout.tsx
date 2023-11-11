import "@/styles/globals.css"

import { Inter } from "next/font/google"
import { headers } from "next/headers"

import { Toaster } from "@/components/ui/toaster"
import { TRPCReactProvider } from "@/trpc/react"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata = {
    title: "Lavandería",
    description: "Lavandería",
    image: "/logo.png",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className={`font-sans ${inter.variable}`}>
                <TRPCReactProvider headers={headers()}>
                    {children}
                </TRPCReactProvider>
                <Toaster />
            </body>
        </html>
    )
}
