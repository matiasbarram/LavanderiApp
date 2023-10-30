import AddPlanilla from "@/components/Modal/addSheetModal";
import NavIcon from "@/components/Navigation/NavIcon";
import Datatable from "@/components/Table/dataTable";
import { Button } from "@/components/ui/button";
import { type sheetCols } from "@/lib/types";
import { api } from "@/trpc/server";
import { type Client, type OrderDetail, type OrderPayment } from "@prisma/client";
import { columns } from "./columns";

interface row {
    Client: Client,
    OrderData: OrderDetail,
    OrderPayment: OrderPayment
}

export default async function PlanillaPage() {

    const rows = await api.sheets.rows.query() as row[]

    const initialData: sheetCols[] = rows.map((row: row) => {
        const name: string = row.Client.fname + " " + row.Client.lname
        return {
            name: name,
            dates: { from: row.OrderData.checkin, to: row.OrderData.checkout },
            delivery: row.OrderPayment.shippingCost,
            payment: row.OrderPayment.paymentDate,
            paymentTotal: row.OrderPayment.amount,
            status: row.OrderPayment.status,
            invoice: row.OrderPayment.paymentType,
            nInvoice: row.OrderPayment.invoiceNumber,
            washingDry: row.OrderData.external
        }
    })

    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold">Planilla Octubre 2023</h1>
                    <AddPlanilla btnTitle="Agregar" />
                    <Button variant="secondary" size="sm">Exportar</Button>
                </div>
                <div className="flex items-center gap-2">
                    <NavIcon direction="left" />
                    <NavIcon direction="right" />
                </div>
            </div>
            <Datatable data={initialData} columns={columns} />
        </>
    )
}