"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInputField from "../FormFields/customInputField";
import { clientSchema } from "@/lib/schemas";
import { useState } from "react";
import SubmitAndCloseBtns from "../Button/submitAndCloseModal";


type AddUserModalProps = {
    title?: string
}


export default function AddClientModal({ title }: AddUserModalProps) {
    const btnTitle = title || "Agregar"

    const form = useForm<z.infer<typeof clientSchema>>({
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

    function onSubmit(values: z.infer<typeof clientSchema>) {
        console.log(values)
    }
    const cleanModal = (open: boolean) => { if (!open) form.reset() }

    return (
        <Dialog onOpenChange={(open) => cleanModal(open)}>
            <DialogTrigger asChild>
                <Button variant="default">{btnTitle}</Button>
            </DialogTrigger>
            <DialogContent
                className={"lg:max-w-screen-lg overflow-y-auto max-h-screen"}
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle>Nuevo cliente</DialogTitle>
                    <DialogDescription>
                        Agrega nuevo cliente
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomInputField
                                form={form}
                                type="input"
                                formFieldName="firstname"
                                label="Nombre"
                                placeholder="Nombre..."
                            />
                            <CustomInputField
                                form={form}
                                type="input"
                                formFieldName="lastname"
                                label="Apellido"
                                placeholder="Apellido..."
                            />
                            <CustomInputField
                                form={form} type="input"
                                formFieldName="rut"
                                label="Rut"
                                placeholder="Rut..."
                                formatAs="rut"
                            />
                            <CustomInputField
                                form={form}
                                type="input"
                                formFieldName="phone"
                                label="Telefono"
                                placeholder="Telefono..."
                            />
                            <CustomInputField
                                form={form}
                                type="input"
                                formFieldName="address"
                                label="Dirección"
                                placeholder="Dirección..."
                            />
                            <CustomInputField form={form} type="input" formFieldName="email" label="Email" placeholder="Email..." />
                        </div>
                        <CustomInputField form={form} type="textarea" formFieldName="description" label="Descripción" placeholder="Descripción..." />
                        <SubmitAndCloseBtns />

                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}