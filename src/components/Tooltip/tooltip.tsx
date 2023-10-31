import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CustomTooltip({ children, msg }: { children: React.ReactNode, msg: string }) {
    return (
        <TooltipProvider delayDuration={400} >
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{msg}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}