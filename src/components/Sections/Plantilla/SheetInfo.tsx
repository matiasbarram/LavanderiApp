"use client"

import AddPlanilla from "@/components/Modal/Sheet/addSheetModal"
import { Button } from "@/components/ui/button"
import { last30Days, rangeUrlFormat } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function SheetInfo({ month }: { month: string }) {
    const params = useSearchParams()
    const [searchMonth, setSearchMonth] = useState<string | null>(month)

    const prevParams = useRef(params.toString())
    useEffect(() => {
        if (params.toString() !== prevParams.current) {
            const range = params.get("range")
            if (range !== null) {
                setSearchMonth(rangeUrlFormat({ range, defaultMonth: month }))
            } else if (
                prevParams.current !== null &&
                params.get("range") === null
            ) {
                const { title } = last30Days()
                setSearchMonth(title)
            }
            prevParams.current = params.toString()
        }
    }, [params, month])

    return (
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Planilla {searchMonth}</h1>
            <AddPlanilla btnTitle="Agregar" />
            <Button variant="secondary" size="sm">
                Exportar
            </Button>
        </div>
    )
}
