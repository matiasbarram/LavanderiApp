"use client"

import NumerIcon from "@/components/Icon/numerIcon"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import {
    type FormFieldsProps,
    type ItemData,
    type OrderItemsDetails,
} from "@/lib/types"
import AddOrderDetails from "./addOrderItem"

interface OrderDetailsFormProps extends FormFieldsProps {
    details: OrderItemsDetails
    setDetails: (details: OrderItemsDetails) => void
}

const toggleOptions = [
    { key: "WASH", label: "Lavado" },
    { key: "IRON", label: "Planchado" },
    { key: "WASH_IRON", label: "Lavado y planchado" },
    { key: "DRY_CLEANING", label: "Seco" },
]

const itemsOptions = [
    {
        key: "WASH",
        title: "Lavado",
        placeholder: "Ingrese los detalles del lavado...",
    },
    {
        key: "IRON",
        title: "Planchado",
        placeholder: "Ingrese los detalles del planchado...",
    },
    {
        key: "WASH_IRON",
        title: "Lavado y Planchado",
        placeholder: "Ingrese los detalles del lavado y planchado...",
    },
    {
        key: "DRY_CLEANING",
        title: "Seco",
        placeholder: "Ingrese los detalles del secado...",
    },
]

export default function OrderItemsForm({
    className,
    control,
    details,
    setDetails,
}: OrderDetailsFormProps) {
    const toggleDetails = (type: string) => {
        const types = ["WASH", "IRON", "WASH_IRON", "DRY_CLEANING"]
        if (!types.includes(type)) return
        const orderItem = type as keyof OrderItemsDetails
        setDetails({
            ...details,
            [type]: {
                show: !details[orderItem].show,
                items: details[orderItem].items,
            },
        })
    }

    const setDetailsItems = (key: string, items: ItemData[]) => {
        setDetails({
            ...details,
            [key]: {
                show: details[key as keyof OrderItemsDetails].show,
                items,
            },
        })
    }

    return (
        <>
            <Card className={className}>
                <CardHeader>
                    <div className="flex items-center justify-start gap-4">
                        <NumerIcon number={2} />
                        <CardTitle>Prendas del pedido</CardTitle>
                    </div>
                    <CardDescription>
                        Ingrese las prendas del pedido
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center justify-start space-x-2">
                        {toggleOptions.map(({ key, label }) => {
                            return (
                                <Toggle
                                    key={key}
                                    className={`bg-primary-foreground/30 px-2 py-1 text-xs data-[state=on]:bg-primary data-[state=on]:text-white`}
                                    variant="outline"
                                    defaultPressed={
                                        details[key as keyof OrderItemsDetails]
                                            .show
                                    }
                                    onClick={() => toggleDetails(key)}
                                >
                                    {label}
                                </Toggle>
                            )
                        })}
                    </div>

                    {itemsOptions.map(
                        ({ key, title, placeholder }) =>
                            details[key as keyof OrderItemsDetails].show && (
                                <AddOrderDetails
                                    key={key}
                                    title={title}
                                    placeholder={placeholder}
                                    items={
                                        details[key as keyof OrderItemsDetails]
                                            .items
                                    }
                                    setItems={(items) =>
                                        setDetailsItems(key, items)
                                    }
                                />
                            )
                    )}
                </CardContent>
            </Card>
        </>
    )
}
