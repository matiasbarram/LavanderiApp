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
import { type UserData, type SelectorOption } from "@/lib/types"
import CustomInputField from "../FormFields/customInputField"
import { clientsData } from "@/lib/constants"
import { sheetSchema as formSchema } from "@/lib/schemas"
import { useState } from "react"
import SubmitAndCloseBtns from "../Button/submitAndCloseModal"
import AddClientModal from "./addClientModal"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { toMoney } from "@/lib/utils"
import { useToast } from "../ui/use-toast"
import NumerIcon from "../Icon/numerIcon"
import { Label } from "../ui/label"
import OrderDetailsForm from "../Sections/AddClientModal/orderDetails"
import OrderPaymentForm from "../Sections/AddClientModal/orderPayment"


const ReadOnlyInput = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex flex-col w-[240px]">
            <Label className="mb-2">{label}: </Label>
            <div className="pl-3 py-2 px-4 rounded-md border cursor-no-drop">
                <span className="text-sm">{value}</span>
            </div>
        </div>
    )
}


const clients: SelectorOption[] = [
    { label: "Juan Perez", value: "juanperez@gmail.com" },
    { label: "Rodrigo Gonzalez", value: "rodrigogonzales@gmail.com" },
]



export default function AddPlanilla({ btnTitle }: { btnTitle: string }) {
    const [selectedClient, setSelectedClient] = useState("")
    const [userData, setUserData] = useState<UserData | null>(null)
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
        setUserData(clientData.data)
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
                                        <ReadOnlyInput label="Nombre" value={userData?.name ?? ""} />
                                        <ReadOnlyInput label="Email" value={userData?.email ?? ""} />
                                        <ReadOnlyInput label="Teléfono" value={userData?.phone ?? ""} />
                                        <ReadOnlyInput label="Dirección" value={userData?.address ?? ""} />
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
                                            <OrderDetailsForm form={form} setShowSeco={setShowSeco} showSeco={showSeco} />
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
                                            <OrderPaymentForm form={form} />
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