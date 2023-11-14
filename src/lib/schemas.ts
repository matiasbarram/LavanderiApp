import { cleanRut, validateRut } from "rutlib";
import { z } from "zod";
import { cleanNums, validatePhone } from "./utils";

export const orderDetailSchema = z.object({

    clientName: z
        .string({ required_error: "Debe ingresar el nombre del cliente." })
        .min(2, {
            message: "Debe ingresar el nombre del cliente.",
        }),
            
    checkin: z.date({
        required_error: "Seleccione la fecha de recepción.",
    }),

    checkout: z.date(),

    ticket: z.string()
        .min(2, {
            message: "Debe ingresar el ticket.",
        }),

    details: z.string().optional(),

    external: z.boolean().default(false),

    externalDetails: z.string().optional(),

    amount: z
        .string({ required_error: "Debe ingresar el monto." })
        .refine((value) => {
            const num = cleanNums(value);
            return !isNaN(num) && num >= 0;
        }, "Debe ingresar un número válido")
        .transform((value) => {
            return cleanNums(value).toString();
        }),

    shippingCost: z.string()
    .transform((value) => {
        return cleanNums(value).toString();
    }),

});

export const orderPaymentSchema = z.object({
    paymentDate: z.date(),

    paymentMethod: z.string(),

    invoiceType: z.union([
        z.literal("bill"),
        z.literal("invoice"),
    ]),

    invoiceNumber: z.string(),

    paymentDetails: z.string().optional(),

    paymentTicket: z.string()
});

export const combinedOrderSchema = orderDetailSchema.merge(orderPaymentSchema);

export const clientSchema = z.object({
    firstname: z.string().min(2, {
        message: "Debe ingresar el nombre del cliente.",
    }),

    lastname: z.string().min(2, {
        message: "Debe ingresar el apellido del cliente.",
    }),

    rut: z
        .string()
        .min(2, {
            message: "Debe ingresar el rut del cliente.",
        })
        .refine((value) => {
            const isValid = validateRut(value)
            return !isValid ? false : true
        }, "Debe ingresar un rut válido")
        .transform((value) => {
            return cleanRut(value)
        }),

    phone: z
        .string()
        .min(2, {
            message: "Debe ingresar el teléfono del cliente.",
        })
        .refine((value) => {
            return validatePhone(value)
        }, "Debe ingresar un número válido")
        .transform((value) => {
            return cleanNums(value).toString()
        }),

    address: z.string().min(2, {
        message: "Debe ingresar la dirección del cliente.",
    }),

    email: z
        .string()
        .min(2, {
            message: "Debe ingresar el email del cliente.",
        })
        .email({
            message: "Debe ingresar un email válido.",
        }),

    description: z.string().optional(),
})

const ItemDataSchema = z.object({
    name: z.string(),
    quantity: z.number(),
});
const ItemsOptionsSchema = z.object({
    show: z.boolean(),
    items: z.array(ItemDataSchema)
  });
  
export const OrderItemsDetailsSchema = z.object({
    WASH: ItemsOptionsSchema,
    IRON: ItemsOptionsSchema,
    WASH_IRON: ItemsOptionsSchema,
    DRY_CLEANING: ItemsOptionsSchema,
});



export const createOrderSchema = z.object({
    order: orderDetailSchema,
    items: OrderItemsDetailsSchema,
});

export const createOrderWithPaymentSchema = z.object({
    order: combinedOrderSchema,
    items: OrderItemsDetailsSchema,
});