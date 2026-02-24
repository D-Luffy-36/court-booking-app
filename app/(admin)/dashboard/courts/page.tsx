// app/dashboard/courts/page.tsx
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { CourtListAdmin } from "@/features/court/components/CourtListAdmin";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function CourtsPage() {
    // 1. Khởi tạo Supabase client phía server
    const supabase = createClient();

    // 2. Query dữ liệu sân bóng
    const { data: courts, error } = await (await supabase)
        .from('courts')
        .select('*')
        .order('created_at', { ascending: false });

    // 3. Xử lý nếu có lỗi
    if (error) {
        return <div className="card error-message">Lỗi: {error.message}</div>;
    }

    return (
        <div className="space-y-8">
            <DashboardHeader
                title="Quản lý sân bóng"
                description="Danh sách và trạng thái các sân thực tế."
                actions={
                    <Link href="/dashboard/courts/new" className="btn-primary inline-flex items-center gap-2">
                        + Thêm sân mới
                    </Link>
                }
            />

            <CourtListAdmin courts={courts || []} />
        </div>
    );
}