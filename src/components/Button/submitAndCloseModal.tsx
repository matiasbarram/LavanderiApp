import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";

export default function SubmitAndCloseBtns({ setOpen, open }: { setOpen: (open: boolean) => void, open: boolean }) {
    return (
        <DialogFooter>
            <div className="flex flex-col w-full gap-4">
                <Button type="submit">Crear Cliente</Button>
                <DialogClose
                    onClick={() => setOpen(false)}
                    asChild
                >
                    <Button variant="outline">Cancelar</Button>
                </DialogClose>
            </div>
        </DialogFooter>
    )
}