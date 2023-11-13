import { Aside } from "@/components/Header/asideMenu"
import Header from "@/components/Header/header"
import { api } from "@/trpc/server"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const clients = await api.clients.getAll.query()

    return (
        <>
            <div className="">
                <Aside />
                <div className="p-4 sm:ml-64">
                    <div className="mx-auto md:max-w-7xl xl:max-w-8xl">
                        <Header clients={clients} />
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </>
    )
}
