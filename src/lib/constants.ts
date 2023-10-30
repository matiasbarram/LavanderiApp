import { type ClientData, type paymentMethods as IPaymentMethods, type SelectorOption } from "./types"

export const APPNAME = "Lavandería"

export const PENDING_STATUS = "pending"

export const invoiceOptions: SelectorOption[] = [
    { label: "Boleta", value: "bill" },
    { label: "Factura", value: "invoice" },
]

export const statusOptions: SelectorOption[] = [
    { label: "Pagado", value: "paid" },
    { label: "Pendiente", value: "pending" },
]

export const clientsData = [
    {
        name: "juanperez@gmail.com",
        data: {
            name: "Juan Perez",
            email: "juanperez@gmail.com",
            phone: "123456789",
            address: "Test dirección",
        },
        lastSheet: {
            checkin: "2021-09-01",
            checkout: "2021-09-15",
            deliveryCost: 5000,
            paymentDate: "2021-09-15",
            status: "pending",
            invoice: "bill",
            voucher: "123456",
        }
    },
    {
        "name": "rodrigogonzales@gmail.com",
        data: {
            name: "Rodrigo Gonzalez",
            email: "rodrigogonzales@gmail.com",
            phone: "987654321",
            address: "Test dirección",
        },
        lastSheet: {
            checkin: "2022-10-01",
            checkout: "2022-12-15",
            deliveryCost: 2500,
            paymentDate: "2023-09-15",
            status: "pending",
            invoice: "bill",
            voucher: "654321",
        }
    }
] as ClientData[]


interface PaymentOptions {
    label: string;
    value: IPaymentMethods
}

export const paymentMethods: PaymentOptions[] = [
    { label: "Efectivo", value: "cash" },
    { label: "Tarjeta de Crédito", value: "creditCard" },
    { label: "Tarjeta de Débito", value: "debitCard" },
    { label: "Transferencia", value: "transfer" },
]