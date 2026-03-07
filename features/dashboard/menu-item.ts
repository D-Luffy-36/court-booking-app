export interface SidebarItem {
    label: string;
    href: string;
    icon: string;
}


export const SIDEBAR_ITEMS: SidebarItem[] = [
    { label: "Tổng quan", href: "/dashboard", icon: "📊" },
    { label: "Quản lý sân", href: "/dashboard/courts", icon: "🏟️" },
    { label: "Lịch đặt sân", href: "/dashboard/bookings", icon: "📅" },
    { label: "Khách hàng", href: "/dashboard/users", icon: "👥" },
    { label: "Báo cáo doanh thu", href: "/dashboard/reports", icon: "💰" },
    { label: "Cài đặt hệ thống", href: "/dashboard/settings", icon: "⚙️" },
];