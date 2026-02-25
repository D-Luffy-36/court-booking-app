import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { VenueSidebar } from "@/features/court/components/VenueSidebar";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <DashboardHeader
                title="Cấu hình hệ thống"
                description="Quản lý thông tin sân bãi, giờ hoạt động và các thiết lập chung."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Cột trái: Thông tin hiển thị (Tái sử dụng VenueSidebar) */}
                <div className="lg:col-span-1">
                    <VenueSidebar />
                </div>

                {/* Cột phải: Các form cấu hình khác */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                        <h3 className="text-lg font-bold text-text-primary mb-4">Quy định đặt sân</h3>
                        <p className="text-text-secondary text-sm mb-4">
                            Cấu hình thời gian tối thiểu, tiền cọc và chính sách hủy sân.
                        </p>
                        {/* Placeholder cho form cấu hình */}
                        <div className="h-32 bg-muted/30 rounded-lg border border-dashed border-border flex items-center justify-center text-text-muted">
                            Form cấu hình quy định sẽ nằm ở đây
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}