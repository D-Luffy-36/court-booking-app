// features/dashboard/components/DashboardNavbar.tsx

import { useAuth } from "@/features/auth/hooks/useAuth"

export function DashboardNavbar() {
    const { user, isAuthenticated } = useAuth()

    return (
        /* - bg-surface: Sử dụng màu xám tối (#242424) thay cho bg-white
           - border-border: Sử dụng màu viền xám (#404040) thay cho border mặc định
        */
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="font-semibold text-text-primary">Welcome</div>

            {isAuthenticated && (
                /* - text-text-secondary: Sử dụng màu xám nhạt (#a3a3a3) cho email
                */
                <div className="text-sm text-text-secondary flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    {user?.email}
                </div>
            )}
        </header>
    )
}