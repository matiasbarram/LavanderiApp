import { type Client } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { formatRut } from "rutlib"
import { twMerge } from "tailwind-merge"
import { LAST_30_DAYS, URL_SPLITTER, dbOrderStatus } from "./constants"
import { type SheetRow, type sheetCols } from "./types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

export const toClientList = (clients: Client[]) => {
    return clients.map((client) => {
        return {
            id: client.id,
            name: client.fname + " " + client.lname,
            rut: client.rut,
            phone: client.phone,
            email: client.email,
            address: client.address,
        }
    })
}

type action = "add" | "substract"
interface modifyDatesProps {
    date: Date
    days: number
    action: action
}
export const modifyDates = ({ date, days, action }: modifyDatesProps) => {
    const newDate = new Date(date)
    if (action === "add") newDate.setDate(newDate.getDate() + days)
    if (action === "substract") newDate.setDate(newDate.getDate() - days)
    return newDate
}

const setNullTime = (date: Date) => {
    date.setHours(0, 0, 0, 0)
    return date
}

export const last30Days = () => {
    const today = setNullTime(new Date())
    const thirtyDaysAgo = setNullTime(modifyDates({
        date: today,
        days: 30,
        action: "substract",
    }))
    const dateInWords: string = LAST_30_DAYS
    return { from: thirtyDaysAgo, to: today, title: dateInWords }
}

export const toRut = (rut: string) => {
    return formatRut(rut)
}

export function toLocaleDate(date: string | Date): string {
    const dateObj = new Date(date)
    const dateInWords = dateObj.toLocaleDateString("es-CL", {
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    })
    return dateInWords.charAt(0).toUpperCase() + dateInWords.slice(1)
}

export function firstAndLastDayOfMonth(date: Date): {
    firstDay: Date
    lastDay: Date
} {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return { firstDay, lastDay }
}

export const rangeUrlFormat = ({
    range,
    defaultMonth,
}: {
    range: string
    defaultMonth: string
}) => {
    const [from, to] = range.split(URL_SPLITTER)
    if (!from || !to) return defaultMonth

    const fromFormated = from ? toLocaleDate(from) : ""
    const toFormated = to ? toLocaleDate(to) : ""

    return `${fromFormated} - ${toFormated}`
}

export const cleanNums = (value: string) => Number(value.replace(/[^0-9]/g, ""))

export const toMoney = (value: number | string) => {
    if (typeof value === "number") value = value.toString()

    value = cleanNums(value)
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(value)
}

export const getDatesFromRange = (range: string): { from: Date; to: Date } => {
    const [from, to] = range.split(URL_SPLITTER)
    if (!from || !to) throw new Error("Invalid range")
    const fromDate = new Date(from)
    const toDate = new Date(to)
    return { from: fromDate, to: toDate }
}

export function transformRowToSheetCols(row: SheetRow) {
    const { Client, OrderDetail, OrderPayment } = row;
    const name = `${Client.fname} ${Client.lname}`;
    if (!OrderPayment) {
        return {
            id: row.id,
            name,
            checkin: OrderDetail.checkin,
            checkout: OrderDetail.checkout,
            paymentTotal: OrderDetail.orderAmount,
            delivery: OrderDetail.shippingCost,
            payment: null,
            paymentMethod: null,
            status: dbOrderStatus.pending,
            invoice: null,
            nInvoice: null,
            washingDry: OrderDetail.external,
            ticket: OrderDetail.ticket,
            secoDetails: OrderDetail.externalDetails,
            paymentDetails: null,
        };
    }
    return {
        id: row.id,
        name,
        checkin: OrderDetail.checkin,
        checkout: OrderDetail.checkout,
        paymentTotal: OrderDetail.orderAmount,
        delivery: OrderDetail.shippingCost,
        payment: OrderPayment.paymentDate,
        paymentMethod: OrderPayment.paymentMethod,
        status: OrderPayment.status,
        invoice: OrderPayment.invoiceType,
        nInvoice: OrderPayment.invoiceNumber,
        washingDry: OrderDetail.external,
        ticket: OrderDetail.ticket,
        secoDetails: OrderDetail.externalDetails,
        paymentDetails: OrderPayment.paymentDetails,
    };
}

export const transformRowsToSheetCols = (rows: SheetRow[]) =>
    rows.map(transformRowToSheetCols) as sheetCols[]

export const toClientTable = (clients: Client[]) => {
    return clients.map((client) => {
        return {
            name: client.fname + " " + client.lname,
            rut: client.rut,
            phone: client.phone,
            email: client.email,
            address: client.address,
        }
    })
}

export const formatPhone = (phone: string) => {
    // phone number format is +569 1234 5678
    const phoneCode = "+569"
    const splited = phone.split(phoneCode)
    if (splited.length === 1) {
        return phoneCode
    }
    else{
        phone = phone.replace(/[^0-9+]/g, "")
        if (phone.length > 12) {
            return phone.slice(0, 12)
        }
        return phone
    }
}

export const validatePhone = (phone: string) => {
    const regex = /(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}/
    return regex.test(phone)
}

