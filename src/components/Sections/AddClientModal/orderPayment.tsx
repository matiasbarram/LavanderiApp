"use client"

import CustomInputField from "@/components/FormFields/customInputField"
import NumerIcon from "@/components/Icon/numerIcon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    PENDING_STATUS,
    invoiceOptions,
    paymentMethods,
    statusOptions,
} from "@/lib/constants"
import { type FormFieldsProps } from "@/lib/types"

interface Props extends FormFieldsProps {
    isPaid: string
    setIsPaid: (isPaid: string) => void
}

export default function OrderPaymentForm({
    number,
    className,
    formSetValue,
    control,
    isPaid,
    setIsPaid,
}: Props) {
    return (
        <>
            <Card className={className}>
                <CardHeader>
                    <div className="flex items-center justify-start gap-4">
                        {number && <NumerIcon number={number} />}
                        <CardTitle>Detalles de pago</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <CustomInputField
                        formFieldName="status"
                        formSetValue={formSetValue}
                        control={control}
                        type="select"
                        options={statusOptions}
                        label="Estado"
                        placeholder="Seleccione el estado..."
                        setValue={setIsPaid}
                    />
                    {isPaid != PENDING_STATUS && (
                        <>
                            <CustomInputField
                                formFieldName="paymentDate"
                                control={control}
                                type="calendar"
                                label="Fecha de pago"
                                placeholder="Ingrese la fecha..."
                            />
                            <CustomInputField
                                formFieldName="paymentMethod"
                                formSetValue={formSetValue}
                                control={control}
                                type="select"
                                options={paymentMethods}
                                label="Forma de pago"
                                placeholder="Seleccione la forma..."
                            />
                            <CustomInputField
                                formFieldName="invoice"
                                formSetValue={formSetValue}
                                control={control}
                                type="select"
                                options={invoiceOptions}
                                label="Tipo de factura"
                                placeholder="Seleccione el tipo..."
                            />
                            <CustomInputField
                                formFieldName="voucher"
                                control={control}
                                type="input"
                                label="N° de comprobante"
                                placeholder="Ingrese el N° de comprobante..."
                            />
                            <CustomInputField
                                formFieldName="paymentDetails"
                                control={control}
                                type="textarea"
                                label="Detalles del pago"
                                placeholder="Ingrese los detelles..."
                            />
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    )
}
