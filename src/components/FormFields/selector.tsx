import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { NONE_RESULTS } from "@/lib/constants"
import { type SelectFieldProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

export default function SelectorField<T>({
    formSetValue,
    control,
    options,
    fieldName,
    label,
    placeholder,
    description,
    setValue,
    search,
}: SelectFieldProps<T>) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-[240px] justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? options.find(
                                              (option) =>
                                                  option.value === field.value
                                          )?.label
                                        : placeholder ??
                                          "Seleccione una opción"}

                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px] p-0">
                            <Command>
                                {search && (
                                    <CommandInput placeholder={placeholder} />
                                )}
                                <CommandEmpty>{NONE_RESULTS}</CommandEmpty>
                                <CommandGroup>
                                    {options.map((option) => (
                                        <CommandItem
                                            value={option.label}
                                            key={option.value}
                                            onSelect={() => {
                                                if (formSetValue) {
                                                    formSetValue(
                                                        fieldName,
                                                        option.value as T
                                                    )
                                                }
                                                setValue?.(option.value as T)
                                                setIsOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    option.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
