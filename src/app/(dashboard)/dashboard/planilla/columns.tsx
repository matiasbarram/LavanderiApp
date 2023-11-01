"use client"

import DateBadge from "@/components/Badge/DateBadge"
import UserInfoCard from "@/components/HoverCard/userInfoCard"
import ActionsColum from "@/components/Table/actions"
import { DataTableColumnHeader } from "@/components/Table/dataTableColumnHeader"
import { Badge } from "@/components/ui/badge"
import { NEGATIVE_BOOLEAN, PAID_LABEL, PAID_VALUE, PENDING_LABEL, PENDING_VALUE, POSITIVE_BOOLEAN, invoiceOptions } from "@/lib/constants"
import { type SelectorOption, type paymentMethods, type sheetCols } from "@/lib/types"
import { toLocaleDate, toMoney } from "@/lib/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

type invoiceVariant = 'default' | 'outline'
interface invoiceData {
    title: string
    variant: invoiceVariant
}

type statusVariant = 'default' | 'outline' | 'secondary' | 'destructive'

type dateRange = {
    from: Date
    to: Date
}


export const columns: ColumnDef<sheetCols>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Nombre" />

        },
        cell: ({ row }) => {
            const name: string = row.getValue('name')
            return <UserInfoCard name={name} />
        },
    },
    {
        accessorKey: 'dates',
        header: 'Fechas de ingreso y entrega',
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
        filterFn: (row, id, value: unknown[]) => {
            return value.includes(row.getValue(id))
        },
        cell: ({ row }) => {
            const status = row.getValue('status');
            const statusData: { title: string, variant: statusVariant | null }
                = { title: '', variant: null };

            switch (status) {
                case PAID_VALUE:
                    statusData.title = PAID_LABEL;
                    statusData.variant = 'default';
                    break;
                case PENDING_VALUE:
                    statusData.title = PENDING_LABEL;
                    statusData.variant = 'secondary';
                    break;
                default:
                    statusData.title = 'No pagado';
                    statusData.variant = 'destructive';
                    break;
            }
            return (
                <Badge variant={statusData.variant}>
                    {statusData.title}
                </Badge>
            )
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
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Fecha de pago" />
        },
        cell: ({ row }) => {
            const date: string = row.getValue('payment')
            if (!date) return null
            const formatted = toLocaleDate(date)
            return formatted
        },
    },
    {

        accessorKey: 'paymentTotal',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Total" />
        },
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
        filterFn: (row, id, value: unknown[]) => {
            return value.includes(row.getValue(id))
        },
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
        filterFn: (row, id, value: unknown[]) => {
            return value.includes(row.getValue(id))
        },
        cell: ({ row }) => {
            const type = row.getValue('invoice')
            if (!type) return null
            const option = invoiceOptions.find((option: SelectorOption) => {
                if (option.value === type) {
                    return option
                }
            })
            return option?.label
        }
    },
    {
        accessorKey: 'nInvoice',
        header: 'N° de comprobante',
    },
    {
        accessorKey: 'washingDry',
        header: '¿Va al seco?',
        filterFn: (row, id, value: unknown[]) => {
            const findValue: boolean[] = []
            const posibleValues = [NEGATIVE_BOOLEAN, POSITIVE_BOOLEAN]
            const currentRow: boolean = row.getValue(id)
            value.forEach((val) => {
                const vl = val === POSITIVE_BOOLEAN ? true : false
                if (vl === currentRow) {
                    findValue.push(vl)
                }
            })
            return findValue.includes(currentRow)


        },
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