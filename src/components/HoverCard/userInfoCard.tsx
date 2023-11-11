"use client"

import { api } from "@/trpc/react"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

export default function UserInfoCard({ name }: { name: string }) {
    const [open, setOpen] = useState(false)
    const [fname, lname] = name.split(" ")

    const utils = api.useUtils()
    const clients = utils.clients.getAll.getData()
    const client = clients?.find((c) => c.fname === fname && c.lname === lname)

    if (!client) return null

    return (
        <HoverCard open={open} onOpenChange={setOpen}>
            <HoverCardTrigger asChild>
                <Button variant="link">{name}</Button>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col gap-1">
                    {
                        <>
                            <p className="text-xs font-semibold">
                                <Mail className="mr-1 inline" size={12} />
                                {client.email}
                            </p>
                            <p className="text-xs">
                                <Phone className="mr-1 inline" size={12} />
                                {client.phone}
                            </p>
                            <p className="text-xs">
                                <MapPin className="mr-1 inline" size={12} />
                                {client.address}
                            </p>
                        </>
                    }
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
