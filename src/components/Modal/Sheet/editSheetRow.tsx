import SubmitAndCloseBtns from "@/components/Button/submitAndCloseModal"
import NumerIcon from "@/components/Icon/numerIcon"
import OrderDetailsForm from "@/components/Sections/AddClientModal/orderDetails"
import OrderPaymentForm from "@/components/Sections/AddClientModal/orderPayment"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
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
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import CloseBtn from "../closeBtn"


interface EditSheetRowProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (value: boolean) => void
    row: sheetCols
}


export default function EditSheetRow({ isEditDialogOpen, setIsEditDialogOpen, row }: EditSheetRowProps) {
    const [showSeco, setShowSeco] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<string>(row.status ? row.status : PENDING_STATUS)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<FieldValues>({
        resolver: zodResolver(sheetSchema),
        defaultValues: {
            deliveryCost: row.delivery ? toMoney(row.delivery) : toMoney(0),
            voucher: row.nInvoice,
            status: row.status,
            seco: row.washingDry,
            checkin: row.dates.from,
            checkout: row.dates.to,
            total: row.paymentTotal ? toMoney(row.paymentTotal) : "",
            paymentDate: row.payment,
            invoice: row.invoice,
            ticket: row.ticket
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
            <DialogContent className={"lg:max-w-screen-lg overflow-y-auto max-h-screen"}>
                <DialogHeader>
                    <CloseBtn setOpen={setIsEditDialogOpen} open={false} />
                    <DialogTitle>Editar</DialogTitle>
                    <DialogDescription>
                        Edita los datos de la orden
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


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

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
