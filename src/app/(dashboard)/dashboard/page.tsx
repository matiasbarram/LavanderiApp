import { toLocaleDate } from "@/lib/utils"
import { api } from "@/trpc/server"

export default async function DashboardPage() {
    const delivery = await api.delivery.today.query()

    return (
        <>
            <h1>Dashboard</h1>
            {delivery && delivery.length === 0 && <h2>No hay entregas</h2>}
            {delivery?.map((d) => (
                <div key={d.id} className="border p-4">
                    <h1>{d.Client.fname + " " + d.Client.lname}</h1>
                    <h2>{toLocaleDate(d.OrderDetail.checkout)}</h2>
                    <p>{d.Client.address}</p>
                    {/* <code>{JSON.stringify(d)}</code> */}
                </div>
            ))}
        </>
    )
}
