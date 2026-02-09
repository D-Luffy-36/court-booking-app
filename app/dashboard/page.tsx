// app/dashboard/page.tsx
import { CourtList } from '@/app/features/court/components/CourtList'

export default function DashboardPage() {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold p-4">Dashboard</h1>
            <CourtList />
        </div>
    )
}