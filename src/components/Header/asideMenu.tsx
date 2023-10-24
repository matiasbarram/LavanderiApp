"use client"

import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import LeftMenuOption from "./leftMenuOption";
import HeaderLogo from "./headerLogo";
import { usePathname } from "next/navigation";
import AvatarMenu from "../Avatar/avatarMenu";

export function Aside() {
    const pathname = usePathname()

    const menuOptions = [
        { Icon: HomeIcon, text: 'Planilla', href: '/dashboard/planilla' },
        { Icon: UsersIcon, text: 'Clientes', href: '/dashboard/clientes' },
    ]

    return (
        <>

            {(
                <aside id="sidebar" className="left-0 top-0 z-40 h-screen w-64 transition-transform" aria-label="Sidebar">
                    <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
                        <HeaderLogo />
                        <ul className="space-y-2 text-sm font-medium">
                            {menuOptions.map((option, index) => (
                                <LeftMenuOption key={index} Icon={option.Icon} href={option.href} text={option.text} className={`${pathname === option.href ? 'bg-secondary dark:bg-secondary' : ''}`} />
                            ))}
                        </ul>
                        <div className="mt-auto flex w-full items-center justify-center">
                            <AvatarMenu />
                        </div>
                    </div>
                </aside>
            )
            }

        </>
    )
}