"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"

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
import { type SelectorOption } from "@/lib/types"
import CustomInputField from "../FormFields/customInputField"
import { invoiceOptions, statusOptions } from "@/lib/constants"
import { sheetSchema as formSchema } from "@/lib/schemas"
import { useState } from "react"
import SubmitAndCloseBtns from "../Button/submitAndCloseModal"
import AddClientModal from "./addClientModal"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { toMoney } from "@/lib/utils"
import { useToast } from "../ui/use-toast"
import NumerIcon from "../Icon/numerIcon"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"


const clients: SelectorOption[] = [
    { label: "Juan Perez", value: "juanperez@gmail.com" },
    { label: "Rodrigo Gonzalez", value: "rodrigogonzales@gmail.com" },
]
type LastSheet = {
    checkin: string;
    checkout: string;
    deliveryCost: number;
    paymentDate: string;
    status: string;
    invoice: string;
    voucher: string;
    [key: string]: string | number;
}

type ClientData = {
    name: string;
    lastSheet: LastSheet;
}

const clientsData = [
    {
        name: "juanperez@gmail.com",
        lastSheet: {
            checkin: "2021-09-01",
            checkout: "2021-09-15",
            deliveryCost: 5000,
            paymentDate: "2021-09-15",
            status: "pending",
            invoice: "bill",
            voucher: "123456",
        }
    },
    {
        "name": "rodrigogonzales@gmail.com",
        lastSheet: {
            checkin: "2022-10-01",
            checkout: "2022-12-15",
            deliveryCost: 2500,
            paymentDate: "2023-09-15",
            status: "pending",
            invoice: "bill",
            voucher: "654321",
        }
    }
] as ClientData[]

const paymentMethods: SelectorOption[] = [
    { label: "Efectivo", value: "cash" },
    { label: "Tarjeta de Crédito", value: "creditCard" },
    { label: "Tarjeta de Débito", value: "debitCard" },
    { label: "Transferencia", value: "transfer" },
]

export default function EditPlanilla({ btnTitle, client }: { btnTitle: string, client: string }) {
    const [selectedClient, setSelectedClient] = useState(client)
    const [showSeco, setShowSeco] = useState(false)
    const { toast } = useToast()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deliveryCost: "5000",
            voucher: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const cleanModal = (open: boolean) => {
        if (open) return
        form.reset()
        setSelectedClient("")
    }

    const handleSelectedUser = (client: string) => {
        const clientData = clientsData.find((clientData) => clientData.name === client)
        if (!clientData) { console.log("no client data", client); return }

        Object.keys(clientData.lastSheet).forEach((key: keyof typeof clientData.lastSheet) => {
            switch (key) {
                case "checkin":
                    const today = new Date()
                    form.setValue("checkin", today)
                    break;
                case "deliveryCost":
                    const formatCost = toMoney(clientData.lastSheet.deliveryCost)
                    form.setValue("deliveryCost", formatCost)
                    break;
                case "status":
                    form.setValue("status", clientData.lastSheet.status)
                    break;
                case "invoice":
                    form.setValue("invoice", clientData.lastSheet.invoice)
                    break;
            }
        })
        setSelectedClient(client)
        toast({
            title: "Cliente seleccionado",
            description: "Se han cargado los datos de la última planilla del cliente",
            duration: 2000,
        })
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
                            <CustomInputField form={form} options={clients} formFieldName="clientName" type="select" search={true} label="Cliente" placeholder="Seleccione el cliente..." setValue={handleSelectedUser} />
                            {!selectedClient && <AddClientModal title="Nuevo cliente" />}
                            {selectedClient && <Button variant="destructive" type="button" onClick={() => cleanModal(false)} className="float-right" >Limpiar</Button>}
                        </div>
                        {selectedClient && (
                            <>
                                <Card className="bg-secondary">
                                    <CardHeader>
                                        <div className="flex justify-start items-center gap-4">
                                            <NumerIcon number={1} />
                                            <CardTitle>Información del cliente</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4">
                                        {/* Add readonly user data */}
                                    </CardContent>
                                </Card>
                                <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader>
                                            <div className="flex justify-start items-center gap-4">
                                                <NumerIcon number={2} />
                                                <CardTitle>Detalles de ingreso</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CustomInputField form={form} formFieldName="checkin" type="calendar" label="Fecha de ingreso" placeholder="Seleccione la fecha..." />
                                            <CustomInputField form={form} formFieldName="checkout" type="calendar" label="Fecha de entrega" placeholder="Seleccione la fecha..." />
                                            <CustomInputField form={form} type="input" formFieldName="deliveryCost" label="Costo de entrega" placeholder="Ingrese el costo..." formatAs="currency" />
                                            <CustomInputField form={form} type="input" formFieldName="ticket" label="N° de ticket" placeholder="Ingrese el N° de ticket..." />
                                            <CustomInputField form={form} type="textarea" formFieldName="detalle" label="Detalle" placeholder="Ingrese el detalle del pedido..." />
                                            <div className="flex items-center space-x-2">
                                                <Switch id="is-seco" onCheckedChange={(checked) => setShowSeco(checked)} />
                                                <Label htmlFor="airplane-mode">¿Va al seco?</Label>
                                            </div>
                                            {showSeco && (
                                                <CustomInputField form={form} type="textarea" formFieldName="seco" label="Seco" placeholder="Ingrese el detalle del pedido..." />
                                            )}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <div className="flex justify-start items-center gap-4">
                                                <NumerIcon number={3} />
                                                <CardTitle>Detalles de pago</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CustomInputField form={form} type="input" formFieldName="total" label="Total pagado" placeholder="Ingrese el total..." formatAs="currency" />
                                            <CustomInputField form={form} type="calendar" formFieldName="paymentDate" label="Fecha de pago" placeholder="Ingrese la fecha..." />
                                            <CustomInputField form={form} type="select" options={paymentMethods} formFieldName="paymentMethod" label="Forma de pago" placeholder="Seleccione la forma..." />
                                            <CustomInputField form={form} type="select" options={invoiceOptions} formFieldName="invoice" label="Tipo de factura" placeholder="Seleccione el tipo..." />
                                            <CustomInputField form={form} type="select" options={statusOptions} formFieldName="status" label="Estado" placeholder="Seleccione el estado..." />
                                            <CustomInputField form={form} type="input" formFieldName="voucher" label="N° de comprobante" placeholder="Ingrese el N° de comprobante..." />
                                        </CardContent>
                                    </Card>
                                </div>
                                <SubmitAndCloseBtns />
                            </>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}