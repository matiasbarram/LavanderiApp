import Header from "@/components/Header/header";
import { Aside } from "@/components/Header/asideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex mx-auto w-full">
                <Aside />
                <div className="flex-1">
                    <Header />
                    <main className="container mx-auto w-full px-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}