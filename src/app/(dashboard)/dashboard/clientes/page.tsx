'use client'

import AddClientModal from '@/components/Modal/addClientModal'
import Datatable from '@/components/Table/dataTable'
import { Button } from '@/components/ui/button'
import { toClientTable } from '@/lib/utils'
import { api } from '@/trpc/react'
import { columns } from './columns'

export default function ClientesPage() {
    const useClients = api.clients.getAll.useQuery()
    const clients = useClients.data

    const initialData = clients ? toClientTable(clients) : []
    console.log('initial data: ', initialData)

    return (
        <>
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold">Clientes</h1>
                <AddClientModal />
                <Button variant="secondary" size="sm">
                    Exportar
                </Button>
            </div>
            {initialData && <Datatable columns={columns} data={initialData} />}
        </>
    )
}
