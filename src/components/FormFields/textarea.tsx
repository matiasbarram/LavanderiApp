import { type FieldProps } from "@/lib/types"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Textarea } from "../ui/textarea"

export default function TextAreaField({
    control,
    fieldName,
    label,
    placeholder,
    description,
}: FieldProps) {
    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            {...field}
                            placeholder={placeholder}
                            className="resize-none"
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
