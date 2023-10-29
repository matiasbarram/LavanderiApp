import AddPlanilla from "@/components/Modal/addSheetModal";
import NavIcon from "@/components/Navigation/NavIcon";
import Datatable from "@/components/Table/dataTable";
import { Button } from "@/components/ui/button";
import { type sheetCols } from "@/lib/types";
import { columns } from "./columns";

export default function PlanillaPage() {

    const initialData: sheetCols[] = [
        { name: 'Juan Perez', dates: { from: '01/01/2021', to: '01/02/2021' }, delivery: 5000, payment: '01/02/2021', status: 'paid', invoice: 'bill', nInvoice: '001', washingDry: '250' },
        { name: 'Rodrigo Gonzalees', dates: { from: '01/01/2021', to: '02/04/2021' }, delivery: 5000, payment: '01/13/2021', status: 'pending', invoice: 'invoice', nInvoice: '321', washingDry: '600' },
    ]

    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold">Planilla Octubre 2023</h1>
                    <AddPlanilla btnTitle="Agregar" />
                    <Button variant="secondary" size="sm">Exportar</Button>
                </div>
                <div className="flex items-center gap-2">
                    <NavIcon direction="left" />
                    <NavIcon direction="right" />
                </div>
            </div>
            <Datatable data={initialData} columns={columns} />
        </>
    )
}