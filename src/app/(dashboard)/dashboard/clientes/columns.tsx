import ActionsColum from "@/components/Table/actions";
import { type clientsCols } from "@/lib/types";
import { ToRut } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<clientsCols>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        accessorKey: 'rut',
        header: 'RUT',
        cell: ({ row }) => {
            const rut: string = row.getValue('rut')
            return ToRut(rut)

        }
    },
    {
        accessorKey: 'phone',
        header: 'Teléfono',
    },
    {
        accessorKey: 'address',
        header: 'Dirección',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => <ActionsColum />
    }
]