import SubmitAndCloseBtns from "@/components/Button/submitAndCloseModal"
import OrderDetailsForm from "@/components/Sections/AddClientModal/orderDetails"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { EditOrderSchema } from "@/lib/schemas"
import { type OrderItemsDetails, type sheetCols } from "@/lib/types"
import {
    getOrderItems,
    isPendingPayment,
    last30Days,
    toMoney,
} from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { type FieldValues } from "react-hook-form/dist/types"
import CloseBtn from "../closeBtn"

import OrderItemsForm from "@/components/Sections/AddClientModal/orderItems"
import OrderPaymentForm from "@/components/Sections/AddClientModal/orderPayment"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { api } from "@/trpc/react"

interface EditSheetRowProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (value: boolean) => void
    row: sheetCols
}

export default function EditSheetRow({
    isEditDialogOpen,
    setIsEditDialogOpen,
    row,
}: EditSheetRowProps) {
    const utils = api.useUtils()
    const [showSeco, setShowSeco] = useState(false)
    const { toast } = useToast()
    const today = last30Days()
    const data = utils.sheets.rowsByDateRange.getData({
        from: today.from,
        to: today.to,
    })
    const order = data?.find((r) => r.id === row.id)
    const pendingPayment = isPendingPayment(order?.OrderPayment ?? null)

    const items = getOrderItems(order?.Clothing)
    const [details, setDetails] = useState<OrderItemsDetails>(items)

    const { mutate: editOrder, isLoading } = api.sheets.editOrder.useMutation({
        onSuccess: () => {
            utils.sheets.rowsByDateRange
                .invalidate()
                .then(() => {
                    setIsEditDialogOpen(false)
                    toast({
                        title: "Orden editada",
                        description: "La orden se editó correctamente",
                    })
                })
                .catch((err) => {
                    console.log(err)
                    toast({
                        title: "Error",
                        description: "Ocurrió un error al editar la orden",
                        variant: "destructive",
                    })
                })
        },
        onError: (err) => {
            console.log(err)
            toast({
                title: "Error",
                description: "Ocurrió un error al editar la orden",
                variant: "destructive",
            })
        },
    })

    const form = useForm<FieldValues>({
        resolver: zodResolver(EditOrderSchema),
        defaultValues: {
            checkin: order?.OrderDetail.checkin,
            checkout: order?.OrderDetail.checkout,
            ticket: order?.OrderDetail.ticket,
            details: order?.OrderDetail.details,
            external: order?.OrderDetail.external,
            externalDetails: order?.OrderDetail.externalDetails ?? "",
            amount: order?.OrderDetail.orderAmount
                ? toMoney(order?.OrderDetail.orderAmount)
                : toMoney(0),
            shippingCost: order?.OrderDetail.shippingCost
                ? toMoney(order?.OrderDetail.shippingCost)
                : toMoney(0),
            // payment
            paymentDate: order?.OrderPayment?.paymentDate,
            status: order?.OrderPayment?.status,
            invoice: order?.OrderPayment?.invoiceNumber,
            voucher: order?.OrderPayment?.invoiceNumber,
            paymentMethod: order?.OrderPayment?.paymentMethod,
            paymentDetails: order?.OrderPayment?.paymentDetails ?? "",
            invoiceType: order?.OrderPayment?.invoiceType,
            invoiceNumber: order?.OrderPayment?.invoiceNumber,
            paymentTicket: order?.OrderPayment?.paymentTicket,
        },
    })

    const onSubmit = (data: FieldValues) => {
        try {
            const validData = EditOrderSchema.parse(data)
            editOrder({
                order: validData,
                orderId: row.id,
                pendingPayment: pendingPayment,
            })
        } catch (err) {
            console.log(err)
        }
    }

    const cleanModal = (open: boolean) => {
        if (open) return
        form.reset()
    }

    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent
                className={"max-h-screen overflow-y-auto lg:max-w-screen-lg"}
            >
                <DialogHeader>
                    <CloseBtn setOpen={setIsEditDialogOpen} open={false} />
                    <DialogTitle>Editar</DialogTitle>
                    <DialogDescription>
                        Edita los datos de la orden
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <Tabs defaultValue="details">
                            <TabsList
                                className={`grid w-full grid-cols-${
                                    pendingPayment ? 2 : 3
                                } gap-4`}
                            >
                                <TabsTrigger value="details">
                                    Pedido
                                </TabsTrigger>
                                <TabsTrigger value="clothes">
                                    Prendas
                                </TabsTrigger>
                                {!pendingPayment && (
                                    <TabsTrigger value="payment">
                                        Pago
                                    </TabsTrigger>
                                )}
                            </TabsList>

                            <TabsContent value="details">
                                <OrderDetailsForm
                                    number={1}
                                    formSetValue={form.setValue}
                                    control={form.control}
                                    setShowSeco={setShowSeco}
                                    showSeco={showSeco}
                                />
                            </TabsContent>
                            <TabsContent value="clothes">
                                <OrderItemsForm
                                    number={2}
                                    control={form.control}
                                    details={details}
                                    setDetails={setDetails}
                                />
                            </TabsContent>
                            {!pendingPayment && (
                                <TabsContent value="payment">
                                    <OrderPaymentForm
                                        includePayment={true}
                                        className="min-h-[400px]"
                                        number={2}
                                        formSetValue={form.setValue}
                                        control={form.control}
                                    />
                                </TabsContent>
                            )}
                            <SubmitAndCloseBtns
                                setOpen={cleanModal}
                                open={false}
                                isLoading={isLoading}
                            />
                        </Tabs>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
