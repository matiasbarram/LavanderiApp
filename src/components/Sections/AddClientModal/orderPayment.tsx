import CustomInputField from "@/components/FormFields/customInputField";
import { invoiceOptions, paymentMethods, statusOptions } from "@/lib/constants";
import { type FormFieldsProps } from "@/lib/types";


export default function OrderPaymentForm({ formSetValue, control }: FormFieldsProps) {
    return (
        <>
            <CustomInputField control={control} type="calendar" formFieldName="paymentDate" label="Fecha de pago" placeholder="Ingrese la fecha..." />
            <CustomInputField formSetValue={formSetValue} control={control} type="select" options={paymentMethods} formFieldName="paymentMethod" label="Forma de pago" placeholder="Seleccione la forma..." />
            <CustomInputField formSetValue={formSetValue} control={control} type="select" options={invoiceOptions} formFieldName="invoice" label="Tipo de factura" placeholder="Seleccione el tipo..." />
            <CustomInputField formSetValue={formSetValue} control={control} type="select" options={statusOptions} formFieldName="status" label="Estado" placeholder="Seleccione el estado..." />
            <CustomInputField control={control} type="input" formFieldName="voucher" label="N° de comprobante" placeholder="Ingrese el N° de comprobante..." />
            <CustomInputField control={control} type="textarea" formFieldName="paymentDetails" label="Detalles del pago" placeholder="Ingrese los detelles..." />
        </>
    )
}