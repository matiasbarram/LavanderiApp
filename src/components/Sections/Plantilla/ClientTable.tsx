"use client"

import { columns } from "@/app/(dashboard)/dashboard/planilla/columns"
import Datatable from "@/components/Table/dataTable"
import { categories, categoriesLabels } from "@/lib/constants"
import { type SheetRow } from "@/lib/types"
import { getClothesCategoryColor, transformRowsToSheetCols } from "@/lib/utils"
import { api } from "@/trpc/react"

interface DataTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any[]
    range: { from: Date; to: Date }
}

export const ColorsLegend = () => {
    return (
        <div className="mb-4 flex items-center gap-2">
            {categories.map((category) => {
                const label =
                    categoriesLabels[category as keyof typeof categoriesLabels]
                return (
                    <div key={category} className="flex items-center gap-2">
                        <div
                            className={`h-4 w-4 rounded-full bg-${getClothesCategoryColor(
                                category
                            )}`}
                        />
                        <span className="text-sm">{label.long}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default function ClientDataTable({ rows, range }: DataTableProps) {
    const { data: tableData, isLoading } = api.sheets.rowsByDateRange.useQuery(
        range,
        { initialData: rows }
    )
    const newRows = transformRowsToSheetCols(tableData as SheetRow[])

    return (
        <div className="w-full overflow-x-auto whitespace-nowrap">
            <ColorsLegend />
            <Datatable data={newRows} columns={columns} isLoading={isLoading} />
        </div>
    )
}
