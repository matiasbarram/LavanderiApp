"use client"

import { type formSetValue, type FormFieldsProps, type SelectorOption, type formatAs } from "@/lib/types"
import InputField from "./input"
import SelectorField from "./selector"
import CalendarField from "./calendar"
import TextAreaField from "./textarea"

interface CustomInputFieldProps extends FormFieldsProps {
    type: "input" | "select" | "calendar" | "textarea"
    label: string
    formFieldName: string
    placeholder: string
    description?: string
    options?: SelectorOption[]
    setValue?: (value: string) => void
    formatAs?: formatAs
    readonly?: boolean
    search?: boolean
    formSetValue?: formSetValue
}

export default function CustomInputField({ formSetValue, control, type, label, formFieldName, placeholder, description, options, setValue, formatAs, readonly, search }: CustomInputFieldProps) {
    switch (type) {
        case "input":
            return <InputField control={control} fieldName={formFieldName} label={label} placeholder={placeholder} description={description} formatAs={formatAs} readonly={readonly} />
        case "select":
            return options && <SelectorField formSetValue={formSetValue} control={control} options={options} fieldName={formFieldName} label={label} placeholder={placeholder} description={description} setValue={setValue} search={search} />
        case "calendar":
            return <CalendarField control={control} fieldName={formFieldName} label={label} description={description} />
        case "textarea":
            return <TextAreaField control={control} fieldName={formFieldName} label={label} placeholder={placeholder} description={description} />
    }
}