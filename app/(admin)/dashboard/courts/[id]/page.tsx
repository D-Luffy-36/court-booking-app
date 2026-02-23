// app/dashboard/courts/[id]/page.tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AdminCourtDetail from "@/features/court/components/AdminCourtDetail";
import { Court } from "@/features/court/types/court.types";

interface PageProps {
    // Trong Next.js 15, params phải là một Promise
    params: Promise<{ id: string }>;
}

export default async function CourtDetailPage({ params }: PageProps) {

    // 1. PHẢI CÓ DÒNG NÀY:
    const { id } = await params;

    console.log("Received params:", { id });

    const supabase = createClient();

    const { data, error } = await (await supabase)
        .from('courts')
        .select('*')
        .eq('id', id)
        .single();

    console.log("Fetched court data:", data, "Error:", error);

    // Ép kiểu về Court từ Database types
    const court = data as Court;

    if (error || !court) {
        notFound();
    }

    return <AdminCourtDetail court={court} />;
}