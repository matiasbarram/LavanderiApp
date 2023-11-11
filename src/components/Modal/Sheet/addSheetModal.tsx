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

import OrderDetailsForm from "@/components/Sections/AddClientModal/orderDetails"
import OrderItemsForm from "@/components/Sections/AddClientModal/orderItems"
import { Form } from "@/components/ui/form"
import { PENDING_STATUS } from "@/lib/constants"
import { combinedOrderSchema } from "@/lib/schemas"
import {
    type ItemData,
    type OrderItemsDetails,
    type SelectorOption,
} from "@/lib/types"
import { api } from "@/trpc/react"
import { type Client } from "@prisma/client"
import { useEffect, useState } from "react"
import SubmitAndCloseBtns from "../../Button/submitAndCloseModal"
import CustomInputField from "../../FormFields/customInputField"
import OrderPaymentForm from "../../Sections/AddClientModal/orderPayment"
import { useToast } from "../../ui/use-toast"
import AddClientModal from "../addClientModal"
import CloseBtn from "../closeBtn"

export default function AddPlanilla({ btnTitle }: { btnTitle: string }) {
    const utils = api.useUtils()

    const [selectedClient, setSelectedClient] = useState<Client | null>()
    const [showSeco, setShowSeco] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<string>(PENDING_STATUS)
    const [details, setDetails] = useState<OrderItemsDetails>({
        wash: {
            show: true,
            items: [],
        },
        iron: {
            show: false,
            items: [],
        },
        washAndIron: {
            show: false,
            items: [],
        },
        dry: {
            show: false,
            items: [],
        },
    })

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
        resolver: zodResolver(combinedOrderSchema),
        defaultValues: {
            deliveryCost: "$5.000",
            voucher: "",
            status: PENDING_STATUS,
            seco: false,
        },
    })

    function onSubmit(values: FieldValues) {
        if (
            Object.values(details).every(
                (item: ItemData[]) => item.length === 0
            )
        ) {
            toast({
                title: "Ha ocurrido un error",
                description: "No se ha seleccionado ningún item",
                duration: 2000,
                variant: "destructive",
            })
            return
        }
        const sheetData = combinedOrderSchema.parse(values)
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
            },
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
        const currentClient = allClients.find((clnt) => client === clnt.email)
        setSelectedClient(currentClient)
        toast({
            title: "Cliente seleccionado",
            description:
                "Se han cargado los datos de la última planilla del cliente",
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
            form.resetField("seco")
            form.clearErrors()
        }
    }, [form, paymentStatus])

    return (
        <Dialog onOpenChange={(open) => cleanModal(open)}>
            <DialogTrigger asChild>
                <Button variant="default">{btnTitle}</Button>
            </DialogTrigger>
            <DialogContent
                className={"max-h-screen overflow-y-auto lg:max-w-screen-2xl"}
                onInteractOutside={(e) => {
                    e.preventDefault()
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
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className={"flex items-center gap-4"}>
                            <CustomInputField
                                formSetValue={form.setValue}
                                control={form.control}
                                options={clients}
                                formFieldName="clientName"
                                type="select"
                                search={true}
                                label="Cliente"
                                placeholder="Seleccione el cliente..."
                                setValue={handleSelectedUser}
                            />
                            {!selectedClient && (
                                <AddClientModal title="Nuevo cliente" />
                            )}
                            {selectedClient && (
                                <Button
                                    variant="destructive"
                                    type="button"
                                    onClick={() => cleanModal(false)}
                                    className="float-right"
                                >
                                    Limpiar
                                </Button>
                            )}
                        </div>
                        {selectedClient && (
                            <>
                                <p>dssdsadas</p>
                                {JSON.stringify(form.formState.errors)}
                                <div className="grid grid-cols-3 gap-4">
                                    <OrderDetailsForm
                                        className="col-span-1"
                                        number={1}
                                        formSetValue={form.setValue}
                                        control={form.control}
                                        setShowSeco={setShowSeco}
                                        showSeco={showSeco}
                                    />
                                    <OrderItemsForm
                                        className="col-span-1"
                                        number={2}
                                        control={form.control}
                                        details={details}
                                        setDetails={setDetails}
                                    />
                                    <OrderPaymentForm
                                        className="col-span-1"
                                        number={3}
                                        formSetValue={form.setValue}
                                        control={form.control}
                                        isPaid={paymentStatus}
                                        setIsPaid={setPaymentStatus}
                                    />
                                </div>
                                <SubmitAndCloseBtns
                                    setOpen={cleanModal}
                                    open={false}
                                    isLoading={isLoading}
                                />
                            </>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
