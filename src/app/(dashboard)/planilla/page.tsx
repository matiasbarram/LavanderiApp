import NavIcon from "@/components/Navigation/NavIcon";
import Planilla from "@/components/Sections/Plantilla/plantilla";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PlanillaPage() {
    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold">Planilla Octubre 2023</h1>
                    <Button variant="default" size="sm">Agregar</Button>
                    <Button variant="secondary" size="sm">Exportar</Button>
                </div>
                <div className="flex items-center gap-2">
                    <NavIcon direction="left" />
                    <NavIcon direction="right" />
                </div>
            </div>
            <Input
                placeholder="Filter emails..."
                className="max-w-xs mb-4"
            />

            <Planilla />
        </>
    )
}