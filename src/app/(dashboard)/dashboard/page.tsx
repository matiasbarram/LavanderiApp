import { api } from "@/trpc/server"

export default async function DashboardPage() {
    const delivery = await api.delivery.today.query()

    return (
        <>
            <h1>Dashboard</h1>
            {delivery && delivery.length === 0 && <h2>No hay entregas</h2>}
            {delivery?.map((d) => (
                <div key={d.id}>
                    <p>{d.id}</p>
                </div>
            ))}
        </>
    )
}
