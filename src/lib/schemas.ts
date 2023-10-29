import { cleanRut, validateRut } from "rutlib";
import { z } from "zod";
import { cleanNums } from "./utils";

export const sheetSchema = z.object({
    clientName: z.string({ required_error: "Debe ingresar el nombre del cliente." }).min(2, {
        message: "Debe ingresar el nombre del cliente.",
    }),

    checkin: z.date({
        required_error: "Seleccione la fecha de recepcion.",
    }),

    checkout: z.date({
        required_error: "Seleccione la fecha de entrega.",
    }).optional(),

    deliveryCost: z.string({ required_error: "Debe ingresar el costo de envío." }).refine((value) => {
        const num = cleanNums(value)
        return !isNaN(num) && num >= 0
    }, "Debe ingresar un número válido")
        .transform((value) => {
            return cleanNums(value).toString()
        }),

    paymentDate: z.date({
        required_error: "Debe seleccionar la fecha de pago.",
    }).optional(),

    total: z.string({ required_error: "Debe ingresar el total." }).refine((value) => {
        const num = cleanNums(value)
        return !isNaN(num) && num >= 0
    }, "Debe ingresar un número válido")
        .transform((value) => {
            return cleanNums(value).toString()
        }),

    paymentMethod: z.string({
        required_error: "Debe seleccionar el método de pago.",
    }).min(2, {
        message: "Debe seleccionar el método de pago.",
    }).optional(),

    status: z.string({
        required_error: "Debe seleccionar el estado del pedido.",
    }),

    invoice: z.string({
        required_error: "Debe seleccionar el tipo de facturación.",
    }).optional(),

    voucher: z.string().optional(),

    details: z.string().optional(),

    ticket: z.string(),

    secoDetails: z.string().optional(),

    paymentDetails: z.string().optional(),
})


export const clientSchema = z.object({
    firstname: z.string().min(2, {
        message: "Debe ingresar el nombre del cliente.",
    }),

    lastname: z.string().min(2, {
        message: "Debe ingresar el apellido del cliente.",
    }),

    rut: z.string().min(2, {
        message: "Debe ingresar el rut del cliente.",
    }).refine((value) => {
        const isValid = validateRut(value)
        return !isValid ? false : true
    }, "Debe ingresar un rut válido")
        .transform((value) => {
            return cleanRut(value)
        }),

    phone: z.string()
        .min(2, {
            message: "Debe ingresar el teléfono del cliente.",
        })
        .refine((value) => {
            const num = cleanNums(value)
            return !isNaN(num) && num >= 0
        }, "Debe ingresar un número válido")
        .transform((value) => {
            return cleanNums(value).toString()
        }),

    address: z.string().min(2, {
        message: "Debe ingresar la dirección del cliente.",
    }),

    email: z.string().min(2, {
        message: "Debe ingresar el email del cliente.",
    }).email({
        message: "Debe ingresar un email válido.",
    }),

    description: z.string().optional(),
})