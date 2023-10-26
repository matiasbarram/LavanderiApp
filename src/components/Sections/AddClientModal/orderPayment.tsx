import CustomInputField from "@/components/FormFields/customInputField";
import { invoiceOptions, paymentMethods, statusOptions } from "@/lib/constants";


interface OrderPaymentFormProps {
    form: any
}

export default function OrderPaymentForm({ form }: OrderPaymentFormProps) {
    return (
        <>
            <CustomInputField form={form} type="input" formFieldName="total" label="Total pagado" placeholder="Ingrese el total..." formatAs="currency" />
            <CustomInputField form={form} type="input" formFieldName="deliveryCost" label="Costo de entrega" placeholder="Ingrese el costo..." formatAs="currency" />
            <CustomInputField form={form} type="calendar" formFieldName="paymentDate" label="Fecha de pago" placeholder="Ingrese la fecha..." />
            <CustomInputField form={form} type="select" options={paymentMethods} formFieldName="paymentMethod" label="Forma de pago" placeholder="Seleccione la forma..." />
            <CustomInputField form={form} type="select" options={invoiceOptions} formFieldName="invoice" label="Tipo de factura" placeholder="Seleccione el tipo..." />
            <CustomInputField form={form} type="select" options={statusOptions} formFieldName="status" label="Estado" placeholder="Seleccione el estado..." />
            <CustomInputField form={form} type="input" formFieldName="voucher" label="N° de comprobante" placeholder="Ingrese el N° de comprobante..." />
            <CustomInputField form={form} type="textarea" formFieldName="observations" label="Detalles del pago" placeholder="Ingrese los detelles..." />
        </>
    )
}