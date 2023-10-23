import { ChevronLeft, ChevronRight } from "lucide-react"

export default function NavIcon({ direction }: { direction: 'left' | 'right' }) {
    const icon = direction === 'left' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
    return (
        <button className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
            {icon}
        </button>
    )
}