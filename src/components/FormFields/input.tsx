"use client"

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { InputFieldProps } from "@/lib/types"
import { toMoney } from "@/lib/utils"
import { formatRut } from 'rutlib';

export default function InputField({ form, fieldName, label, placeholder, description, formatAs }: InputFieldProps) {
    const fieldPlaceholder = placeholder ? placeholder : label
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            className="max-w-[240px]"
                            placeholder={fieldPlaceholder}
                            {...field}
                            onChange={(e: any) => {
                                let currentValue = e.target.value
                                switch (formatAs) {
                                    case ("currency"):
                                        if (currentValue === "$") field.onChange("")
                                        else {
                                            const formattedValue = toMoney(currentValue)
                                            field.onChange(formattedValue)
                                        }
                                        break;
                                    case ("rut"):
                                        const formattedValue = formatRut(currentValue)
                                        field.onChange(formattedValue)
                                        break;
                                    default:
                                        field.onChange(currentValue)
                                        break;
                                }
                            }}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}