import Header from "@/components/Header/header";
import { LeftMenu } from "@/components/Header/leftMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex mx-auto w-full">
                <LeftMenu />
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