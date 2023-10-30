"use client"

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


export default function ActionsColum({ }) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" >
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => setIsEditDialogOpen(true)}>
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={isEditDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Estás seguro?</DialogTitle>
                        <DialogDescription>
                            ¿Quieres eliminar la entrada? Eliminar esta entrada no se puede
                            deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild onClick={() => setIsEditDialogOpen(false)}>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button>Eliminar entrada</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

