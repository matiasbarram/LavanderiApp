import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function NavIcon({
    direction,
}: {
    direction: 'left' | 'right'
}) {
    const icon =
        direction === 'left' ? (
            <ChevronLeft className="h-4 w-4" />
        ) : (
            <ChevronRight className="h-4 w-4" />
        )
    return (
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
            {icon}
        </button>
    )
}
