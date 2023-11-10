'use client'

import {
    CLEAR_FILTERS,
    booleanOptions,
    invoiceOptions,
    paymentMethods,
    statusOptions,
} from '@/lib/constants'
import { type Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DataTableFacetedFilter } from './dataTableFilters'
import { DataTableViewOptions } from './dataTableViewOptions'

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Input
                        placeholder="Filtrar por nombre..."
                        value={
                            (table
                                .getColumn('name')
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn('name')
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-xs"
                    />

                    {table.getColumn('invoice') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('invoice')}
                            title="Tipo de factura"
                            options={invoiceOptions}
                        />
                    )}

                    {table.getColumn('status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('status')}
                            title="Estado de pago"
                            options={statusOptions}
                        />
                    )}

                    {table.getColumn('paymentMethod') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('paymentMethod')}
                            title="Método de pago"
                            options={paymentMethods}
                        />
                    )}
                    {table.getColumn('washingDry') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('washingDry')}
                            title="¿Va a seco?"
                            options={booleanOptions}
                        />
                    )}

                    {isFiltered && (
                        <Button
                            variant="destructive"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            <span className="text-sm">{CLEAR_FILTERS}</span>
                            <X className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
            <DataTableViewOptions table={table} />
        </>
    )
}
