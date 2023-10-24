import { TextAreaFieldProps } from "@/lib/types";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";




export default function TextAreaField({ form, formFieldName, label, placeholder, description }: TextAreaFieldProps) {
    return (
        <FormField
            control={form.control}
            name={formFieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            className="resize-none"
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}