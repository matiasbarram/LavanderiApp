"use client"

import Datatable from "@/components/Table/dataTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import AddClientModal from "@/components/Modal/addClientModal";

export default function ClientesPage() {

    const initialData = [
        { name: 'Juan Perez', rut: '12345678-9', phone: '123456789', address: 'Calle 123', email: 'email@gmail.com' }
    ]

    return (
        <>
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold">Clientes</h1>
                <AddClientModal btnVariant="default" />
                <Button variant="secondary" size="sm">Exportar</Button>
            </div>
            <Datatable columns={columns} data={initialData} />
        </>
    )
}