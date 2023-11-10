import { type LucideIcon } from 'lucide-react'
import { Badge } from '../ui/badge'

const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
}

export default function DateBadge({
    date,
    Icon,
}: {
    date: string
    Icon?: LucideIcon
}) {
    return (
        <>
            <Badge variant="outline" className="w-fit border border-gray-300">
                {Icon && (
                    <span className="mr-2">
                        <Icon className="h-4 w-4" />
                    </span>
                )}
                {date}
            </Badge>
        </>
    )
}
