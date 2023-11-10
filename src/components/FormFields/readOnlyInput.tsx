import { Label } from '../ui/label'

export const ReadOnlyInput = ({
    label,
    value,
}: {
    label: string
    value: string
}) => {
    return (
        <div className="flex w-[240px] flex-col">
            <Label className="mb-2">{label}: </Label>
            <div className="cursor-no-drop rounded-md border px-4 py-2 pl-3">
                <span className="text-sm">{value}</span>
            </div>
        </div>
    )
}
