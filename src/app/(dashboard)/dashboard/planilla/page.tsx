import { DatePickerWithRange } from "@/components/DatePicker/DatePicker";
import NavIcon from "@/components/Navigation/NavIcon";
import SheetInfo from "@/components/Sections/Plantilla/SheetInfo";
import Datatable from "@/components/Table/dataTable";
import { type SheetRow } from "@/lib/types";
import { transformRowsToSheetCols } from "@/lib/utils";
import { api } from "@/trpc/server";
import { columns } from "./columns";


export default async function PlanillaPage() {

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let dateInWords = new Intl.DateTimeFormat('es-CL', { year: 'numeric', month: 'long' }).format(today)
    dateInWords = dateInWords.charAt(0).toUpperCase() + dateInWords.slice(1)


    const rows = await api.sheets.rowsByDateRange.query({ from: firstDay, to: lastDay }) as SheetRow[]

    const initialData = transformRowsToSheetCols(rows)

    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <SheetInfo month={dateInWords} />
                <div className="flex items-center gap-2">
                    <DatePickerWithRange from={firstDay} to={lastDay} />
                    <NavIcon direction="left" />
                    <NavIcon direction="right" />
                </div>
            </div>
            <div className="w-full overflow-x-auto whitespace-nowrap">
                <Datatable data={initialData} columns={columns} />
            </div>
        </>
    )
}