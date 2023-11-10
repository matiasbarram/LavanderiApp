import { type LucideIcon } from "lucide-react"
import Link from "next/link"

export default function LeftMenuOption({
    Icon,
    text,
    href,
    className,
}: {
    Icon: LucideIcon
    text: string
    href: string
    className?: string
}) {
    const classes =
        "flex items-center rounded-lg px-3 py-2 text-slate-900 transition-colors duration-200 hover:text-black rounded-md py-2 px-3 flex items-center text-gray-600 hover:bg-secondary"
    const newClasses = className ? `${classes} ${className}` : classes
    return (
        <Link href={href} className={newClasses}>
            <Icon className="h-5 w-5" />
            <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
        </Link>
    )
}
