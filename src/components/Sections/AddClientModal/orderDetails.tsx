import CustomInputField from "@/components/FormFields/customInputField";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface OrderDetailsFormProps {
    form: any;
    setShowSeco: (value: boolean) => void;
    showSeco: boolean;
}

export default function OrderDetailsForm({ form, setShowSeco, showSeco }: OrderDetailsFormProps) {
    return (
        <>
            <CustomInputField form={form} formFieldName="checkin" type="calendar" label="Fecha de ingreso" placeholder="Seleccione la fecha..." />
            <CustomInputField form={form} formFieldName="checkout" type="calendar" label="Fecha de entrega" placeholder="Seleccione la fecha..." />
            <CustomInputField form={form} type="input" formFieldName="ticket" label="N° de ticket" placeholder="Ingrese el N° de ticket..." />
            <CustomInputField form={form} type="textarea" formFieldName="detalle" label="Detalle" placeholder="Ingrese el detalle del pedido..." />
            <div className="flex items-center space-x-2">
                <Switch id="is-seco" onCheckedChange={(checked) => setShowSeco(checked)} />
                <Label htmlFor="airplane-mode">¿Va al seco?</Label>
            </div>
            {showSeco && (
                <CustomInputField form={form} type="textarea" formFieldName="seco" label="Seco" placeholder="Ingrese el detalle del pedido..." />
            )}
        </>
    )
}