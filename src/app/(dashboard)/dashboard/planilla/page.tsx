import { DatePickerWithRange } from "@/components/DatePicker/DatePicker";
import SheetInfo from "@/components/Sections/Plantilla/SheetInfo";
import Datatable from "@/components/Table/dataTable";
import { URL_SPLITTER } from "@/lib/constants";
import { type SheetRow } from "@/lib/types";
import { firstAndLastDayOfMonth, rangeUrlFormat, toLocaleDate, transformRowsToSheetCols } from "@/lib/utils";
import { api } from "@/trpc/server";
import { columns } from "./columns";


export default async function PlanillaPage({ searchParams }: { searchParams: { range: string } }) {
    let dateInWords: null | string = null
    let firstDay: Date | null = null
    let lastDay: Date | null = null

    if (searchParams.range) {
        console.log("Founded!!", searchParams.range)
        dateInWords = rangeUrlFormat({ range: searchParams.range, defaultMonth: "null" })
        const [from, to] = searchParams.range.split(URL_SPLITTER)
        if (!from || !to) {
            throw new Error("Invalid range")
        }
        firstDay = new Date(from)
        lastDay = new Date(to)
    }
    else {
        const today = new Date();
        dateInWords = toLocaleDate(today)
        const { firstDay: fday, lastDay: lday } = firstAndLastDayOfMonth(today)
        firstDay = fday
        lastDay = lday
    }


    const rows = await api.sheets.rowsByDateRange.query({ from: firstDay, to: lastDay }) as SheetRow[]

    const initialData = transformRowsToSheetCols(rows)

    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <SheetInfo month={dateInWords} />
                <div className="flex items-center gap-2">
                    <DatePickerWithRange from={firstDay} to={lastDay} />
                </div>
            </div>
            <div className="w-full overflow-x-auto whitespace-nowrap">
                <Datatable data={initialData} columns={columns} />
            </div>
        </>
    )
}