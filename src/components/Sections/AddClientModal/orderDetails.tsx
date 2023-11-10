import CustomInputField from '@/components/FormFields/customInputField'
import NumerIcon from '@/components/Icon/numerIcon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type FormFieldsProps } from '@/lib/types'

interface OrderDetailsFormProps extends FormFieldsProps {
    setShowSeco: (value: boolean) => void
    showSeco: boolean
}

export default function OrderDetailsForm({
    className,
    number,
    control,
    setShowSeco,
    showSeco,
}: OrderDetailsFormProps) {
    return (
        <>
            <Card className={className}>
                <CardHeader>
                    <div className="flex items-center justify-start gap-4">
                        {number && <NumerIcon number={number} />}
                        <CardTitle>Detalles de ingreso</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <CustomInputField
                        control={control}
                        formFieldName="checkin"
                        type="calendar"
                        label="Fecha de ingreso"
                        placeholder="Seleccione la fecha..."
                    />
                    <CustomInputField
                        control={control}
                        formFieldName="checkout"
                        type="calendar"
                        label="Fecha de entrega"
                        placeholder="Seleccione la fecha..."
                    />
                    <CustomInputField
                        control={control}
                        type="input"
                        formFieldName="total"
                        label="Total a pagar"
                        placeholder="Ingrese el total..."
                        formatAs="currency"
                    />
                    <CustomInputField
                        control={control}
                        type="input"
                        formFieldName="deliveryCost"
                        label="Costo de entrega"
                        placeholder="Ingrese el costo..."
                        formatAs="currency"
                    />
                    <CustomInputField
                        control={control}
                        type="input"
                        formFieldName="ticket"
                        label="N° de ticket"
                        placeholder="Ingrese el N° de ticket..."
                    />
                    <CustomInputField
                        control={control}
                        type="textarea"
                        formFieldName="detalle"
                        label="Detalle"
                        placeholder="Ingrese el detalle del pedido..."
                    />
                    <div className="flex items-center space-x-2">
                        <CustomInputField
                            control={control}
                            type="switch"
                            formFieldName="seco"
                            label="¿Va al seco?"
                            placeholder="Marque si va al seco..."
                            value={showSeco}
                            setValue={setShowSeco}
                        />
                    </div>
                    {showSeco && (
                        <CustomInputField
                            control={control}
                            type="textarea"
                            formFieldName="secoDetails"
                            label="Seco"
                            placeholder="Ingrese el detalle del pedido..."
                        />
                    )}
                </CardContent>
            </Card>
        </>
    )
}
