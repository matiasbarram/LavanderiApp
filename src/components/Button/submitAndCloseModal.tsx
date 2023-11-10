import { Button } from '../ui/button'
import { DialogClose, DialogFooter } from '../ui/dialog'

interface Props {
    setOpen: (open: boolean) => void
    open: boolean
    isLoading?: boolean
}

export default function SubmitAndCloseBtns({
    setOpen,
    open,
    isLoading,
}: Props) {
    return (
        <DialogFooter>
            <div className="flex w-full flex-col gap-4">
                <Button type="submit">
                    {isLoading ? 'Cargando...' : 'Guardar'}
                </Button>
                <DialogClose onClick={() => setOpen(false)} asChild>
                    <Button variant="outline">Cancelar</Button>
                </DialogClose>
            </div>
        </DialogFooter>
    )
}
