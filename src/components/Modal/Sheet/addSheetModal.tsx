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
import OrderSelectClient from "@/components/Sections/AddClientModal/orderSelectClient"
import { Form } from "@/components/ui/form"
import { initialItems } from "@/lib/constants"
import {
    OrderItemsDetailsSchema,
    combinedOrderSchema,
    orderDetailSchema,
} from "@/lib/schemas"
import { type ItemsOptions, type OrderItemsDetails } from "@/lib/types"
import { last30Days } from "@/lib/utils"
import { api } from "@/trpc/react"
import { type Client } from "@prisma/client"
import { useState } from "react"
import { ZodError, type z } from "zod"
import SubmitAndCloseBtns from "../../Button/submitAndCloseModal"
import OrderPaymentForm from "../../Sections/AddClientModal/orderPayment"
import { useToast } from "../../ui/use-toast"
import CloseBtn from "../closeBtn"

// is more readable use foreach istead every
function areAllItemsEmpty(itemsDetails: OrderItemsDetails): boolean {
    let isEmpty = true
    Object.values(itemsDetails).forEach((item: ItemsOptions) => {
        if (item.show && item.items.length > 0) {
            isEmpty = false
            return
        }
    })
    return isEmpty
}

export default function AddPlanilla({ btnTitle }: { btnTitle: string }) {
    const utils = api.useUtils()
    const [selectedClient, setSelectedClient] = useState<Client | null>()
    const [includePayment, setIncludePayment] = useState(false)
    const [showSeco, setShowSeco] = useState(false)
    const [details, setDetails] = useState<OrderItemsDetails>(initialItems)

    const { toast } = useToast()
    const { mutate: addSheetWPayment } =
        api.sheets.createWithPayment.useMutation()
    const { mutate: addSheet } = api.sheets.createWithoutPayment.useMutation()
    const schema = includePayment ? combinedOrderSchema : orderDetailSchema

    const form = useForm<FieldValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            shippingCost: "$5.000",
            voucher: "",
        },
    })

    function onSubmit(values: FieldValues) {
        const emptyDetails = areAllItemsEmpty(details)
        if (emptyDetails) {
            toast({
                title: "Error",
                description: "Debes agregar al menos una prenda",
                variant: "destructive",
            })
            return
        }
        try {
            OrderItemsDetailsSchema.parse(details)
            console.log("La estructura es válida.")
        } catch (error) {
            if (error instanceof ZodError) {
                console.log("Error de validación:", error.errors)
            }
        }

        try {
            const sheetData = schema.parse(values)

            sheetData.details = "Testing this must add items order"
            if (includePayment) {
                const apiFormat = {
                    order: sheetData as z.infer<typeof combinedOrderSchema>,
                    items: details,
                }
                addSheetWPayment(apiFormat, {
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
            } else {
                const apiFormat = {
                    order: sheetData,
                    items: details,
                }
                addSheet(apiFormat, {
                    onError: (error) => {
                        toast({
                            title: "Error",
                            description: "No se pudo agregar la planilla",
                            duration: 2000,
                        })
                    },
                    onSuccess: (data) => {
                        const today = last30Days()
                        toast({
                            title: "Planilla agregada",
                            description: "Se ha agregado la planilla",
                            duration: 2000,
                        })
                        utils.sheets.rowsByDateRange
                            .invalidate({
                                from: today.from,
                                to: today.to,
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                            .finally(() => {
                                console.log("invalidate")
                            })
                    },
                    onSettled: () => {
                        cleanModal(false)
                    },
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: "No se pudo agregar la planilla",
                duration: 2000,
            })
        }
    }

    const cleanModal = (open: boolean) => {
        if (open) return
        form.reset()
        setSelectedClient(null)
    }

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
                        <OrderSelectClient
                            setValue={form.setValue}
                            control={form.control}
                            setSelectedClient={setSelectedClient}
                            selectedClient={selectedClient}
                            cleanModal={cleanModal}
                        />
                        {selectedClient && (
                            <>
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
                                        includePayment={includePayment}
                                        setIncludePayment={setIncludePayment}
                                    />
                                </div>
                                <SubmitAndCloseBtns
                                    setOpen={cleanModal}
                                    open={false}
                                />
                            </>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
