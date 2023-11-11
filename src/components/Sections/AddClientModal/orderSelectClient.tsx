import CustomInputField from "@/components/FormFields/customInputField"
import AddClientModal from "@/components/Modal/addClientModal"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { PENDING_STATUS } from "@/lib/constants"
import { type SelectorOption } from "@/lib/types"
import { api } from "@/trpc/react"
import { type Client } from "@prisma/client"
import {
    type Control,
    type FieldValues,
    type UseFormSetValue,
} from "react-hook-form"

interface Props {
    setValue: UseFormSetValue<FieldValues>
    control: Control

    setPaymentStatus: (value: string) => void
    setSelectedClient: (value: Client | undefined) => void
    selectedClient: Client | null | undefined
    cleanModal: (value: boolean) => void
}

export default function OrderSelectClient({
    setValue,
    control,
    setPaymentStatus,
    setSelectedClient,
    selectedClient,
    cleanModal,
}: Props) {
    const utils = api.useUtils()
    const { toast } = useToast()

    const allClients = utils.clients.getAll.getData() ?? []
    const clients: SelectorOption[] = allClients.map((client) => {
        return {
            label: client.fname + " " + client.lname,
            value: client.email,
        }
    })
    const handleSelectedUser = (client: string) => {
        setPaymentStatus(PENDING_STATUS)
        setValue("status", PENDING_STATUS)
        const currentClient = allClients.find((clnt) => client === clnt.email)
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
                options={clients}
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
