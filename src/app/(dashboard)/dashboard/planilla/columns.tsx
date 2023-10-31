"use client"

import DateBadge from "@/components/Badge/DateBadge"
import UserInfoCard from "@/components/HoverCard/userInfoCard"
import ActionsColum from "@/components/Table/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type paymentMethods, type sheetCols } from "@/lib/types"
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
    from: Date
    to: Date
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
        cell: ({ row }) => {
            const name: string = row.getValue('name')
            return <UserInfoCard name={name} />
        },
    },
    {
        accessorKey: 'dates',
        header: 'Fechas',
        cell: ({ row }) => {
            const dates: dateRange = row.getValue('dates')
            const from = toLocaleDate(dates.from)
            const to = toLocaleDate(dates.to)
            return (
                <div className="flex flex-col gap-1">
                    <DateBadge date={from} Icon={ArrowDownLeft} />
                    <DateBadge date={to} Icon={ArrowUpRight} />
                </div>
            )
        }
    },
    {
        accessorKey: 'status',
        header: 'Estado de pago',
        cell: ({ row }) => {
            const status = row.getValue('status')
            const statusData: statusData = status === 'paid' ? { title: 'Pagado', variant: 'default' } : status === 'pending' ? { title: 'Pendiente', variant: 'secondary' } : { title: 'No pagado', variant: 'destructive' }
            return <Badge variant={statusData.variant}>{statusData.title}</Badge>
        },
    },
    {
        accessorKey: 'delivery',
        header: 'Costo de envío',
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
            if (!date) return null
            const formatted = toLocaleDate(date)
            return formatted
        },
    },
    {
        accessorKey: 'paymentTotal',
        header: 'Total pagado',
        cell: ({ row }) => {
            const amount: number | null = row.getValue('paymentTotal')
            if (!amount) return 'Pago pendiente'
            const formatted = toMoney(amount)
            return formatted
        },
    },
    {
        accessorKey: 'paymentMethod',
        header: 'Forma de pago',
        cell: ({ row }) => {
            const method: paymentMethods = row.getValue('paymentMethod')
            switch (method) {
                case 'cash':
                    return 'Efectivo'
                case 'creditCard':
                    return 'Crédito'
                case 'transfer':
                    return 'Transferencia'
                case 'debitCard':
                    return 'Débito'
                default:
                    return null
            }
        },
    },
    {
        accessorKey: 'invoice',
        header: 'Tipo de comprobante',
        cell: ({ row }) => {
            const type = row.getValue('invoice')
            if (!type) return null
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
        header: '¿Va al seco?',
        cell: ({ row }) => {
            const seco: boolean = row.getValue('washingDry')
            return seco ? 'Si' : 'No'

        }
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const currentRow = row.original
            return (
                <ActionsColum row={currentRow} />
            )
        }
    }
]