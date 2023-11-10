import { X } from 'lucide-react'
import { DialogClose } from '../ui/dialog'

export default function CloseBtn({
    setOpen,
    open,
}: {
    setOpen: (open: boolean) => void
    open: boolean
}) {
    return (
        <DialogClose
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            asChild
        >
            <button className="p-3" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
        </DialogClose>
    )
}
