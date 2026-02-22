"use client"

import { useAuth } from '@/features/auth/hooks/useAuth'
import Link from 'next/link' // Import Link

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, signOut } = useAuth();

    return (
        <section className="min-h-screen bg-[#121212] text-white">
            <nav className="p-4 border-b border-gray-800 flex justify-between items-center">
                <span className="text-green-500 font-bold uppercase tracking-wider">SPORT BOOKING</span>

                {loading ? (
                    <div className="h-8 w-20 bg-gray-800 animate-pulse rounded"></div>
                ) : user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">{user.email}</span>
                        <button onClick={signOut} className="text-sm bg-red-600 px-4 py-1 rounded">
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    /* 3. Chưa đăng nhập - Dùng Link để bọc button */
                    <Link href="/login">
                        <button className="text-sm bg-green-600 px-4 py-1 rounded hover:bg-green-700 transition-colors">
                            Đăng nhập
                        </button>
                    </Link>
                )}
            </nav>

            <main className="max-w-7xl mx-auto p-6">
                {children}
            </main>
        </section>
    );
}