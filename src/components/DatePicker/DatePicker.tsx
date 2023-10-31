"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DATE_FORMAT, PICK_A_DATE, URL_DATE_FORMAT, URL_SPLITTER } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { es } from "date-fns/locale"
import { usePathname, useRouter } from "next/navigation"

interface DatePickerWithRangeProps {
    className?: string
    from: Date
    to: Date
}

export function DatePickerWithRange({
    className,
    from,
    to,
}: DatePickerWithRangeProps) {

    const [date, setDate] = React.useState<DateRange | undefined>({ from, to })
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, DATE_FORMAT)} -{" "}
                                    {format(date.to, DATE_FORMAT)}
                                </>
                            ) : (
                                format(date.from, DATE_FORMAT)
                            )
                        ) : (
                            <span>{PICK_A_DATE}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        locale={es}
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(e: DateRange | undefined) => {
                            setDate(e);
                            if (e?.from && e.to) {
                                setIsOpen(false);
                                setDateRange(e);
                                const [from, to] = [e.from, e.to].map((date) => {
                                    return format(date, URL_DATE_FORMAT)
                                })
                                router.push(pathname + `?range=${from}${URL_SPLITTER}${to}`)
                            }

                        }}
                        numberOfMonths={2}

                    />
                </PopoverContent>
            </Popover>
        </div>
    )

}