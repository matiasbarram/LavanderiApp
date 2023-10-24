import { SelectorOption } from "./types"

export const APPNAME = "Lavandería"

export const invoiceOptions: SelectorOption[] = [
    { label: "Boleta", value: "bill" },
    { label: "Factura", value: "invoice" },
]

export const statusOptions: SelectorOption[] = [
    { label: "Pagado", value: "paid" },
    { label: "Pendiente", value: "pending" },
]