import { Label } from "../ui/label"

export const ReadOnlyInput = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex flex-col w-[240px]">
            <Label className="mb-2">{label}: </Label>
            <div className="pl-3 py-2 px-4 rounded-md border cursor-no-drop">
                <span className="text-sm">{value}</span>
            </div>
        </div>
    )
}