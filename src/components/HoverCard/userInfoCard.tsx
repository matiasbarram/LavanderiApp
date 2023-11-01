"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";


export default function UserInfoCard({ name }: { name: string }) {
    const [open, setOpen] = useState(false)
    const [fname, lname] = name.split(' ')

    const { data: users, isLoading, mutate: getUsers } = api.sheets.userInfo.useMutation()
    const data = users?.[0]

    useEffect(() => {
        if (!fname || !lname) return
        if (open && !data) {
            getUsers({
                fname,
                lname
            })
        }

    }, [getUsers, fname, lname, open, data])



    return (
        <HoverCard open={open} onOpenChange={setOpen}>
            <HoverCardTrigger asChild><Button variant="link">{name}</Button></HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col gap-1">

                    {isLoading && (
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    )}
                    {!isLoading && data && (
                        <>
                            <p className="text-xs font-semibold"><Mail className="inline mr-1" size={12} />{data.email}</p>
                            <p className="text-xs"><Phone className="inline mr-1" size={12} />{data.phone}</p>
                            <p className="text-xs"><MapPin className="inline mr-1" size={12} />{data.address}</p>
                        </>
                    )}
                </div>

            </HoverCardContent>
        </HoverCard>
    )
}