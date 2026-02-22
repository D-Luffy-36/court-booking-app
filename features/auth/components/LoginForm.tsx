// features/auth/components/LoginForm.tsx
'use client'

import { useState } from 'react'
import { authApi } from '@/features/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function LoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            await authApi.login({ email, password })
            router.push('/dashboard')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Đăng nhập thất bại')
        } finally {
            setLoading(false)
        }
    }

    return (
        // Sử dụng bg-background thay vì bg-gray-50
        <div>
            {/* Sử dụng class card thay vì bg-white */}
            <div className="max-w-md w-full card shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-text-primary">
                    Đăng nhập
                </h2>

                {error && (
                    <div className="error-message mb-4">
                        <span>⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-secondary">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            className="w-full input"
                            placeholder="email@example.com"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
                                Mật khẩu
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary hover:text-primary-hover font-medium underline-offset-4 hover:underline"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            className="w-full input"
                            placeholder="Mật khẩu"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="spinner spinner-sm"></span>
                                Đang xử lý...
                            </>
                        ) : 'Đăng nhập'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-text-secondary">
                    Chưa có tài khoản?{' '}
                    <Link
                        href="/register"
                        className="text-primary hover:text-primary-hover font-medium underline-offset-4 hover:underline transition-all"
                    >
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    )
}