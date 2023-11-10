"use client"

import NumerIcon from "@/components/Icon/numerIcon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { type FormFieldsProps, type OrderItemsDetails } from "@/lib/types";
import AddOrderDetails from "./addOrderItem";





interface OrderDetailsFormProps extends FormFieldsProps {
    details: OrderItemsDetails
    setDetails: (details: OrderItemsDetails) => void;
}

export default function OrderItemsForm({ className, control, details, setDetails }: OrderDetailsFormProps) {

    const toggleDetails = (type: string) => {
        const types = ["wash", "iron", "washAndIron", "dry"]
        if (!types.includes(type)) return
        const orderItem = type as keyof OrderItemsDetails
        setDetails({ ...details, [type]: { show: !details[orderItem].show, items: details[orderItem].items } })
    }
    return (
        <>
            <Card className={className}>
                <CardHeader>
                    <div className="flex justify-start items-center gap-4">
                        <NumerIcon number={2} />
                        <CardTitle>Prendas del pedido</CardTitle>
                    </div>
                    <CardDescription>Ingrese las prendas del pedido</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 justify-start mb-4">
                        <Toggle className="py-1 px-2 text-xs bg-primary-foreground/30 data-[state=on]:bg-primary data-[state=on]:text-white" variant="outline" defaultPressed={details.wash.show} onClick={() => toggleDetails("wash")}>Lavado</Toggle>
                        <Toggle className="py-1 px-2 text-xs bg-primary-foreground/30 data-[state=on]:bg-primary data-[state=on]:text-white" variant="outline" defaultPressed={details.iron.show} onClick={() => toggleDetails("iron")}>Planchado</Toggle>
                        <Toggle className="py-1 px-2 text-xs bg-primary-foreground/30 data-[state=on]:bg-primary data-[state=on]:text-white" variant="outline" defaultPressed={details.washAndIron.show} onClick={() => toggleDetails("washAndIron")}>Lavado y planchado</Toggle>
                        <Toggle className="py-1 px-2 text-xs bg-primary-foreground/30 data-[state=on]:bg-primary data-[state=on]:text-white" variant="outline" defaultPressed={details.dry.show} onClick={() => toggleDetails("dry")}>Seco</Toggle>
                    </div>

                    {details.wash.show &&
                        <AddOrderDetails title="Lavado" placeholder="Ingrese los detalles del lavado..." items={details.wash.items} setItems={(items) => setDetails({ ...details, wash: { show: details.wash.show, items } })} />
                    }
                    {details.iron.show &&
                        <AddOrderDetails title="Planchado" placeholder="Ingrese los detalles del planchado..." items={details.iron.items} setItems={(items) => setDetails({ ...details, iron: { show: details.iron.show, items } })} />
                    }
                    {details.washAndIron.show &&
                        <AddOrderDetails title="Lavado y Planchado" placeholder="Ingrese los detalles del lavado y planchado..." items={details.washAndIron.items} setItems={(items) => setDetails({ ...details, washAndIron: { show: details.washAndIron.show, items } })} />
                    }
                    {details.dry.show &&
                        <AddOrderDetails title="Seco" placeholder="Ingrese los detalles del secado..." items={details.dry.items} setItems={(items) => setDetails({ ...details, dry: { show: details.dry.show, items } })} />
                    }
                </CardContent>
            </Card>
        </>
    );
}