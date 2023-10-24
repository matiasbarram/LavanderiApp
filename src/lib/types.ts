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

interface CommonFieldProps {
    form: any;
    label: string;
    placeholder?: string;
    description?: string;
    setValue?: (value: any) => void;
    readonly?: boolean;

}

export interface SelectorFieldProps extends CommonFieldProps {
    formFieldName: string;
    search?: boolean;
    options: SelectorOption[];
}

export interface InputFieldProps extends CommonFieldProps {
    fieldName: string;
    type?: "number";
    formatAs?: formatAs;
}

export interface CalendarFieldProps extends CommonFieldProps {
    fieldName: string;
}

export interface TextAreaFieldProps extends CommonFieldProps {
    formFieldName: string;
}

export type formatAs = "currency" | "rut"

