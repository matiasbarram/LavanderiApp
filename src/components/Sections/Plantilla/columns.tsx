"use client"

import { sheetCols } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"

export const headers: ColumnDef<sheetCols>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        accessorKey: 'dates',
        header: 'Fechas',
    },
    {
        accessorKey: 'delivery',
        header: 'Entrega',
    },
    {
        accessorKey: 'payment',
        header: 'Pago',
    },
    {
        accessorKey: 'status',
        header: 'Estado',
    },
    {
        accessorKey: 'invoice',
        header: 'Tipo de comprobante',
    },
    {
        accessorKey: 'nInvoice',
        header: 'N° de comprobante',
    },
    {
        accessorKey: 'washingDry',
        header: 'Lavado y secado',
    }
]