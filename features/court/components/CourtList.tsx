// features/court/components/CourtList.tsx
'use client'

import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner'
import { useCourts } from '../hooks/useCourts'
import Link from 'next/link'

export function CourtList() {
    const { courts, loading, error } = useCourts()

    // Sử dụng class .spinner đã định nghĩa trong CSS
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-text-secondary animate-pulse">Đang tải danh sách sân...</p>
            </div>
        )
    }

    // Sử dụng class .error-message đã định nghĩa trong CSS
    if (error) {
        return (
            <div className="error-message">
                <span>⚠️</span>
                <div>
                    <p className="font-bold">Đã có lỗi xảy ra</p>
                    <p className="text-sm opacity-90">{error}</p>
                </div>
            </div>
        )
    }

    // Sử dụng class .empty-state đã định nghĩa trong CSS
    if (courts.length === 0) {
        return (
            <div className="empty-state card">
                <span className="text-4xl mb-2">🏟️</span>
                <p className="empty-state-text text-lg font-medium">Không có sân nào trong hệ thống</p>
                <p className="text-text-muted text-sm">Vui lòng thêm sân mới để bắt đầu quản lý.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Danh sách sân
            </h2>

            {/* Grid Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courts.map((court) => (
                    <div
                        key={court.id}
                        className="card hover:border-primary/50 transition-all group relative overflow-hidden flex flex-col justify-between"
                    >
                        {/* Header: Tên sân và Badge loại sân */}
                        <div className="mb-4">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                                    {court.name}
                                </h3>
                                {/* Badge loại sân: Giúp phân biệt rõ 'Sân 1' và 'Sân 5' */}
                                <span className="shrink-0 bg-secondary/10 text-secondary text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-secondary/20">
                                    {court.pitch_size} NGƯỜI
                                </span>
                            </div>
                            {/* Thêm một icon nhỏ để sub-info trông chuyên nghiệp hơn */}
                            <p className="text-text-secondary text-xs mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Khu vực: Sân bóng cỏ nhân tạo
                            </p>
                        </div>

                        {/* Giá tiền */}
                        <div className="mb-6">
                            <p className="text-2xl font-bold text-primary italic">
                                {court.price_per_hour.toLocaleString('vi-VN')}
                                <span className="text-xs text-text-muted font-normal ml-1 not-italic">đ/giờ</span>
                            </p>
                        </div>

                        {/* Trạng thái và Link */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <span
                                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${court.is_available
                                    ? 'bg-success/10 text-success'
                                    : 'bg-error/10 text-error'
                                    }`}
                            >
                                {court.is_available ? '● Trống' : '● Đang đá'}
                            </span>
                            <Link
                                href={`/dashboard/courts/${court.id}`}
                                className="text-primary font-medium hover:underline text-sm transition-all"
                            >
                                Đặt sân ngay
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}