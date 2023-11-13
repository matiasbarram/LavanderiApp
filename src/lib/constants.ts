import { type OrderItemsDetails, type PaymentOptions, type SelectorOption } from "./types"

export const APPNAME = "Lavandería"
export const PICK_A_DATE = "Selecciona una fecha"
export const DATE_FORMAT = "dd LLL y"
export const URL_DATE_FORMAT = "yyyy/MM/dd"
export const URL_SPLITTER = "-"
export const LAST_30_DAYS = "Últimos 30 días"

export const dbOrderStatus = {
    pending: "pending",
    paid: "paid",
} as const

export const detailQuantity = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5", value: "5" },
    { name: "6", value: "6" },
    { name: "7", value: "7" },
    { name: "8", value: "8" },
    { name: "9", value: "9" },
    { name: "10", value: "10" },
] as const

export const months: Record<number, string> = {
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

export const NEGATIVE_BOOLEAN = "false"
export const POSITIVE_BOOLEAN = "true"
export const booleanOptions: SelectorOption[] = [
    { label: "Sí", value: POSITIVE_BOOLEAN },
    { label: "No", value: NEGATIVE_BOOLEAN },
]

export const PAID_VALUE = "paid"
export const PENDING_VALUE = "pending"
export const PAID_LABEL = "Pagado"
export const PENDING_LABEL = "Pendiente"
export const NONE_RESULTS = "No hay resultados"
export const CLEAR_FILTERS = "Limpiar filtros"
export const RESET_FILTERS = "Reiniciar filtros"

export const statusOptions: SelectorOption[] = [
    { label: PENDING_LABEL, value: PENDING_VALUE },
    { label: PAID_LABEL, value: PAID_VALUE },
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


export const initialItems = {
    wash: {
        show: true,
        items: [],
    },
    iron: {
        show: false,
        items: [],
    },
    washAndIron: {
        show: false,
        items: [],
    },
    dry: {
        show: false,
        items: [],
    },
} as OrderItemsDetails