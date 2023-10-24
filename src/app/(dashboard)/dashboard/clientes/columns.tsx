import ActionsColum from "@/components/Table/actions";
import { clientsCols } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<clientsCols>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        accessorKey: 'rut',
        header: 'RUT',
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