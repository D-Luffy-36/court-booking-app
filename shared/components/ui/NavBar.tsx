'use client'

import Link from 'next/link'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function Navbar() {
    const { user, isAuthenticated, loading, signOut } = useAuth()

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
            {/* 1. Logo */}
            <Link href="/" className="text-xl font-bold tracking-tight">
                MY APP
            </Link>

            {/* 2. Auth Actions */}
            <div className="flex items-center gap-4">
                {loading ? (
                    // Hiển thị skeleton khi đang check session
                    <div className="h-8 w-20 bg-gray-700 animate-pulse rounded" />
                ) : isAuthenticated ? (
                    // Nếu ĐÃ ĐĂNG NHẬP
                    <>
                        <span className="text-sm text-gray-300 hidden md:inline">
                            Chào, {user?.email?.split('@')[0]}
                        </span>
                        <button
                            onClick={() => signOut()}
                            className="text-sm bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded transition-all"
                        >
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    // Nếu CHƯA ĐĂNG NHẬP
                    // Thay đoạn Link hiện tại bằng cái này:
                    <a
                        href="/login"
                        className="text-sm bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded transition-all cursor-pointer inline-block"
                    >
                        Đăng nhập
                    </a>
                )}
            </div>
        </nav>
    )
}