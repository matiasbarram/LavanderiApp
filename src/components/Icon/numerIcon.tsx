export default function NumerIcon({ number }: { number: number }) {
    return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {number}
        </div>
    )
}
