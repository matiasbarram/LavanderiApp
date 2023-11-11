"use client"

import AvatarMenu from "../Avatar/avatarMenu"

export default function Header() {
    return (
        <header className="mx-auto mb-8 flex h-12 w-full items-center justify-between px-4 pt-4">
            <div></div>
            <AvatarMenu />
        </header>
    )
}
