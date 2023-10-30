import { type FieldProps } from "@/lib/types";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";

interface SwitchFieldProps extends FieldProps {
    value: boolean;
    setValue: (value: boolean | string) => void;
}

export default function SwitchField<T>({ control, fieldName, label, placeholder, value, setValue }: SwitchFieldProps) {
    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">
                            {label}
                        </FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                            checked={value}
                            onCheckedChange={(checked) => {
                                field.onChange(checked);
                                setValue && setValue(checked);
                            }}
                        />
                    </FormControl>
                    <FormDescription>
                        {/* {placeholder} */}
                    </FormDescription>
                </FormItem>
            )}
        />

    )
}