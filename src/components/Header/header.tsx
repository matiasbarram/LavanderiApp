"use client"

import { api } from "@/trpc/react"
import { type Client } from "@prisma/client"
import AvatarMenu from "../Avatar/avatarMenu"

export default function Header({ clients }: { clients: Client[] }) {
    api.clients.getAll.useQuery(undefined, { initialData: clients })
    return (
        <header className="mx-auto mb-8 flex h-12 w-full items-center justify-between px-4 pt-4">
            <div></div>
            <AvatarMenu />
        </header>
    )
}
