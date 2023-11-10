import { Button } from "@/components/ui/button"
import { type clientsCols } from "@/lib/types"
import { toRut } from "@/lib/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

export const columns: ColumnDef<clientsCols>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "rut",
        header: "RUT",
        cell: ({ row }) => {
            const rut: string = row.getValue("rut")
            return toRut(rut)
        },
    },
    {
        accessorKey: "phone",
        header: "Teléfono",
    },
    {
        accessorKey: "address",
        header: "Dirección",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return (
                <Button variant="ghost">
                    <MoreHorizontal />
                </Button>
            )
        },
    },
]
