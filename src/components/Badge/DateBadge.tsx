import { toLocaleDate } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { Badge } from "../ui/badge";

const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric"
};

export default function DateBadge({ date, Icon }: { date: string, Icon?: LucideIcon }) {
    return (
        <>
            <Badge variant="outline" className="border border-gray-300 w-fit">
                {Icon && <span className="mr-2"><Icon className="w-4 h-4" /></span >}
                {toLocaleDate(date)}
            </Badge >
        </>
    )
}