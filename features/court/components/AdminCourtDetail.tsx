'use client'

import { Court } from "../types/court.types";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { useRouter } from "next/navigation";
import CourtActionCard from "./CourtActionCard";
import { useState, useEffect } from "react";
import { CourtEditForm } from "./CourtEditForm";
import { createPortal } from "react-dom";
import CourtInfo from "./CourtInfor";

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
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 border border-border">
                    {/* Header */}
                    <div className="sticky top-0 bg-card border-b border-border px-6 py-5 rounded-t-2xl flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-text-primary">Chỉnh sửa sân</h2>
                            <p className="text-sm text-text-secondary mt-1">
                                Cập nhật thông tin cho <span className="font-semibold text-primary">{court.name}</span>
                            </p>
                        </div>
                        <button onClick={() => setIsEditing(false)} className="text-text-muted hover:text-text-primary transition-colors disabled:opacity-50" aria-label="Đóng">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="overflow-y-auto">
                        <CourtEditForm
                            court={court}
                            onClose={() => setIsEditing(false)}
                            onSuccess={() => {
                                setIsEditing(false);
                                router.refresh();
                            }}
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