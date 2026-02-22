'use client';

import { Court } from "../types/court.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourtEditFormProps {
    court: Court;
    onClose: () => void;
    onSuccess: () => void;
}

export function CourtEditForm({ court, onClose, onSuccess }: CourtEditFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name") as string;
            const type = formData.get("type") as string;
            const price = Number(formData.get("price"));
            const isAvailable = formData.get("is_available") === "on";

            // Validation
            const newErrors: Record<string, string> = {};
            if (!name.trim()) newErrors.name = "Tên sân không được để trống";
            if (!type.trim()) newErrors.type = "Loại sân không được để trống";
            if (price <= 0) newErrors.price = "Giá thuê phải lớn hơn 0";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setIsSubmitting(false);
                return;
            }

            const updatedData = {
                name: name.trim(),
                type: type.trim(),
                price_per_hour: price,
                is_available: isAvailable,
            };

            console.log("Gửi dữ liệu lên server:", updatedData);

            // TODO: Gọi API update
            // const { error } = await supabase
            //   .from('courts')
            //   .update(updatedData)
            //   .eq('id', court.id);
            // if (error) throw error;

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            onSuccess();
            router.refresh();
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            setErrors({ submit: "Có lỗi xảy ra khi cập nhật. Vui lòng thử lại!" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 rounded-t-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Chỉnh sửa sân</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Cập nhật thông tin cho <span className="font-semibold text-primary">{court.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                        aria-label="Đóng"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Error Alert */}
                    {errors.submit && (
                        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg flex items-start gap-3">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{errors.submit}</span>
                        </div>
                    )}

                    {/* Tên sân */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Tên sân <span className="text-error">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className={`input w-full ${errors.name ? "border-error focus:ring-error" : ""}`}
                            defaultValue={court.name}
                            placeholder="VD: Sân số 1"
                            disabled={isSubmitting}
                            required
                        />
                        {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Loại sân */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                            Loại sân <span className="text-error">*</span>
                        </label>
                        <select
                            id="type"
                            name="type"
                            className={`input w-full ${errors.type ? "border-error focus:ring-error" : ""}`}
                            defaultValue={court.type}
                            disabled={isSubmitting}
                            required
                        >
                            <option value="">-- Chọn loại sân --</option>
                            <option value="Sân cỏ nhân tạo">Sân cỏ nhân tạo</option>
                            <option value="Sân cỏ tự nhiên">Sân cỏ tự nhiên</option>
                            <option value="Sân xi măng">Sân xi măng</option>
                            <option value="Sân phủi">Sân phủi</option>
                        </select>
                        {errors.type && <p className="text-error text-xs mt-1">{errors.type}</p>}
                    </div>

                    {/* Giá thuê */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                            Giá thuê (VNĐ/giờ) <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="1000"
                                className={`input w-full pr-16 ${errors.price ? "border-error focus:ring-error" : ""}`}
                                defaultValue={court.price_per_hour}
                                placeholder="150000"
                                disabled={isSubmitting}
                                required
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                                VNĐ
                            </span>
                        </div>
                        {errors.price && <p className="text-error text-xs mt-1">{errors.price}</p>}
                    </div>

                    {/* Trạng thái */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_available"
                                defaultChecked={court.is_available ?? true}
                                disabled={isSubmitting}
                                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-900">Sân đang sẵn sàng</span>
                                <p className="text-xs text-gray-500 mt-0.5">Cho phép khách hàng đặt lịch sân này</p>
                            </div>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="btn-secondary flex-1 disabled:opacity-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary flex-1 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed relative"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang lưu...
                                </>
                            ) : (
                                "Lưu thay đổi"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}