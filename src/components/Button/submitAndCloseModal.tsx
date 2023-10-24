import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";

export default function SubmitAndCloseBtns() {
    return (
        <DialogFooter>
            <div className="flex flex-col w-full gap-4">
                <Button type="submit">Crear Cliente</Button>
                <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </DialogClose>
            </div>
        </DialogFooter>
    )
}