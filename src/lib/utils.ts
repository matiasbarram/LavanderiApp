import { type Client } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { formatRut } from "rutlib";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toClientTable = (clients: Client[]) => {
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

export const toLocaleDate = (date: string) => {
  const dateObj = new Date(date);
  // dont show year
  return dateObj.toLocaleDateString("es-CL", { month: "long", day: "numeric" })
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

