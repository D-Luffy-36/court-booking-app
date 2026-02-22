'use client'

import { Court } from "../types/court.types";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { useRouter } from "next/navigation";
import CourtActionCard from "./CourtActionCard";
import { useState, useEffect } from "react";
import { CourtEditForm } from "./CourtEditForm";
import CourtInfo from "./CourtInfor";
import { createPortal } from "react-dom";

interface CourtDetailProps {
    court: Court;
}

export default function CourtDetail({ court }: CourtDetailProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Tránh lỗi Hydration khi dùng Portal trong Next.js
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // --- Các hàm xử lý sự kiện ---
    const handleBook = (id: string | number) => {
        console.log("Đặt lịch cho sân:", id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = async (id: string | number) => {
        if (confirm("Bạn có chắc chắn muốn xóa sân này?")) {
            console.log("Đang xóa sân:", id);
            // Thực hiện API xóa ở đây
        }
    };

    const handleMaintenance = (id: string | number) => {
        console.log("Chuyển trạng thái bảo trì:", id);
    };

    const renderModal = () => {
        if (!isEditing || !mounted) return null;

        return createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop: Lớp nền mờ */}
                <div
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setIsEditing(false)}
                />

                {/* Nội dung Modal */}
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50">
                        <h2 className="text-xl font-bold text-primary italic">Chỉnh sửa thông tin sân</h2>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="p-2 hover:bg-slate-200 rounded-full transition-all text-text-secondary"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-6 max-h-[80vh] overflow-y-auto">
                        <CourtEditForm
                            court={court}
                            onClose={() => setIsEditing(false)}
                            onSuccess={() => {
                                setIsEditing(false);
                                router.refresh(); // Làm mới dữ liệu sau khi lưu
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
                description={`Thông tin chi tiết về ${court.name}`}
                actions={
                    <button
                        onClick={() => router.back()}
                        className="btn-secondary italic"
                    >
                        ← Quay lại danh sách
                    </button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột trái: Thông số chi tiết */}
                <CourtInfo court={court} />

                {/* Cột phải: Thẻ hành động */}
                <div className="h-fit">
                    <CourtActionCard
                        court={court}
                        onBook={handleBook}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onMaintenance={handleMaintenance}
                    />
                </div>
            </div>

            {/* Gọi hàm render Modal thông qua Portal */}
            {renderModal()}
        </div>
    );
}