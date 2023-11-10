"use client"

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { type InputFieldProps } from "@/lib/types"
import { toMoney } from "@/lib/utils"
import { type ChangeEvent } from "react"
import { formatRut } from "rutlib"
import { Input } from "../ui/input"

export default function InputField({
    control,
    fieldName,
    label,
    placeholder,
    description,
    formatAs,
    readonly,
}: InputFieldProps) {
    const fieldPlaceholder = placeholder ? placeholder : label
    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            className="max-w-[240px]"
                            placeholder={fieldPlaceholder}
                            {...field}
                            readOnly={readonly}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const currentValue: string = e.target.value
                                switch (formatAs) {
                                    case "currency":
                                        if (currentValue === "$")
                                            field.onChange("")
                                        else {
                                            const formattedValue =
                                                toMoney(currentValue)
                                            field.onChange(formattedValue)
                                        }
                                        break
                                    case "rut":
                                        const formattedValue =
                                            formatRut(currentValue)
                                        field.onChange(formattedValue)
                                        break
                                    default:
                                        field.onChange(currentValue)
                                        break
                                }
                            }}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
