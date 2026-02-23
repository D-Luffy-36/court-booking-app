import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import UserCourtDetail from "@/features/court/components/UserCourtDetail";
import { Court } from "@/features/court/types/court.types";

interface PageProps {
    // Bắt buộc dùng Promise cho Next.js 15+
    params: Promise<{ id: string }>;
}

export default async function CourtDetailPage({ params }: PageProps) {
    // 1. Await để lấy id thực tế từ URL
    const { id } = await params;

    // 2. Khởi tạo Supabase client
    const supabase = await createClient();

    // 3. Truy vấn dữ liệu
    const { data, error } = await supabase
        .from("courts")
        .select("*")
        .eq("id", id)
        .single();

    // Nếu lỗi hoặc không có dữ liệu -> Trả về trang 404
    if (error || !data) {
        console.error("Supabase Error:", error?.message);
        return notFound();
    }

    // Ép kiểu dữ liệu an toàn
    const court = data as Court;

    return (
        <div className="container mx-auto py-6">
            <UserCourtDetail court={court} />
        </div>
    );
}