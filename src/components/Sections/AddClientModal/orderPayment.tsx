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
            <CustomInputField formSetValue={formSetValue} control={control} type="select" options={statusOptions} formFieldName="status" label="Estado" placeholder="Seleccione el estado..." setValue={setIsPaid} />
            {
                isPaid != PENDING_STATUS && (
                    <>
                        <CustomInputField control={control} type="calendar" formFieldName="paymentDate" label="Fecha de pago" placeholder="Ingrese la fecha..." />
                        <CustomInputField formSetValue={formSetValue} control={control} type="select" options={paymentMethods} formFieldName="paymentMethod" label="Forma de pago" placeholder="Seleccione la forma..." />
                        <CustomInputField formSetValue={formSetValue} control={control} type="select" options={invoiceOptions} formFieldName="invoice" label="Tipo de factura" placeholder="Seleccione el tipo..." />
                        <CustomInputField control={control} type="input" formFieldName="voucher" label="N° de comprobante" placeholder="Ingrese el N° de comprobante..." />
                        <CustomInputField control={control} type="textarea" formFieldName="paymentDetails" label="Detalles del pago" placeholder="Ingrese los detelles..." />
                    </>
                )
            }

        </>
    )
}