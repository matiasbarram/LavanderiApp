import { cleanRut } from "rutlib";
import { z } from "zod";

export const sheetSchema = z.object({
    clientName: z.string().min(2, {
        message: "El nombre no debe estar vacio.",
    }),
    checkin: z.date({
        required_error: "Seleccione la fecha de recepcion.",
    }),
    checkout: z.date({
        required_error: "Seleccione la fecha de entrega.",
    }).optional(),
    deliveryCost: z.coerce.number().min(0, {
        message: "El costo de entrega no válido.",
    }),
    paymentDate: z.date({
        required_error: "Debe seleccionar la fecha de pago.",
    }).optional(),
    status: z.string({
        required_error: "Debe seleccionar el estado del pedido.",
    }),
    invoice: z.string({
        required_error: "Debe seleccionar el tipo de facturación.",
    }),
    voucher: z.string().min(2, {
        message: "El número de factura no puede estar vacio.",
    }),
})


export const clientSchema = z.object({
    name: z.string().min(2, {
        message: "Nombre no puede estar vacio.",
    }),
    lastName: z.string().min(2, {
        message: "Apellido no puede estar vacio.",
    }),
    rut: z.string().min(2, {
        message: "Rut no puede estar vacio.",
    }).refine((value) => {
        return cleanRut(value) !== ""
    }),
    phone: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    address: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).email("Invalid email"),
    description: z.string().optional(),
})
