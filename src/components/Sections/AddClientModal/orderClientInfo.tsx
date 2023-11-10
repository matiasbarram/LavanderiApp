import { ReadOnlyInput } from "@/components/FormFields/readOnlyInput";
import NumerIcon from "@/components/Icon/numerIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Client } from "@prisma/client";


export default function OrderClientInfo({ selectedClient }: { selectedClient: Client }) {
    return (
        <Card className="bg-secondary">
            <CardHeader>
                <div className="flex justify-start items-center gap-4">
                    <NumerIcon number={1} />
                    <CardTitle>Información del cliente</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <ReadOnlyInput label="Nombre" value={selectedClient.fname} />
                <ReadOnlyInput label="Email" value={selectedClient.email} />
                <ReadOnlyInput label="Teléfono" value={selectedClient.phone} />
                <ReadOnlyInput label="Dirección" value={selectedClient.address} />
            </CardContent>
        </Card>
    )
}