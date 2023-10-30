"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldValues } from "react-hook-form"

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
import { PENDING_STATUS, clientsData } from "@/lib/constants"
import { sheetSchema as formSchema, sheetSchema } from "@/lib/schemas"
import { type SelectorOption } from "@/lib/types"
import { toMoney } from "@/lib/utils"
import { api } from "@/trpc/react"
import { type Client } from "@prisma/client"
import { useEffect, useState } from "react"
import SubmitAndCloseBtns from "../Button/submitAndCloseModal"
import CustomInputField from "../FormFields/customInputField"
import { ReadOnlyInput } from "../FormFields/readOnlyInput"
import NumerIcon from "../Icon/numerIcon"
import OrderDetailsForm from "../Sections/AddClientModal/orderDetails"
import OrderPaymentForm from "../Sections/AddClientModal/orderPayment"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useToast } from "../ui/use-toast"
import AddClientModal from "./addClientModal"
import CloseBtn from "./closeBtn"



export default function AddPlanilla({ btnTitle }: { btnTitle: string }) {
    const [selectedClient, setSelectedClient] = useState<Client | null>()
    const [showSeco, setShowSeco] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<string>(PENDING_STATUS)
    const { toast } = useToast()
    const { mutate: addSheet, isLoading } = api.sheets.create.useMutation()

    const getClients = api.clients.getAll.useQuery()
    const allClients = getClients.data ? getClients.data : []
    const clients: SelectorOption[] = allClients.map((client) => {
        return {
            label: client.fname + " " + client.lname,
            value: client.email,
        }
    })

    const form = useForm<FieldValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deliveryCost: "$5.000",
            voucher: "",
            status: "pending",
        },
    })

    function onSubmit(values: FieldValues) {
        const sheetData = sheetSchema.parse(values)
        addSheet(sheetData, {
            onError: (error) => {
                toast({
                    title: "Error",
                    description: "No se pudo agregar la planilla",
                    duration: 2000,
                })
            },
            onSuccess: (data) => {
                toast({
                    title: "Planilla agregada",
                    description: "Se ha agregado la planilla",
                    duration: 2000,
                })
            },
            onSettled: () => {
                cleanModal(false)
            }
        })
    }

    const cleanModal = (open: boolean) => {
        if (open) return
        form.reset()
        setSelectedClient(null)
    }

    const handleSelectedUser = (client: string) => {
        setPaymentStatus(PENDING_STATUS)
        form.setValue("status", PENDING_STATUS)

        const clientData = clientsData.find((clientData) => clientData.name === client)
        const currentClient = allClients.find((clnt) => client === clnt.email)

        if (clientData) {
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
        }
        setSelectedClient(currentClient)
        toast({
            title: "Cliente seleccionado",
            description: "Se han cargado los datos de la última planilla del cliente",
            duration: 2000,
        })
    }

    useEffect(() => {
        if (paymentStatus === PENDING_STATUS) {
            form.setValue("paymentMethod", "")
            form.setValue("voucher", "")
            form.setValue("paymentDetails", "")
            form.setValue("invoice", "")
            form.resetField("paymentDate")
            form.clearErrors()

        }
    }, [form, paymentStatus])

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
                    <CloseBtn setOpen={cleanModal} open={false} />
                    <DialogTitle>Agregar Planilla</DialogTitle>
                    <DialogDescription>
                        Agrega una planilla nueva
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className={"flex items-center gap-4"}>
                            <CustomInputField formSetValue={form.setValue} control={form.control} options={clients} formFieldName="clientName" type="select" search={true} label="Cliente" placeholder="Seleccione el cliente..." setValue={handleSelectedUser} />
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
                                        <ReadOnlyInput label="Nombre" value={selectedClient.fname} />
                                        <ReadOnlyInput label="Email" value={selectedClient.email} />
                                        <ReadOnlyInput label="Teléfono" value={selectedClient.phone} />
                                        <ReadOnlyInput label="Dirección" value={selectedClient.address} />
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
                                            <OrderDetailsForm formSetValue={form.setValue} control={form.control} setShowSeco={setShowSeco} showSeco={showSeco} />
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
                                            <OrderPaymentForm formSetValue={form.setValue} control={form.control} isPaid={paymentStatus} setIsPaid={setPaymentStatus} />
                                        </CardContent>

                                    </Card>
                                </div>
                                <SubmitAndCloseBtns setOpen={cleanModal} open={false} isLoading={isLoading} />
                            </>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}