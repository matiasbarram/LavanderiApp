import AddPlanilla from "@/components/Modal/Sheet/addSheetModal";
import { Button } from "@/components/ui/button";

export default function SheetInfo({ month }: { month: string }) {
    return (
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Planilla {month}</h1>
            <AddPlanilla btnTitle="Agregar" />
            <Button variant="secondary" size="sm">Exportar</Button>
        </div>
    )
}