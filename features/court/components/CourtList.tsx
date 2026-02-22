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
                        className="card hover:border-primary/50 transition-all group relative overflow-hidden"
                    >
                        {/* Tên sân và Loại */}
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                                {court.name}
                            </h3>
                            <p className="text-text-secondary text-sm">{court.type}</p>
                        </div>

                        {/* Giá tiền */}
                        <div className="mb-6">
                            <p className="text-2xl font-bold text-primary">
                                {court.price_per_hour.toLocaleString('vi-VN')}
                                <span className="text-xs text-text-muted font-normal ml-1">đ/giờ</span>
                            </p>
                        </div>

                        {/* Trạng thái sử dụng các biến màu CSS */}
                        <div className="flex items-center justify-between">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${court.is_available
                                    ? 'bg-success-bg text-success border-success/20'
                                    : 'bg-error-bg text-error border-error/20'
                                    }`}
                            >
                                {court.is_available ? '● Có sẵn' : '● Đã đặt'}
                            </span>
                            <Link
                                href={`/dashboard/courts/${court.id}`}
                                className="text-text-muted hover:text-primary text-sm transition-colors"
                            >
                                Chi tiết →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}