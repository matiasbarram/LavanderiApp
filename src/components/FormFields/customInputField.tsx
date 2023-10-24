"use client"

import { SelectorOption, formatAs } from "@/lib/types"
import InputField from "./input"
import SelectorField from "./selector"
import CalendarField from "./calendar"
import TextAreaField from "./textarea"



interface CustomInputFieldProps {
    form: any
    type: "input" | "select" | "calendar" | "textarea"
    label: string
    formFieldName: string
    placeholder: string
    description?: string
    options?: SelectorOption[]
    setValue?: (value: any) => void
    formatAs?: formatAs
    readonly?: boolean
    search?: boolean
}

export default function CustomInputField({ form, type, label, formFieldName, placeholder, description, options, setValue, formatAs, readonly, search }: CustomInputFieldProps) {
    switch (type) {
        case "input":
            return <InputField form={form} fieldName={formFieldName} label={label} placeholder={placeholder} description={description} formatAs={formatAs} readonly={readonly} />
        case "select":
            return options && <SelectorField form={form} options={options} formFieldName={formFieldName} label={label} placeholder={placeholder} description={description} setValue={setValue} search={search} />
        case "calendar":
            return <CalendarField form={form} fieldName={formFieldName} label={label} description={description} />
        case "textarea":
            return <TextAreaField form={form} formFieldName={formFieldName} label={label} placeholder={placeholder} description={description} />
    }
}