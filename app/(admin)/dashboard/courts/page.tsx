// app/dashboard/courts/page.tsx
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { CourtListAdmin } from "@/features/court/components/CourtListAdmin";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Settings } from "lucide-react";

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
        <div className="space-y-6">
            <DashboardHeader
                title="Quản lý sân bóng"
                description="Danh sách và trạng thái các sân thực tế."
                actions={
                    <div className="flex gap-3">
                        <Link href="/dashboard/settings" className="btn-secondary flex items-center gap-2">
                            <Settings size={18} />
                            Cấu hình chung
                        </Link>
                        <Link href="/dashboard/courts/new" className="btn-primary flex items-center gap-2">
                            + Thêm sân mới
                        </Link>
                    </div>
                }
            />

            {/* Bảng quản lý full width */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <CourtListAdmin courts={courts} />
                </div>
            </div>
        </div>
    )
}