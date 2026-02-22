// app/dashboard/courts/page.tsx
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { CourtList } from "@/features/court/components/CourtList";
import Link from "next/link";

export default function CourtsPage() {
    return (
        <div className="space-y-8">
            <DashboardHeader
                title="Quản lý sân bóng"
                description="Danh sách và trạng thái các sân thực tế."
                actions={
                    <Link href="/dashboard/courts/new" className="btn-primary inline-flex items-center">
                        + Thêm sân mới
                    </Link>
                }
            />

            {/* Chỉ render CourtList ở đây thôi */}
            <CourtList />
        </div>
    );
}