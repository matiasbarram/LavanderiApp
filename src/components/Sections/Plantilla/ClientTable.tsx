"use client"

import { columns } from "@/app/(dashboard)/dashboard/planilla/columns";
import Datatable from "@/components/Table/dataTable";
import { type sheetCols, type SheetRow } from "@/lib/types";
import { firstAndLastDayOfMonth, getDatesFromRange, transformRowsToSheetCols } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface DataTableProps {
    data: sheetCols[]
}

export default function ClientDataTable({ data }: DataTableProps) {
    const params = useSearchParams()
    const utils = api.useUtils();
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

    const prevParams = useRef(params.toString());
    useEffect(() => {
        if (params.toString() !== prevParams.current) {
            const range = params.get("range");
            if (range !== null) {
                const dates = getDatesFromRange(range);
                updateSheets({
                    ...dates,
                });
            } else if (prevParams.current !== null) {
                const currentDate = new Date();
                const { firstDay, lastDay } = firstAndLastDayOfMonth(currentDate);
                updateSheets({
                    from: firstDay,
                    to: lastDay,
                });
            }
            prevParams.current = params.toString();
        }
    }, [params, updateSheets]);

    return (
        <div className="w-full overflow-x-auto whitespace-nowrap">
            <Datatable data={tableData} columns={columns} isLoading={isLoading} />
        </div>
    )
}