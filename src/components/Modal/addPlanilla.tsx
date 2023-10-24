"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Form } from "@/components/ui/form"
import { SelectorOption } from "@/lib/types"
import CustomInputField from "../FormFields/customInputField"
import { invoiceOptions, statusOptions } from "@/lib/constants"
import { sheetSchema as formSchema } from "@/lib/schemas"
import { useState } from "react"
import SubmitAndCloseBtns from "../Button/submitAndCloseModal"
import AddClientModal from "./addClientModal"


const clients: SelectorOption[] = [
    { label: "Juan Perez", value: "juanperez@gmail.com" },
    { label: "Rodrigo Gonzalez", value: "rodrigogonzales@gmail.com" },
]

export default function AddPlanilla({ btnTitle }: { btnTitle: string }) {
    const [selectedClient, setSelectedClient] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deliveryCost: "",
            voucher: "",
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const cleanModal = (open: boolean) => {
        if (!open) {
            form.reset()
            setSelectedClient("")
        }
    }

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
                    <DialogTitle>Agregar Planilla</DialogTitle>
                    <DialogDescription>
                        Agrega una planilla nueva
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className={"flex items-center gap-4"}>
                            <CustomInputField form={form} options={clients} formFieldName="clientName" type="select" label="Cliente" placeholder="Seleccione el cliente..." setValue={setSelectedClient} />
                            {!selectedClient && <AddClientModal title="Nuevo cliente" />}
                            {selectedClient && <Button variant="destructive" type="button" onClick={() => cleanModal(false)} className="float-right" >Limpiar</Button>}
                        </div>
                        {selectedClient && (
                            <div className="flex flex-col gap-4 animate-in fade-in animate-out fade-out">
                                <div className="flex gap-4">
                                    <CustomInputField form={form} formFieldName="checkin" type="calendar" label="Fecha de ingreso" placeholder="Seleccione la fecha..." />
                                    <CustomInputField form={form} formFieldName="checkout" type="calendar" label="Fecha de salida" placeholder="Seleccione la fecha..." />
                                </div>
                                <CustomInputField
                                    form={form}
                                    type="input"
                                    formFieldName="deliveryCost"
                                    label="Costo de entrega"
                                    placeholder="Ingrese el costo..."
                                    formatAs="currency"
                                />
                                <CustomInputField form={form} type="calendar" formFieldName="paymentDate" label="Fecha de pago" placeholder="Ingrese la fecha..." />
                                <CustomInputField form={form} type="select" options={invoiceOptions} formFieldName="invoice" label="Tipo de factura" placeholder="Seleccione el tipo..." />
                                <CustomInputField form={form} type="select" options={statusOptions} formFieldName="status" label="Estado" placeholder="Seleccione el estado..." />
                                <CustomInputField
                                    form={form}
                                    type="input"
                                    formFieldName="voucher"
                                    label="N° de comprobante"
                                    placeholder="Ingrese el N° de comprobante..."
                                />
                                <SubmitAndCloseBtns />
                            </div>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}