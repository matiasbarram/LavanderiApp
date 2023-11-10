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
    { key: "wash", label: "Lavado" },
    { key: "iron", label: "Planchado" },
    { key: "washAndIron", label: "Lavado y planchado" },
    { key: "dry", label: "Seco" },
]

const itemsOptions = [
    {
        key: "wash",
        title: "Lavado",
        placeholder: "Ingrese los detalles del lavado...",
    },
    {
        key: "iron",
        title: "Planchado",
        placeholder: "Ingrese los detalles del planchado...",
    },
    {
        key: "washAndIron",
        title: "Lavado y Planchado",
        placeholder: "Ingrese los detalles del lavado y planchado...",
    },
    {
        key: "dry",
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
        const types = ["wash", "iron", "washAndIron", "dry"]
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
                        {toggleOptions.map(({ key, label }) => (
                            <Toggle
                                key={key}
                                className={`bg-primary-foreground/30 px-2 py-1 text-xs data-[state=on]:bg-primary data-[state=on]:text-white`}
                                variant="outline"
                                defaultPressed={
                                    details[key as keyof OrderItemsDetails].show
                                }
                                onClick={() => toggleDetails(key)}
                            >
                                {label}
                            </Toggle>
                        ))}
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
