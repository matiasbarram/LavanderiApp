"use client"

import { columns } from "@/app/(dashboard)/dashboard/planilla/columns";
import useDateRange from "@/app/hooks/useTableDataAndDateRange";
import Datatable from "@/components/Table/dataTable";
import { type sheetCols, type SheetRow } from "@/lib/types";
import { transformRowsToSheetCols } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface DataTableProps {
    data: sheetCols[]
}

export default function ClientDataTable({ data }: DataTableProps) {
    const params = useSearchParams()
    const [tableData, setTableData] = useState(data)


    const { isLoading, mutate: updateSheets } = api.sheets.updateRows.useMutation({
        onSuccess: (data) => {
            const newRows = transformRowsToSheetCols(data as SheetRow[])
            setTableData(newRows)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    useDateRange({ month: "null", updateSheets });



    return (
        <div className="w-full overflow-x-auto whitespace-nowrap">
            <Datatable data={tableData} columns={columns} isLoading={isLoading} />
        </div>
    )
}