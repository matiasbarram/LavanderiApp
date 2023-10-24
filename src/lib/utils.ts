import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

