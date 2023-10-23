export type sheetCols = {
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
