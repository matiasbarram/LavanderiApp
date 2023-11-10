"use client"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { useState } from "react"
import { type FieldProps } from "@/lib/types"
import es from "date-fns/locale/es"

export default function CalendarField({
    control,
    fieldName,
    label,
    description,
}: FieldProps) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                    >
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value &&
                                    field.value instanceof Date ? (
                                        format(field.value, "PPP", {
                                            locale: es,
                                        })
                                    ) : (
                                        <span>Seleccione una fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                locale={es}
                                selected={
                                    field.value instanceof Date
                                        ? field.value
                                        : undefined
                                }
                                onSelect={(e) => {
                                    field.onChange(e)
                                    setIsCalendarOpen(false)
                                }}
                                // disabled={(date) =>
                                //     date > new Date() || date < new Date("1900-01-01")
                                // }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
