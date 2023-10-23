import Link from "next/link";

export default function LeftMenuOption({ Icon, text, href }: { Icon: any, text: string, href: string }) {
    return (
        <Link href={href} className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
            <Icon className="h-5 w-5" />
            <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
        </Link>
    )
}