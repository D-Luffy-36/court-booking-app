import Link from 'next/link'
import { Court } from '../types/court.types'

interface CourtListUserProps {
    courts: Court[];
}

export function CourtListUser({ courts = [] }: CourtListUserProps) {
    if (courts.length === 0) {
        return (
            <div className="empty-state card py-12 flex flex-col items-center justify-center border-2 border-dashed border-border">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <span className="text-5xl">🏟️</span>
                </div>
                <p className="empty-state-text text-xl font-semibold text-text-primary">Hệ thống chưa có sân nào</p>
                <p className="text-text-muted mt-2 max-w-xs text-center">
                    Hiện tại chưa có sân nào hoạt động. Vui lòng quay lại sau.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-text-primary flex items-center gap-3 tracking-tight">
                    <span className="w-2 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"></span>
                    DANH SÁCH SÂN BÓNG
                </h2>
                <span className="text-sm font-medium text-primary bg-muted px-3 py-1 rounded-full">
                    Tổng số: {courts.length} sân
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {courts.map((court) => {
                    const linkHref = `/courts/${court.id}`;
                    const linkText = 'Đặt lịch ngay';

                    return (
                        <Link
                            key={court.id}
                            href={linkHref}
                            className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* 1. Phần hình ảnh (Thumbnail Placeholder) */}
                            <div className="relative h-48 w-full bg-muted overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 bg-gradient-to-br from-primary/10 to-secondary/10">
                                    <span className="text-6xl opacity-30 select-none">⚽</span>
                                </div>
                                {/* Label giá nổi trên ảnh */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-background/90 backdrop-blur-md text-primary font-black px-3 py-1 rounded-lg text-sm shadow-sm border border-primary/20">
                                        {court.price_per_hour.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                            </div>

                            {/* 2. Nội dung chi tiết */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                                        {court.name}
                                    </h3>
                                    <span className="shrink-0 bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter border border-primary/20">
                                        {court.pitch_size}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <p className="text-text-secondary text-xs flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Khu vực Quận 1, TP.HCM
                                    </p>
                                    <p className="text-text-secondary text-xs flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Mặt cỏ nhân tạo tiêu chuẩn FIFA
                                    </p>
                                </div>

                                {/* 3. Footer: Trạng thái và Nút */}
                                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full animate-pulse ${court.is_available ? 'bg-success' : 'bg-error'}`}></span>
                                        <span className={`text-[11px] font-bold uppercase ${court.is_available ? 'text-success' : 'text-error'}`}>
                                            {court.is_available ? 'Sẵn sàng' : 'Hết sân'}
                                        </span>
                                    </div>
                                    <div
                                        className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                                    >
                                        {linkText}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}