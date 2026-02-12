// app/dashboard/page.tsx
'use client'

import { useAuth, authApi } from '@/features/auth'
import { useRouter } from 'next/navigation'
import { CourtList } from '@/features/court/components/CourtList'

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await authApi.logout()
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
                <div className="spinner spinner-lg"></div>
                <div className="text-text-secondary animate-pulse">Đang tải dữ liệu...</div>
            </div>
        )
    }

    if (!user) {
        router.push('/login')
        return null
    }

    return (
        <div className="min-h-screen bg-background text-text-primary">
            {/* Navigation bar với màu Surface */}
            <nav className="bg-surface border-b border-border shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary tracking-tight">
                        Court Booking
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs text-text-muted italic">Đang đăng nhập với</span>
                            <span className="text-sm font-medium text-text-secondary">{user.email}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-error/10 text-error border border-error/20 px-4 py-2 rounded-lg hover:bg-error hover:text-white transition-all text-sm font-medium"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto py-10 px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-text-primary">Dashboard</h2>
                        <p className="text-text-muted mt-1">Chào mừng bạn quay trở lại hệ thống quản lý sân.</p>
                    </div>

                    {/* Ví dụ một nút chức năng thêm sân theo chuẩn btn-primary */}
                    <button className="btn-primary flex items-center gap-2 self-start">
                        <span>+</span> Đặt sân mới
                    </button>
                </div>

                {/* Section bọc CourtList có thể dùng class card nếu cần bao quát */}
                <div className="mt-4">
                    <CourtList />
                </div>
            </main>
        </div>
    )
}