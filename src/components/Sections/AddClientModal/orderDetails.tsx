import CustomInputField from "@/components/FormFields/customInputField";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { type sheetSchema } from "@/lib/schemas";
import { type FormFieldsProps } from "@/lib/types";
import { type UseFormSetValue, type Control, type FieldValues } from "react-hook-form";
import { type z } from "zod";


interface OrderDetailsFormProps extends FormFieldsProps {
    setShowSeco: (value: boolean) => void;
    showSeco: boolean;
}

export default function OrderDetailsForm({ control, setShowSeco, showSeco }: OrderDetailsFormProps) {
    return (
        <>
            <CustomInputField control={control} formFieldName="checkin" type="calendar" label="Fecha de ingreso" placeholder="Seleccione la fecha..." />
            <CustomInputField control={control} formFieldName="checkout" type="calendar" label="Fecha de entrega" placeholder="Seleccione la fecha..." />
            <CustomInputField control={control} type="input" formFieldName="total" label="Total a pagar" placeholder="Ingrese el total..." formatAs="currency" />
            <CustomInputField control={control} type="input" formFieldName="deliveryCost" label="Costo de entrega" placeholder="Ingrese el costo..." formatAs="currency" />
            <CustomInputField control={control} type="input" formFieldName="ticket" label="N° de ticket" placeholder="Ingrese el N° de ticket..." />
            <CustomInputField control={control} type="textarea" formFieldName="detalle" label="Detalle" placeholder="Ingrese el detalle del pedido..." />
            <div className="flex items-center space-x-2">
                <Switch id="is-seco" onCheckedChange={(checked) => setShowSeco(checked)} />
                <Label htmlFor="airplane-mode">¿Va al seco?</Label>
            </div>
            {showSeco && (
                <CustomInputField control={control} type="textarea" formFieldName="secoDetails" label="Seco" placeholder="Ingrese el detalle del pedido..." />
            )}
        </>
    )
}