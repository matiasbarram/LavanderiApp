"use client"

import DateBadge from "@/components/Badge/DateBadge"
import ActionsColum from "@/components/Table/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type sheetCols } from "@/lib/types"
import { toLocaleDate, toMoney } from "@/lib/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { ArrowDownLeft, ArrowUpDown, ArrowUpRight } from "lucide-react"

type invoiceVariant = 'default' | 'outline'
interface invoiceData {
    title: string
    variant: invoiceVariant
}

type statusVariant = 'default' | 'outline' | 'secondary' | 'destructive'
interface statusData {
    title: string
    variant: statusVariant
}

type dateRange = {
    from: string
    to: string
}


export const columns: ColumnDef<sheetCols>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'dates',
        header: 'Fechas',
        cell: ({ row }) => {
            const dates: dateRange = row.getValue('dates')
            const from = dates.from
            const to = dates.to
            return (
                <div className="flex flex-col gap-1">
                    <DateBadge date={from} Icon={ArrowDownLeft} />
                    <DateBadge date={to} Icon={ArrowUpRight} />
                </div>
            )
        }
    },
    {
        accessorKey: 'delivery',
        header: 'Entrega',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('delivery'))
            const formatted = toMoney(amount)
            return formatted
        }
    },
    {
        accessorKey: 'payment',
        header: 'Pago',
        cell: ({ row }) => {
            const date: string = row.getValue('payment')
            const formatted = toLocaleDate(date)
            return formatted
        },
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => {
            // status: 'paid' | 'pending' | 'unpaid'
            const status = row.getValue('status')
            const statusData: statusData = status === 'paid' ? { title: 'Pagado', variant: 'default' } : status === 'pending' ? { title: 'Pendiente', variant: 'secondary' } : { title: 'No pagado', variant: 'destructive' }
            return <Badge variant={statusData.variant}>{statusData.title}</Badge>
        },
    },
    {
        accessorKey: 'invoice',
        header: 'Tipo de comprobante',
        cell: ({ row }) => {
            const type = row.getValue('invoice')
            const invoiceData: invoiceData = type === 'bill' ? { title: 'Factura', variant: 'default' } : { title: 'Boleta', variant: 'outline' }
            return invoiceData.title
        }
    },
    {
        accessorKey: 'nInvoice',
        header: 'N° de comprobante',
    },
    {
        accessorKey: 'washingDry',
        header: 'Lavado y secado',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('washingDry'))
            const formatted = toMoney(amount)
            return formatted
        }
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            return (
                <ActionsColum />
            )
        }
    }
]