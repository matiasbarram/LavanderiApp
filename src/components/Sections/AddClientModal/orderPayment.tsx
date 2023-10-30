"use client"

import CustomInputField from "@/components/FormFields/customInputField";
import { PENDING_STATUS, invoiceOptions, paymentMethods, statusOptions } from "@/lib/constants";
import { type FormFieldsProps } from "@/lib/types";

interface Props extends FormFieldsProps {
    isPaid: string;
    setIsPaid: (isPaid: string) => void;
}



export default function OrderPaymentForm({ formSetValue, control, isPaid, setIsPaid }: Props) {
    return (
        <>
            <CustomInputField formFieldName="status" formSetValue={formSetValue} control={control} type="select" options={statusOptions} label="Estado" placeholder="Seleccione el estado..." setValue={setIsPaid} />
            {
                isPaid != PENDING_STATUS && (
                    <>
                        <CustomInputField formFieldName="paymentDate" control={control} type="calendar" label="Fecha de pago" placeholder="Ingrese la fecha..." />
                        <CustomInputField formFieldName="paymentMethod" formSetValue={formSetValue} control={control} type="select" options={paymentMethods} label="Forma de pago" placeholder="Seleccione la forma..." />
                        <CustomInputField formFieldName="invoice" formSetValue={formSetValue} control={control} type="select" options={invoiceOptions} label="Tipo de factura" placeholder="Seleccione el tipo..." />
                        <CustomInputField formFieldName="voucher" control={control} type="input" label="N° de comprobante" placeholder="Ingrese el N° de comprobante..." />
                        <CustomInputField formFieldName="paymentDetails" control={control} type="textarea" label="Detalles del pago" placeholder="Ingrese los detelles..." />
                    </>
                )
            }

        </>
    )
}