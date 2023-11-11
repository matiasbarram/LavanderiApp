"use client"

import { columns } from "@/app/(dashboard)/dashboard/planilla/columns"
import Datatable from "@/components/Table/dataTable"
import { type SheetRow } from "@/lib/types"
import { transformRowsToSheetCols } from "@/lib/utils"
import { api } from "@/trpc/react"

interface DataTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any[]
    range: { from: Date; to: Date }
}

export default function ClientDataTable({ rows, range }: DataTableProps) {
    const { data: tableData, isLoading } = api.sheets.rowsByDateRange.useQuery(
        range,
        { initialData: rows }
    )
    const newRows = transformRowsToSheetCols(tableData as SheetRow[])

    return (
        <div className="w-full overflow-x-auto whitespace-nowrap">
            <Datatable data={newRows} columns={columns} isLoading={isLoading} />
        </div>
    )
}
