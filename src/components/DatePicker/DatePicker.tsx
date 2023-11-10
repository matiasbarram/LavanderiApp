'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { type DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    DATE_FORMAT,
    LAST_30_DAYS,
    PICK_A_DATE,
    URL_DATE_FORMAT,
    URL_SPLITTER,
} from '@/lib/constants'
import { cn, last30Days } from '@/lib/utils'
import { es } from 'date-fns/locale'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CustomTooltip from '../Tooltip/tooltip'

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
    const params = useSearchParams()
    const range = params.get('range') ? true : false

    const [date, setDate] = React.useState<DateRange | undefined>({ from, to })
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [showToday, setShowToday] = React.useState<boolean>(range)
    const router = useRouter()
    const pathname = usePathname()

    const addPageParam = (e: { from: Date; to: Date }) => {
        setShowToday(true)
        const [from, to] = [e.from, e.to].map((date) => {
            return format(date, URL_DATE_FORMAT)
        })
        const rangeParams = `?range=${from}${URL_SPLITTER}${to}`
        router.replace(pathname + rangeParams, { scroll: false })
    }

    const setToday = () => {
        router.push(pathname)
        const { from, to } = last30Days()
        setDate({ from, to })
        setShowToday(false)
    }

    return (
        <div className="flex items-center gap-2">
            {showToday && (
                <Button variant={'outline'} onClick={() => setToday()}>
                    {LAST_30_DAYS}
                </Button>
            )}
            <div className={cn('grid gap-2', className)}>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <CustomTooltip msg="Selecciona un rango de fechas para filtrar la planilla">
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={'outline'}
                                className={cn(
                                    'w-[300px] justify-start text-left font-normal',
                                    !date && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, DATE_FORMAT)} -{' '}
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
                    </CustomTooltip>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            locale={es}
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={(e: DateRange | undefined) => {
                                setDate(e)
                                if (e?.from && e.to) {
                                    setIsOpen(false)
                                    addPageParam(e as { from: Date; to: Date })
                                }
                            }}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
