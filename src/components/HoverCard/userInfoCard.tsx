"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";


export default function UserInfoCard({ name }: { name: string }) {
    const [open, setOpen] = useState(false)
    const [fname, lname] = name.split(' ')
    if (!fname || !lname) return null

    const { data: clientData, isLoading } = api.clients.getAll.useQuery()
    if (!clientData) return null

    const data = clientData.find((client) => client.fname === fname && client.lname === lname)
    return (
        <HoverCard open={open} onOpenChange={setOpen}>
            <HoverCardTrigger asChild><Button variant="link">{name}</Button></HoverCardTrigger>
            <HoverCardContent>
                {isLoading && <Skeleton />}
                {!isLoading && data && (
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold"><Mail className="inline mr-1" size={12} />{data.email}</p>
                        <p className="text-xs"><Phone className="inline mr-1" size={12} />{data.phone}</p>
                        <p className="text-xs"><MapPin className="inline mr-1" size={12} />{data.address}</p>
                    </div>
                )}

            </HoverCardContent>
        </HoverCard>
    )
}