// features/dashboard/components/DashboardHome.tsx
import { DashboardHeader } from "./DashboardHeader";

export function DashboardHome() {
    return (
        <div className="space-y-6">
            <DashboardHeader
                title="Welcome"
                description="Chào mừng bạn quay trở lại hệ thống quản lý sân."
                actions={
                    <div className="flex items-center gap-2">
                        {/* Sửa lại vị trí dấu ! theo gợi ý của VS Code */}
                        <button className="card p-2! m-0! hover:border-primary transition-colors" title="Thông báo">
                            <span className="text-xl">🔔</span>
                        </button>

                        <button className="card p-2! m-0! hover:border-primary transition-colors" title="Tìm kiếm">
                            <span className="text-xl">🔍</span>
                        </button>

                        <button className="btn-primary ml-2 flex items-center gap-2">
                            <span className="text-2xl leading-none">+</span>
                            <span>Đặt sân mới</span>
                        </button>
                    </div>
                }
            />

            {/* 1. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Doanh thu" value="12,500,000đ" trend="+15%" icon="💰" />
                <StatCard title="Lịch đặt hôm nay" value="24" trend="+5" icon="📅" />
                <StatCard title="Khách hàng" value="1,200" trend="+12" icon="👥" />
                <StatCard title="Tỷ lệ lấp đầy" value="85%" trend="+2%" icon="📈" />
            </div>

            {/* 2. Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Biểu đồ (Chiếm 2 phần) */}
                <div className="lg:col-span-2 card">
                    <h3 className="font-semibold mb-4 text-white">Biểu đồ doanh thu tuần này</h3>
                    {/* Giữ nguyên bg tối của card, chỉ đổi border nét đứt cho placeholder */}
                    <div className="h-[300px] flex items-center justify-center rounded border border-dashed border-border">
                        <p className="text-text-secondary">Chart Placeholder</p>
                    </div>
                </div>

                {/* Lịch đặt gần đây (Chiếm 1 phần) */}
                <div className="card">
                    <h3 className="font-semibold mb-4 text-white">Lịch đặt mới nhất</h3>
                    <ul className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="flex justify-between items-center text-sm border-b border-border pb-3 last:border-0">
                                <div>
                                    <p className="font-medium text-white">Sân số {i}</p>
                                    <p className="text-text-secondary text-xs">18:00 - 20:00</p>
                                </div>
                                <span className="text-primary font-bold">Đã cọc</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, icon }: { title: string; value: string; trend: string; icon: string }) {
    return (
        <div className="card flex items-center justify-between group hover:border-primary transition-all cursor-default">
            <div>
                <p className="text-xs uppercase tracking-wider text-text-secondary font-medium">{title}</p>
                <h4 className="text-2xl font-bold mt-1 text-white">{value}</h4>
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-primary font-semibold">{trend}</span>
                    <span className="text-[10px] text-text-secondary whitespace-nowrap">so với tháng trước</span>
                </div>
            </div>
            <div className="text-3xl opacity-30 group-hover:opacity-100 transition-opacity">
                {icon}
            </div>
        </div>
    );
}