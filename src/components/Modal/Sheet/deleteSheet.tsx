"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { type sheetCols } from "@/lib/types"
import { api } from "@/trpc/react"

interface DeleteSheetRowProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (value: boolean) => void
    row: sheetCols
}

export default function DeleteSheetRow({
    isEditDialogOpen,
    setIsEditDialogOpen,
    row,
}: DeleteSheetRowProps) {
    const { mutate: deleteRow, isLoading } = api.sheets.deleteRow.useMutation()
    const { toast } = useToast()
    const utils = api.useUtils()

    const handleDelete = () => {
        deleteRow(
            { id: row.id },
            {
                onSuccess: () => {
                    toast({
                        title: "Registro eliminado correctamente",
                        description:
                            "El registro ha sido eliminado correctamente",
                    })
                    utils.sheets.rowsByDateRange.invalidate().catch(() => {
                        toast({
                            title: "Error al actualizar planilla",
                            description:
                                "No se pudo actualizar la planilla, por favor recarga la página",
                        })
                    })
                },
            }
        )
    }

    return (
        <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará
                        permanentemente el registro
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        {isLoading ? "Eliminado..." : "Si, eliminar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
