import {
    type Client,
    type OrderDetail,
    type OrderPayment,
} from '@prisma/client'
import {
    type Control,
    type FieldValues,
    type UseFormSetValue,
} from 'react-hook-form/dist/types'

export type sheetCols = {
    name: string
    dates: {
        from: Date
        to: Date | null
    }
    delivery: number | null
    payment: Date | null
    paymentTotal: number | null
    status: string
    invoice: string | null
    nInvoice: string | null
    washingDry: boolean
    ticket: string
}

export type clientsCols = {
    name: string
    rut: string
    phone: string
    address: string
    email: string
}

export type SelectorOption = {
    label: string
    value: string
}

interface CommonFieldProps<T> extends FormFieldsProps {
    fieldName: string
    label: string
    placeholder?: string
    description?: string
    setValue?: (value: T) => void
    readonly?: boolean
}

export interface FieldProps extends CommonFieldProps<string> {
    formSetValue?: formSetValue
}

export interface SelectFieldProps<T> extends CommonFieldProps<T> {
    options: SelectorOption[]
    search?: boolean
}

export interface InputFieldProps extends CommonFieldProps<string> {
    type?: 'number'
    formatAs?: formatAs
}

export type formatAs = 'currency' | 'rut'

export type LastSheet = {
    checkin: string
    checkout: string
    deliveryCost: number
    paymentDate: string
    status: string
    invoice: string
    voucher: string
    [key: string]: string | number
}

export type UserData = {
    name: string
    email: string
    phone: string
    address: string
}

export type ClientData = {
    name: string
    data: UserData
    lastSheet: LastSheet
}

export type formSetValue = UseFormSetValue<FieldValues>

export interface FormFieldsProps {
    number?: number
    className?: string
    control: Control<FieldValues>
    formSetValue?: formSetValue
}

export type paymentMethods = 'cash' | 'creditCard' | 'debitCard' | 'transfer'

export interface SheetRow {
    Client: Client
    OrderData: OrderDetail
    OrderPayment: OrderPayment
}

export interface PaymentOptions {
    label: string
    value: paymentMethods
}

export interface ItemData {
    name: string
    quantity: number
}

export interface ItemsOptions {
    show: boolean
    items: ItemData[]
}

export interface OrderItemsDetails {
    wash: ItemsOptions
    iron: ItemsOptions
    washAndIron: ItemsOptions
    dry: ItemsOptions
}
