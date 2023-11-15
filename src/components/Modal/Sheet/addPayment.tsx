"use client"

import OrderPaymentForm from "@/components/Sections/AddClientModal/orderPayment"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { orderPaymentSchema } from "@/lib/schemas"
import { type sheetCols } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldValues } from "react-hook-form"

import SubmitAndCloseBtns from "@/components/Button/submitAndCloseModal"
import { useToast } from "@/components/ui/use-toast"
import { api } from "@/trpc/react"
import CloseBtn from "../closeBtn"

interface AddPaymentProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (value: boolean) => void
    row: sheetCols
}

export default function AddPayment({
    isEditDialogOpen,
    setIsEditDialogOpen,
    row,
}: AddPaymentProps) {
    const { toast } = useToast()
    const utils = api.useUtils()
    const form = useForm<FieldValues>({
        resolver: zodResolver(orderPaymentSchema),
    })

    const { mutate: addPayment, isLoading } = api.sheets.addPayment.useMutation(
        {
            onSuccess: () => {
                toast({
                    title: "Pago agregado",
                    description: "El pago fue agregado con éxito",
                })
                utils.sheets.rowsByDateRange
                    .invalidate()
                    .catch(() => console.log("error"))
            },
        }
    )

    const orderId = row.id

    const onSubmit = (data: FieldValues) => {
        try {
            const payment = orderPaymentSchema.parse(data)
            addPayment({
                orderId,
                payment,
            })
            setIsEditDialogOpen(false)
        } catch {
            console.log("error")
        }
    }
    return (
        <>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent
                    className={
                        "max-h-screen overflow-y-auto lg:max-w-screen-lg"
                    }
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
                            <div className="grid grid-cols-1 gap-6">
                                <OrderPaymentForm
                                    className="col-span-1"
                                    number={1}
                                    formSetValue={form.setValue}
                                    control={form.control}
                                    includePayment={true}
                                />
                            </div>
                            <SubmitAndCloseBtns
                                open={isEditDialogOpen}
                                setOpen={setIsEditDialogOpen}
                            />
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}
