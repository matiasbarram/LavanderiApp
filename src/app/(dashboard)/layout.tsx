import { Aside } from "@/components/Header/asideMenu"
import Header from "@/components/Header/header"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="">
                <Aside />
                <div className="p-4 sm:ml-64">
                    <div className="xl:max-w-8xl mx-auto md:max-w-7xl">
                        <Header />
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </>
    )
}
