import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import DateBadge from "../../Badge/DateBadge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { toLocaleDate, toMoney } from "@/lib/utils";

interface sheetRow {
    name: string,
    dates: {
        from: string,
        to: string
    },
    delivery: number,
    payment: string,
    status: string,
    invoice: "invoice" | "bill"
    nInvoice: string,
    washingDry: string
}

export default function Planilla() {
    const headers = [
        { key: 'name', label: 'Nombre', className: { header: 'text-left', cell: 'text-left' } },
        { key: 'dates', label: 'Fechas' },
        { key: 'delivery', label: 'Entrega' },
        { key: 'payment', label: 'Pago' },
        { key: 'status', label: 'Estado' },
        { key: 'invoice', label: 'Factura' },
        { key: 'nInvoice', label: 'Nº Factura' },
        { key: 'washingDry', label: 'Lavado y Secado' },
    ]

    const data: sheetRow[] = [
        { name: 'Juan Perez', dates: { from: '01/01/2021', to: '01/02/2021' }, delivery: 5000, payment: '01/02/2021', status: 'Pagado', invoice: 'bill', nInvoice: '001', washingDry: '250' },
        { name: 'Rodrigo Gonzalees', dates: { from: '01/01/2021', to: '01/02/2021' }, delivery: 5000, payment: '01/02/2021', status: 'Pagado', invoice: 'bill', nInvoice: '001', washingDry: '250' },
    ]

    return (
        <>
            <Table className="rounded-md shadow-sm">
                <TableCaption>Planilla Octubre 2023</TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        {
                            headers.map((header) => (
                                <TableHead
                                    key={header.key}
                                    className={header.className?.header}
                                >
                                    {header.label}
                                </TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell className="text-left font-semibold">{row.name}</TableCell>
                            <TableCell className="w-auto">
                                <div className="flex flex-col gap-1">
                                    <DateBadge date={row.dates.from} Icon={ArrowDownLeft} />
                                    <DateBadge date={row.dates.to} Icon={ArrowUpRight} />
                                </div>
                            </TableCell>
                            <TableCell>{toMoney(row.delivery)}</TableCell>
                            <TableCell>{toLocaleDate(row.payment)}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.invoice === 'invoice' ? 'Factura' : 'Boleta'}</TableCell>
                            <TableCell>{row.nInvoice}</TableCell>
                            <TableCell>{toMoney(row.washingDry)}</TableCell>
                        </TableRow >
                    ))
                    }
                </TableBody >
            </Table >
        </>
    )
}