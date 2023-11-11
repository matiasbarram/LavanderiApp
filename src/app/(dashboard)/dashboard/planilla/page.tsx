import { DatePickerWithRange } from "@/components/DatePicker/DatePicker"
import ClientDataTable from "@/components/Sections/Plantilla/ClientTable"
import SheetInfo from "@/components/Sections/Plantilla/SheetInfo"
import { URL_SPLITTER } from "@/lib/constants"
import { last30Days, rangeUrlFormat } from "@/lib/utils"
import { api } from "@/trpc/server"

export default async function PlanillaPage({
    searchParams,
}: {
    searchParams: { range: string }
}) {
    let dateInWords: null | string = null
    let firstDay: Date | null = null
    let lastDay: Date | null = null

    if (searchParams.range) {
        dateInWords = rangeUrlFormat({
            range: searchParams.range,
            defaultMonth: "null",
        })
        const [from, to] = searchParams.range.split(URL_SPLITTER)
        if (!from || !to) {
            throw new Error("Invalid range")
        }
        firstDay = new Date(from)
        lastDay = new Date(to)
    } else {
        const { from, to, title } = last30Days()
        firstDay = from
        lastDay = to
    }

    const range = { from: firstDay, to: lastDay }

    const rows = await api.sheets.rowsByDateRange.query(range)

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <SheetInfo range={range} />
                <div className="flex items-center gap-2">
                    <DatePickerWithRange from={firstDay} to={lastDay} />
                </div>
            </div>
            <ClientDataTable rows={rows} range={range} />
        </>
    )
}
