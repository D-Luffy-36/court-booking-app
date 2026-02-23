import { Court } from "../types/court.types";
import CourtInfo from "./CourtInfor";

interface UserCourtDetailProps {
    court: Court;
}

export default function UserCourtDetail({ court }: UserCourtDetailProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Banner Header đẹp mắt cho User */}
            <div className="relative h-60 md:h-72 rounded-2xl overflow-hidden bg-muted flex items-center justify-center p-4 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <span className="text-8xl opacity-20 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">⚽</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-text-primary text-center z-10 drop-shadow-sm uppercase tracking-tight">
                    {court.name}
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Tái sử dụng CourtInfo vì thông tin hiển thị giống nhau */}
                <CourtInfo court={court} />

                {/* Booking Card riêng cho User */}
                <div className="h-fit sticky top-24 card p-6 space-y-6 border-primary/20 shadow-xl shadow-primary/5">
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-2">Đặt lịch giữ chỗ</h3>
                        <p className="text-sm text-text-secondary">
                            Chọn khung giờ trống để giữ chỗ nhanh.
                            <span className="block font-medium text-amber-600 mt-1">
                                * Thanh toán trực tiếp tại sân sau khi sử dụng.
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                        <span className="text-text-secondary">Giá thuê:</span>
                        <span className="font-bold text-xl text-primary">{court.price_per_hour.toLocaleString('vi-VN')}đ<span className="text-sm font-normal text-text-secondary">/giờ</span></span>
                    </div>

                    <button className="btn-primary w-full py-3 text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                        Tiến hành đặt lịch
                    </button>
                </div>
            </div>
        </div>
    )
}