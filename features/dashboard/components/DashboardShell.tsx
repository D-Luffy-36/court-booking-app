"use client"

import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardNavbar } from "./DashboardNavbar"

export function DashboardShell({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        /* h-screen: ép toàn bộ layout cao đúng bằng màn hình và không cho cuộn cả trang */
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar: Cố định độ rộng, h-full đảm bảo nó luôn cao hết màn hình */}
            <DashboardSidebar />

            <div className="flex flex-col flex-1 min-w-0">
                {/* Navbar: Sẽ nằm cố định ở trên cùng do flex-col */}
                <DashboardNavbar />

                {/* Main: 
                    1. flex-1: chiếm toàn bộ không gian còn lại.
                    2. overflow-y-auto: Chỉ cho phép cuộn bên trong vùng này khi nội dung dài. 
                */}
                <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}