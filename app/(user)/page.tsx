import { CourtListUser } from "@/features/court/components/CourtListUser";
import { createClient } from "@/lib/supabase/server";

// Đây là một Server Component, nó chạy hoàn toàn trên server.
export default async function Home() {
    const supabase = createClient();

    // Fetch dữ liệu sân trực tiếp trên server.
    const { data: courts, error } = await (await supabase)
        .from('courts')
        .select('*')
        .order('created_at', { ascending: false });

    // Giao diện lỗi đơn giản cho server component
    if (error) {
        return (
            <div className="card error-message">
                <p>Đã có lỗi xảy ra khi tải dữ liệu sân.</p>
                <p className="text-sm text-text-secondary">{error.message}</p>
            </div>
        );
    }

    // Truyền dữ liệu đã fetch được xuống component con.
    // `isAdminView` mặc định là false, hoàn toàn chính xác cho trang của người dùng.
    return <CourtListUser courts={courts || []} />;
}
