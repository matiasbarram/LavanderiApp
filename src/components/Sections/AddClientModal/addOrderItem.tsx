import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { categoriesColors, detailQuantity } from "@/lib/constants"
import { type ClothesVariants, type ItemData } from "@/lib/types"
import { capitalize } from "@/lib/utils"
import { X } from "lucide-react"
import { useRef, useState } from "react"

interface OrderDetailsProps {
    category: string
    title: string
    placeholder: string
    items: ItemData[]
    setItems: (items: ItemData[]) => void
}

export default function AddOrderDetails({
    category,
    title,
    placeholder,
    items,
    setItems,
}: OrderDetailsProps) {
    const [quantity, setQuantity] = useState<number>(1)
    const [inputValue, setInputValue] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)
    const variant = categoriesColors[category as keyof typeof categoriesColors]

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (!inputValue) return
            setItems([
                ...items,
                {
                    name: capitalize(inputValue),
                    quantity: quantity,
                },
            ])
            setInputValue("")
            setQuantity(1)
        }
    }
    const handleQuantity = (value: string) => {
        setQuantity(parseInt(value))
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <div>
            <div className="mb-2">
                <Label>{title}</Label>
                <div className="flex items-center gap-2">
                    <Select
                        defaultValue="1"
                        onValueChange={handleQuantity}
                        value={quantity.toString()}
                    >
                        <SelectTrigger className="w-[85px]">
                            <SelectValue placeholder="Cantidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {detailQuantity.map((item, index) => (
                                    <SelectItem key={index} value={item.value}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyUp}
                        ref={inputRef}
                    />
                </div>
            </div>
            <div className="my-4 flex flex-wrap gap-1">
                {items.map((item, index) => {
                    return (
                        <Badge
                            key={index}
                            className="mr-2 cursor-pointer"
                            variant={variant as ClothesVariants}
                        >
                            <span className="p-1">
                                {item.quantity} - {item.name}
                            </span>
                            <X
                                className="ml-2"
                                size={16}
                                onClick={() =>
                                    setItems(
                                        items.filter((_, i) => i !== index)
                                    )
                                }
                            />
                        </Badge>
                    )
                })}
            </div>
        </div>
    )
}
