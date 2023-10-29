import { type UseFormReturn, type Control, type FieldValues, type UseFormSetValue } from "react-hook-form/dist/types"
import { type clientSchema, type sheetSchema } from "./schemas"
import { type z } from "zod"

export type sheetCols = {
    name: string,
    dates: {
        from: string,
        to: string
    },
    delivery: number,
    payment: string,
    status: string,
    invoice: "invoice" | "bill"
    nInvoice: string,
    washingDry: string
}


export type clientsCols = {
    name: string,
    rut: string,
    phone: string,
    address: string,
    email: string,
}

export type SelectorOption = {
    label: string
    value: string
}

interface CommonFieldProps<T> extends FormFieldsProps {
    fieldName: T;
    label: string;
    placeholder?: string;
    description?: string;
    setValue?: (value: string) => void;
    readonly?: boolean;
}

export interface FieldProps extends CommonFieldProps<string> {
    formSetValue?: formSetValue;
}

export interface SelectFieldProps extends CommonFieldProps<string> {
    options: SelectorOption[];
    search?: boolean;
}

export interface InputFieldProps extends CommonFieldProps<string> {
    type?: "number";
    formatAs?: formatAs;
}

export type formatAs = "currency" | "rut"


export type LastSheet = {
    checkin: string;
    checkout: string;
    deliveryCost: number;
    paymentDate: string;
    status: string;
    invoice: string;
    voucher: string;
    [key: string]: string | number;
}

export type UserData = {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export type ClientData = {
    name: string;
    data: UserData;
    lastSheet: LastSheet;
}

export type formSetValue = UseFormSetValue<FieldValues>;

export interface FormFieldsProps {
    control: Control<FieldValues>;
    formSetValue?: formSetValue;
}


