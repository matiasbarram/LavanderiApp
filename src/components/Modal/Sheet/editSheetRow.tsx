import SubmitAndCloseBtns from "@/components/Button/submitAndCloseModal"
import OrderDetailsForm from "@/components/Sections/AddClientModal/orderDetails"
import OrderPaymentForm from "@/components/Sections/AddClientModal/orderPayment"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { PENDING_STATUS } from "@/lib/constants"
import { sheetSchema } from "@/lib/schemas"
import { type sheetCols } from "@/lib/types"
import { toMoney } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { type FieldValues } from "react-hook-form/dist/types"
import CloseBtn from "../closeBtn"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    const [showSeco, setShowSeco] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<string>(
        row.status ? row.status : PENDING_STATUS
    )
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<FieldValues>({
        resolver: zodResolver(sheetSchema),
        defaultValues: {
            deliveryCost: row.delivery ? toMoney(row.delivery) : toMoney(0),
            voucher: row.nInvoice ?? "",
            status: row.status ?? "",
            seco: row.washingDry ?? "",
            checkin: row.dates.from,
            checkout: row.dates.to,
            paymentDate: row.payment,
            invoice: row.invoice ?? "",
            ticket: row.ticket ?? "",
            total: row.paymentTotal ? toMoney(row.paymentTotal) : "",
            // paymentMethod
            // secoDetails
            // paymentDetails
        },
    })

    const onSubmit = (data: FieldValues) => {
        console.log(data)
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
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="details">
                                    Pedido
                                </TabsTrigger>
                                <TabsTrigger value="payment">Pago</TabsTrigger>
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
                            <TabsContent value="payment">
                                <OrderPaymentForm
                                    className="min-h-[400px]"
                                    number={2}
                                    formSetValue={form.setValue}
                                    control={form.control}
                                    isPaid={paymentStatus}
                                    setIsPaid={setPaymentStatus}
                                />
                            </TabsContent>
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
