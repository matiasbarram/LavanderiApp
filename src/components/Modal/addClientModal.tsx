"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { clientSchema } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import SubmitAndCloseBtns from "../Button/submitAndCloseModal";
import CustomInputField from "../FormFields/customInputField";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import CloseBtn from "./closeBtn";


type AddUserModalProps = {
    title?: string
}


export default function AddClientModal({ title }: AddUserModalProps) {
    const btnTitle = title ? title : "Agregar cliente"
    const addClient = api.clients.create.useMutation()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)

    const form = useForm<FieldValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            firstname: "",
            address: "",
            lastname: "",
            rut: "",
            phone: "",
            email: "",
            description: ""
        },
    })

    function onSubmit(values: FieldValues) {
        const clietData = clientSchema.parse(values)
        addClient.mutate(clietData, {
            onSuccess: () => {
                toast({
                    title: "Cliente agregado correctamente",
                    description: "El cliente ha sido agregado correctamente",
                })
                form.reset()
            },
            onError: (error) => {
                toast({
                    title: "Error al agregar cliente",
                    description: error.message,
                })
            },
            onSettled: () => setOpen(false)
        })
    }

    const cleanModal = (open: boolean) => { if (!open) form.reset() }

    return (
        <Dialog
            onOpenChange={(open) => cleanModal(open)}
            open={open}
        >
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    variant="default">{btnTitle}</Button>
            </DialogTrigger>
            <DialogContent

                className={"lg:max-w-screen-lg overflow-y-auto max-h-screen"}
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <CloseBtn setOpen={setOpen} open={open} />
                    <DialogTitle>Nuevo cliente</DialogTitle>
                    <DialogDescription>
                        Agrega nuevo cliente
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomInputField
                                control={form.control}
                                type="input"
                                formFieldName="firstname"
                                label="Nombre"
                                placeholder="Nombre..."
                            />
                            <CustomInputField
                                control={form.control}
                                type="input"
                                formFieldName="lastname"
                                label="Apellido"
                                placeholder="Apellido..."
                            />
                            <CustomInputField
                                control={form.control}
                                type="input"
                                formFieldName="rut"
                                label="Rut"
                                placeholder="Rut..."
                                formatAs="rut"
                            />
                            <CustomInputField
                                control={form.control}
                                type="input"
                                formFieldName="phone"
                                label="Telefono"
                                placeholder="Telefono..."
                            />
                            <CustomInputField
                                control={form.control}
                                type="input"
                                formFieldName="address"
                                label="Dirección"
                                placeholder="Dirección..."
                            />
                            <CustomInputField control={form.control} type="input" formFieldName="email" label="Email" placeholder="Email..." />
                        </div>
                        <CustomInputField control={form.control} type="textarea" formFieldName="detalle" label="Detalle" placeholder="Este será el detalle por defecto del cliente..." />
                        <SubmitAndCloseBtns setOpen={setOpen} open={open} />
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}