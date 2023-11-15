"use client"

import { type sheetCols } from "@/lib/types"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import AddPayment from "../Modal/Sheet/addPayment"
import DeleteSheetRow from "../Modal/Sheet/deleteSheet"
import EditSheetRow from "../Modal/Sheet/editSheetRow"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function ActionsColum({ row }: { row: sheetCols }) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false)

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {row.status === "pending" && (
                        <DropdownMenuItem
                            onClick={() => setIsAddPaymentDialogOpen(true)}
                        >
                            <span className="font-medium">Agregar pago</span>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteSheetRow
                row={row}
                isEditDialogOpen={isDeleteDialogOpen}
                setIsEditDialogOpen={setIsDeleteDialogOpen}
            />
            <EditSheetRow
                isEditDialogOpen={isEditDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
                row={row}
            />
            <AddPayment
                isEditDialogOpen={isAddPaymentDialogOpen}
                setIsEditDialogOpen={setIsAddPaymentDialogOpen}
                row={row}
            />
        </div>
    )
}
