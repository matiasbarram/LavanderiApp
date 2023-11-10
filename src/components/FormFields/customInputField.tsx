import {
    type FormFieldsProps,
    type SelectorOption,
    type formSetValue,
    type formatAs,
} from "@/lib/types"
import CalendarField from "./calendar"
import InputField from "./input"
import SelectorField from "./selector"
import SwitchField from "./switch"
import TextAreaField from "./textarea"

interface CustomInputFieldProps<T> extends FormFieldsProps {
    type: "input" | "select" | "calendar" | "textarea" | "switch"
    label: string
    formFieldName: string
    placeholder: string
    description?: string
    options?: SelectorOption[]
    setValue?: (value: T) => void
    formatAs?: formatAs
    readonly?: boolean
    search?: boolean
    formSetValue?: formSetValue
    value?: T
}

export default function CustomInputField<T>({
    formSetValue,
    control,
    type,
    label,
    formFieldName,
    placeholder,
    description,
    options,
    setValue,
    formatAs,
    readonly,
    search,
    value,
}: CustomInputFieldProps<T>) {
    switch (type) {
        case "input":
            return (
                <InputField
                    control={control}
                    fieldName={formFieldName}
                    label={label}
                    placeholder={placeholder}
                    description={description}
                    formatAs={formatAs}
                    readonly={readonly}
                />
            )
        case "select":
            return (
                options && (
                    <SelectorField
                        formSetValue={formSetValue}
                        control={control}
                        options={options}
                        fieldName={formFieldName}
                        label={label}
                        placeholder={placeholder}
                        description={description}
                        setValue={setValue}
                        search={search}
                    />
                )
            )
        case "calendar":
            return (
                <CalendarField
                    control={control}
                    fieldName={formFieldName}
                    label={label}
                    description={description}
                />
            )
        case "textarea":
            return (
                <TextAreaField
                    control={control}
                    fieldName={formFieldName}
                    label={label}
                    placeholder={placeholder}
                    description={description}
                />
            )
        case "switch":
            const booleanValue = !!value

            return (
                <SwitchField
                    control={control}
                    fieldName={formFieldName}
                    label={label}
                    placeholder={placeholder}
                    value={booleanValue}
                    setValue={
                        setValue as (
                            value: boolean | string
                        ) => void | undefined
                    }
                />
            )
    }
}
