'use client';

import { useState } from "react";
import { Court } from "../types/court.types";
import { useCourts } from "../hooks/useCourts"; // Giả sử đường dẫn hook của bạn

interface CourtEditFormProps {
    court: Court;
    onClose: () => void;
    onSuccess: () => void;
}

export function CourtEditForm({ court, onClose, onSuccess }: CourtEditFormProps) {
    // 1. Lấy hàm update và trạng thái từ Hook tập trung
    const { updateCourt, updating: isUpdating, error: apiError } = useCourts();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.currentTarget);

        // 2. Thu thập dữ liệu từ Form (bao gồm pitch_size mới thêm)
        const name = formData.get("name") as string;
        const type = formData.get("type") as string;
        const pitch_size = formData.get("pitch_size") as string;
        const price = Number(formData.get("price"));
        const isAvailable = formData.get("is_available") === "on";

        // 3. Validation tại Client
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = "Tên sân không được để trống";
        if (!type) newErrors.type = "Vui lòng chọn loại mặt sân";
        if (!pitch_size) newErrors.pitch_size = "Vui lòng chọn kích thước sân";
        if (price <= 0) newErrors.price = "Giá thuê phải lớn hơn 0";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedData = {
            name: name.trim(),
            type,
            pitch_size,
            price_per_hour: price,
            is_available: isAvailable,
        };

        // 4. Gọi hàm Update từ Hook (Hàm này đã bao gồm Optimistic Update)
        const result = await updateCourt(court.id, updatedData);

        // 5. Nếu thành công thì đóng Modal, nếu lỗi Hook sẽ tự update apiError
        if (result?.success) {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Banner hiển thị lỗi từ Server hoặc Client */}
            {(errors.submit || apiError) && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{apiError || errors.submit}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tên sân */}
                <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                        Tên sân <span className="text-error">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`input w-full bg-background text-text-primary border-border focus:ring-primary ${errors.name ? "!border-error focus:!ring-error" : ""}`}
                        defaultValue={court.name}
                        disabled={isUpdating}
                        required
                    />
                    {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Kích thước sân (Pitch Size) - MỚI BỔ SUNG */}
                <div>
                    <label htmlFor="pitch_size" className="block text-sm font-medium text-text-secondary mb-2">
                        Kích thước <span className="text-error">*</span>
                    </label>
                    <select
                        id="pitch_size"
                        name="pitch_size"
                        className={`input w-full bg-background text-text-primary border-border focus:ring-primary ${errors.pitch_size ? "!border-error" : ""}`}
                        defaultValue={court.pitch_size || ""}
                        disabled={isUpdating}
                        required
                    >
                        <option value="">-- Chọn size --</option>
                        <option value="Sân 5">Sân 5 người</option>
                        <option value="Sân 7">Sân 7 người</option>
                        <option value="Sân 11">Sân 11 người</option>
                    </select>
                </div>

                {/* Loại mặt sân (Type) */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-text-secondary mb-2">
                        Loại mặt sân <span className="text-error">*</span>
                    </label>
                    <select
                        id="type"
                        name="type"
                        className={`input w-full bg-background text-text-primary border-border focus:ring-primary ${errors.type ? "!border-error" : ""}`}
                        defaultValue={court.type}
                        disabled={isUpdating}
                        required
                    >
                        <option value="">-- Chọn loại --</option>
                        <option value="Sân cỏ nhân tạo">Sân cỏ nhân tạo</option>
                        <option value="Sân cỏ tự nhiên">Sân cỏ tự nhiên</option>
                        <option value="Sân xi măng">Sân xi măng</option>
                    </select>
                </div>
            </div>

            {/* Giá thuê */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-text-secondary mb-2">
                    Giá thuê (VNĐ/giờ) <span className="text-error">*</span>
                </label>
                <div className="relative">
                    <input
                        id="price"
                        name="price"
                        type="number"
                        className={`input w-full pr-16 bg-background text-text-primary border-border focus:ring-primary ${errors.price ? "!border-error" : ""}`}
                        defaultValue={court.price_per_hour}
                        disabled={isUpdating}
                        required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">VNĐ</span>
                </div>
            </div>

            {/* Trạng thái Sẵn sàng */}
            <div className="bg-muted/30 hover:bg-muted/50 transition-colors rounded-xl p-4 border border-border">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="is_available"
                        defaultChecked={court.is_available ?? true}
                        disabled={isUpdating}
                        className="w-5 h-5 text-primary rounded border-border focus:ring-primary cursor-pointer"
                    />
                    <div>
                        <span className="text-sm font-semibold text-text-primary">Sân đang sẵn sàng</span>
                        <p className="text-xs text-text-muted">Cho phép khách hàng tìm thấy và đặt sân này</p>
                    </div>
                </label>
            </div>

            {/* Nút bấm hành động */}
            <div className="flex gap-3 pt-4 border-t border-border">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isUpdating}
                    className="btn-secondary flex-1"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    disabled={isUpdating}
                    className="btn-primary flex-1 shadow-lg shadow-primary/20 relative"
                >
                    {isUpdating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang lưu...
                        </span>
                    ) : "Lưu thay đổi"}
                </button>
            </div>
        </form>
    );
}