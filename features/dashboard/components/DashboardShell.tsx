"use client"

import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardNavbar } from "./DashboardNavbar"

export function DashboardShell({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
            <DashboardSidebar />

            <div className="flex flex-col flex-1 min-w-0">
                <DashboardNavbar />

                <main className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar">
                    {/* Thay max-w-7xl bằng max-w-full để lấy hết không gian cho bảng */}
                    <div className="max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}