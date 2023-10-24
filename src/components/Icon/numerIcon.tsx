export default function NumerIcon({ number }: { number: number }) {
    return (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
            {number}
        </div>
    )

}