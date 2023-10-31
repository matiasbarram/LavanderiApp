import { type PaymentOptions, type SelectorOption } from "./types"

export const APPNAME = "Lavandería"
export const PENDING_STATUS = "pending"
export const PICK_A_DATE = "Selecciona una fecha"
export const DATE_FORMAT = "dd LLL y"
export const URL_DATE_FORMAT = "yyyy/MM/dd"
export const URL_SPLITTER = "-"

export const months: Record<number, string> =
{
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
}

export const invoiceOptions: SelectorOption[] = [
    { label: "Boleta", value: "bill" },
    { label: "Factura", value: "invoice" },
]


export const PAID_VALUE = "paid"
export const PENDING_VALUE = "pending"
export const PAID_LABEL = "Pagado"
export const PENDING_LABEL = "Pendiente"

export const statusOptions: SelectorOption[] = [
    { label: PAID_LABEL, value: PAID_VALUE },
    { label: PENDING_LABEL, value: PENDING_VALUE },
]


export const statusVariant: SelectorOption[] = [
    { label: PAID_LABEL, value: PAID_VALUE },
    { label: PENDING_LABEL, value: PENDING_VALUE },
]

export const paymentMethods: PaymentOptions[] = [
    { label: "Efectivo", value: "cash" },
    { label: "Tarjeta de Crédito", value: "creditCard" },
    { label: "Tarjeta de Débito", value: "debitCard" },
    { label: "Transferencia", value: "transfer" },
]