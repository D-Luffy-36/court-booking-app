// app/dashboard/courts/[id]/page.tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CourtDetail from "@/features/court/components/CourtDetail";
import { Court } from "@/features/court/types/court.types";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CourtDetailPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('courts')
        .select('*')
        .eq('id', id)
        .single();

    // Ép kiểu về Court từ Database types
    const court = data as Court;

    if (error || !court) {
        notFound();
    }

    return <CourtDetail court={court} />;
}