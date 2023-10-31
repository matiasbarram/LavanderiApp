import { type Client } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { formatRut } from "rutlib";
import { twMerge } from "tailwind-merge";
import { URL_SPLITTER } from "./constants";
import { type SheetRow, type sheetCols } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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



export const ToRut = (rut: string) => {
  return formatRut(rut)
}

export function toLocaleDate(date: string | Date): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("es-CL", { month: "long", day: "numeric" });
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



export const getDatesFromRange = (range: string): { from: Date, to: Date } => {
  const [from, to] = range.split(URL_SPLITTER)
  if (!from || !to) throw new Error("Invalid range")
  const fromDate = new Date(from)
  const toDate = new Date(to)
  return { from: fromDate, to: toDate }
}


export function transformRowToSheetCols(row: SheetRow) {
  const name = `${row.Client.fname} ${row.Client.lname}`;
  return {
    name: name,
    dates: { from: row.OrderData.checkin, to: row.OrderData.checkout },
    delivery: row.OrderPayment.shippingCost,
    payment: row.OrderPayment.paymentDate,
    paymentTotal: row.OrderPayment.amount,
    paymentMethod: row.OrderPayment.paymentMethod,
    status: row.OrderPayment.status,
    invoice: row.OrderPayment.paymentType,
    nInvoice: row.OrderPayment.invoiceNumber,
    washingDry: row.OrderData.external,
  };
}

export const transformRowsToSheetCols = (rows: SheetRow[]) => rows.map(transformRowToSheetCols) as sheetCols[]

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
