import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { detailQuantity } from "@/lib/constants";
import { type ItemData } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { X } from "lucide-react";
import { useRef, useState } from "react";


interface OrderDetailsProps {
    title: string;
    placeholder: string;
    items: ItemData[];
    setItems: (items: ItemData[]) => void;
}


export default function AddOrderDetails({ title, placeholder, items, setItems }: OrderDetailsProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const inputRef = useRef<HTMLInputElement | null>(null);


    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputRef.current) {
                setItems([...items, { name: capitalize(inputRef.current.value), quantity: quantity }]);
                inputRef.current.value = '';
                setQuantity(1);
            }
        }
    }
    const handleQuantity = (value: string) => {
        setQuantity(parseInt(value));
        if (inputRef.current) {
            inputRef.current.focus();
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
                                {
                                    detailQuantity.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            value={item.value}
                                        >
                                            {item.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input type="text" placeholder={placeholder} onKeyDown={handleKeyUp} ref={inputRef} />

                </div>
            </div>
            <div className="flex flex-wrap gap-1 my-4">
                {
                    items.map((item, index) => (
                        <Badge key={index} className="mr-2 cursor-pointer">
                            <span className="p-1">{item.quantity} - {item.name}</span>
                            <X className="ml-2" size={16} onClick={() => setItems(items.filter((_, i) => i !== index))} />
                        </Badge>
                    ))
                }
            </div>
        </div >
    );
}
