import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type sheetCols } from "@/lib/types"
import CloseBtn from "../closeBtn"

interface EditSheetRowProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (value: boolean) => void
    row: sheetCols
}


export default function EditSheetRow({ isEditDialogOpen, setIsEditDialogOpen, row }: EditSheetRowProps) {
    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className={"lg:max-w-screen-lg overflow-y-auto max-h-screen"}>
                <DialogHeader>
                    <CloseBtn setOpen={setIsEditDialogOpen} open={false} />
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youu&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                {JSON.stringify(row)}
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
