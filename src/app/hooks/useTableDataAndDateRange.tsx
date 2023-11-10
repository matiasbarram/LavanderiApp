'use client'

import { URL_DATE_FORMAT, URL_SPLITTER } from '@/lib/constants'
import { getDatesFromRange, last30Days, rangeUrlFormat } from '@/lib/utils'
import { format } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface DateRange {
    from: Date
    to: Date
}

interface UseDateRangeOptions {
    updateSheets: (dates: DateRange) => void
    month: string
}

function useDateRange({ updateSheets, month }: UseDateRangeOptions) {
    const [searchMonth, setSearchMonth] = useState('')
    const params = useSearchParams()
    const prevParams = useRef(params.toString())
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (params.toString() !== prevParams.current) {
            const range = params.get('range')
            if (range !== null) {
                setSearchMonth(rangeUrlFormat({ range, defaultMonth: month }))
                const dates = getDatesFromRange(range)
                updateSheets({
                    ...dates,
                })
            } else if (prevParams.current !== null) {
                const { from, to } = last30Days()
                setSearchMonth(last30Days().title)
                updateSheets({
                    from,
                    to,
                })
            }
            prevParams.current = params.toString()
        }
    }, [params, updateSheets, month])

    const addPageParam = (e: DateRange) => {
        const [from, to] = [e.from, e.to].map((date) => {
            return format(date, URL_DATE_FORMAT)
        })
        router.push(pathname + `?range=${from}${URL_SPLITTER}${to}`)
    }

    return { searchMonth, addPageParam }
}

export default useDateRange
