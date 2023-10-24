"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInputField from "../FormFields/customInputField";
import { clientSchema } from "@/lib/schemas";


interface AddUserModalProps {
    btnVariant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}


export default function AddClientModal({ btnVariant }: AddUserModalProps) {

    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema)
    })

    const onSubmit = (data: z.infer<typeof clientSchema>) => {
        console.log(data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={btnVariant}>Agregar</Button>
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto max-h-screen"}>
                <DialogHeader>
                    <DialogTitle>Crear cliente</DialogTitle>
                    <DialogDescription>
                        Nuevo cliente
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomInputField form={form} type="input" formFieldName="name" label="Nombre" placeholder="Nombre..." />
                            <CustomInputField form={form} type="input" formFieldName="lastName" label="Apellido" placeholder="Apellido..." />
                            <CustomInputField form={form} type="input" formFieldName="rut" formatAs="rut" label="Rut" placeholder="Rut..." />
                            <CustomInputField form={form} type="input" formFieldName="phone" label="Telefono" placeholder="Telefono..." />
                            <CustomInputField form={form} type="input" formFieldName="address" label="Dirección" placeholder="Dirección..." />
                            <CustomInputField form={form} type="input" formFieldName="email" label="Email" placeholder="Email..." />
                        </div>
                        <CustomInputField form={form} type="textarea" formFieldName="description" label="Descripción" placeholder="Descripción..." />
                        <DialogFooter>
                            <Button type="submit" className="w-full" >Crear Cliente</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}