"use client"

import CustomInputField from "@/components/FormFields/customInputField"
import NumerIcon from "@/components/Icon/numerIcon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { invoiceOptions, paymentMethods } from "@/lib/constants"
import { type FormFieldsProps } from "@/lib/types"
import { type Control, type UseFormSetValue } from "react-hook-form"

interface Props extends FormFieldsProps {
    includePayment: boolean
    setIncludePayment?: (includePayment: boolean) => void
}

interface FormFieldProps {
    formSetValue?: UseFormSetValue<FormFieldsProps>
    control: Control
}

function FormFields({ formSetValue, control }: FormFieldProps) {
    return (
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
                formFieldName="invoiceType"
                formSetValue={formSetValue}
                control={control}
                type="select"
                options={invoiceOptions}
                label="Tipo de factura"
                placeholder="Seleccione el tipo..."
            />
            <CustomInputField
                formFieldName="invoiceNumber"
                control={control}
                type="input"
                label="N° de comprobante"
                placeholder="Ingrese el N° de comprobante..."
            />
            <CustomInputField
                formFieldName="paymentTicket"
                control={control}
                type="input"
                label="Ticket de pago"
                placeholder="Ingrese el ticket..."
            />
            <CustomInputField
                formFieldName="paymentDetails"
                control={control}
                type="textarea"
                label="Detalles del pago"
                placeholder="Ingrese los detelles..."
            />
        </>
    )
}

export default function OrderPaymentForm({
    number,
    className,
    formSetValue,
    control,
    includePayment,
    setIncludePayment,
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
                    <div className="mb-4 flex items-center space-x-2">
                        <Switch
                            id="payment"
                            checked={includePayment}
                            onCheckedChange={setIncludePayment}
                        >
                            Incluir pago
                        </Switch>
                        <Label htmlFor="payment" className="mb-2">
                            Incluir pago
                        </Label>
                    </div>
                    {includePayment && (
                        <FormFields {...{ formSetValue, control }} />
                    )}
                </CardContent>
            </Card>
        </>
    )
}
