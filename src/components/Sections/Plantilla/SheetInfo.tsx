"use client"

import AddPlanilla from "@/components/Modal/Sheet/addSheetModal"
import { Button } from "@/components/ui/button"
import { toLocaleDate } from "@/lib/utils"

interface SheetInfoProps {
    range: { from: Date; to: Date }
}

export default function SheetInfo({ range }: SheetInfoProps) {
    const dateInWords =
        toLocaleDate(range.from) + " - " + toLocaleDate(range.to)
    return (
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold">Planilla {dateInWords}</h1>
            <AddPlanilla btnTitle="Agregar" />
            <Button variant="secondary" size="sm">
                Exportar
            </Button>
        </div>
    )
}
