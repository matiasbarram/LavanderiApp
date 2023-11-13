import CustomInputField from "@/components/FormFields/customInputField"
import AddClientModal from "@/components/Modal/addClientModal"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { dbOrderStatus } from "@/lib/constants"
import { type SelectorOption } from "@/lib/types"
import { api } from "@/trpc/react"
import { type Client } from "@prisma/client"
import { useState } from "react"
import {
    type Control,
    type FieldValues,
    type UseFormSetValue,
} from "react-hook-form"

interface Props {
    setValue: UseFormSetValue<FieldValues>
    control: Control

    setSelectedClient: (value: Client | undefined) => void
    selectedClient: Client | null | undefined
    cleanModal: (value: boolean) => void
}

export default function OrderSelectClient({
    setValue,
    control,
    setSelectedClient,
    selectedClient,
    cleanModal,
}: Props) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const utils = api.useUtils()
    const clients = utils.clients.getAll.getData()

    const clientsOpts: SelectorOption[] =
        clients?.map((client) => {
            return {
                label: client.fname + " " + client.lname,
                value: client.email,
            }
        }) ?? []

    const handleSelectedUser = (client: string) => {
        setValue("status", dbOrderStatus.pending)
        const currentClient = clients?.find((clnt) => client === clnt.email)
        setSelectedClient(currentClient)
        toast({
            title: "Cliente seleccionado",
            description:
                "Se han cargado los datos de la última planilla del cliente",
            duration: 2000,
        })
    }

    return (
        <div className={"flex items-center gap-4"}>
            <CustomInputField
                formSetValue={setValue}
                control={control}
                options={clientsOpts}
                formFieldName="clientName"
                type="select"
                search={true}
                label="Cliente"
                placeholder="Seleccione el cliente..."
                setValue={handleSelectedUser}
            />
            {!selectedClient && <AddClientModal title="Nuevo cliente" />}
            {selectedClient && (
                <Button
                    variant="destructive"
                    type="button"
                    onClick={() => cleanModal(false)}
                    className="float-right"
                >
                    Limpiar
                </Button>
            )}
        </div>
    )
}
