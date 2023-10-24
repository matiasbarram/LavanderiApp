import { APPNAME } from "@/lib/constants"
import Link from "next/link"


export default function HeaderLogo() {
    return (
        <Link href="/" className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
            <span className="ml-3 text-base font-semibold">{APPNAME}</span>
        </Link>
    )
}