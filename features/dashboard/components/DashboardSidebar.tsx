'use client'

// features/dashboard/components/DashboardSidebar.tsx
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation" // Để kiểm tra xem mục nào đang được chọn
import { SIDEBAR_ITEMS } from "../menu-item"
import { useAuth } from "@/features/auth/hooks/useAuth" // Import hook auth để lấy user và signOut

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();
        router.push("/login"); // Đổi thành "/" nếu muốn về trang chủ
    };

    return (
        <aside className="w-64 h-screen bg-surface border-r border-border p-6 sticky top-0 flex flex-col">
            {/* Logo Section */}
            <h2 className="text-2xl font-bold text-primary mb-8 tracking-tight">
                Arena<span className="text-text-primary">Manager</span>
            </h2>

            {/* Navigation Section */}
            <nav className="space-y-1 flex-1">
                {SIDEBAR_ITEMS.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${isActive
                                ? "bg-primary-light text-primary shadow-sm"
                                : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Section */}
            <div className="pt-6 border-t border-border">
                <button onClick={handleLogout} className="btn-secondary w-full justify-start text-sm flex items-center gap-3">
                    <span>🚪</span> Đăng xuất
                </button>
            </div>
        </aside>
    )
}