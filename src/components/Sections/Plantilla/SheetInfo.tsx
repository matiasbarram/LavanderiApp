"use client"

import AddPlanilla from "@/components/Modal/Sheet/addSheetModal";
import { Button } from "@/components/ui/button";
import { rangeUrlFormat } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SheetInfo({ month }: { month: string }) {
    const params = useSearchParams()
    const [searchMonth, setSearchMonth] = useState<string | null>(month)

    useEffect(() => {
        const range = params.get('range')
        if (range) {
            setSearchMonth(rangeUrlFormat({ range, defaultMonth: month }))
        }
    }, [params, month])

    return (
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Planilla {searchMonth}</h1>
            <AddPlanilla btnTitle="Agregar" />
            <Button variant="secondary" size="sm">Exportar</Button>
        </div>
    )
}