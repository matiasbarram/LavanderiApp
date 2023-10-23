import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import LeftMenuOption from "./leftMenuOption";
import HeaderLogo from "./headerLogo";

export function LeftMenu() {
    return (
        <aside id="sidebar" className="left-0 top-0 z-40 h-screen w-64 transition-transform" aria-label="Sidebar">
            <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
                <HeaderLogo />
                <ul className="space-y-2 text-sm font-medium">
                    <li>
                        <LeftMenuOption Icon={HomeIcon} text="Inicio" href="/" />
                    </li>
                    <li>
                        <LeftMenuOption Icon={UsersIcon} text="Clientes" href="/clientes" />
                    </li>
                </ul>
                <div className="mt-auto flex">
                    <div className="flex w-full justify-between">
                        <span className="text-sm font-medium text-black dark:text-white">email@example.com</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-roledescription="more menu" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-black dark:text-white" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                        </svg>
                    </div>
                </div>
            </div>
        </aside>

    )
}