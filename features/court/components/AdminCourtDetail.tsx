'use client'

import { Court } from "../types/court.types";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { useRouter } from "next/navigation";
import CourtActionCard from "./CourtActionCard";
import { useState, useEffect } from "react";
import { CourtEditForm } from "./CourtEditForm";
import CourtInfo from "./CourtInfor";
import { createPortal } from "react-dom";

interface AdminCourtDetailProps {
    court: Court;
}

export default function AdminCourtDetail({ court }: AdminCourtDetailProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const handleBook = (id: string | number) => {
        console.log("Admin đặt lịch hộ:", id);
    };

    const handleDelete = async (id: string | number) => {
        if (confirm("Bạn có chắc chắn muốn xóa sân này?")) {
            console.log("Đang xóa sân:", id);
        }
    };

    const handleMaintenance = (id: string | number) => {
        console.log("Bảo trì sân:", id);
    };

    const renderModal = () => {
        if (!isEditing || !mounted) return null;
        return createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditing(false)} />
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50">
                        <h2 className="text-xl font-bold text-primary italic">Chỉnh sửa thông tin sân</h2>
                        <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all">✕</button>
                    </div>
                    <div className="p-6 max-h-[80vh] overflow-y-auto">
                        <CourtEditForm
                            court={court}
                            onClose={() => setIsEditing(false)}
                            onSuccess={() => { setIsEditing(false); router.refresh(); }}
                        />
                    </div>
                </div>
            </div>,
            document.body
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <DashboardHeader
                title={court.name}
                description={`Quản lý thông tin và trạng thái của ${court.name}`}
                actions={
                    <button onClick={() => router.back()} className="btn-secondary italic">← Quay lại danh sách</button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CourtInfo court={court} />
                <div className="h-fit">
                    <CourtActionCard
                        court={court}
                        onBook={handleBook}
                        onEdit={() => setIsEditing(true)}
                        onDelete={handleDelete}
                        onMaintenance={handleMaintenance}
                    />
                </div>
            </div>
            {renderModal()}
        </div>
    );
}