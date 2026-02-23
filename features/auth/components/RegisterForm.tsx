'use client'

import { useState } from 'react'
import { authApi } from '@/features/auth'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function RegisterForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    // Sử dụng Supabase client-side client
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const full_name = formData.get('full_name') as string

        try {
            await authApi.register({ email, password, full_name })
            const supabase = createClient()
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    // Truyền thông tin bổ sung vào metadata của user
                    data: {
                        full_name: full_name,
                    },
                },
            })

            if (signUpError) {
                throw signUpError
            }

            setSuccess(true)
            setTimeout(() => router.push('/login'), 2000)
        } catch (err: any) {
            setError(err.message || 'Đăng ký thất bại')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="max-w-md w-full success-message flex-col text-center">
                <div className="text-primary text-5xl mb-4 animate-check">✓</div>
                <h2 className="text-2xl font-bold mb-2">Đăng ký thành công!</h2>
                <p className="text-text-secondary">
                    Đang chuyển đến trang đăng nhập...
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-md w-full card shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-text-primary">
                Đăng ký tài khoản
            </h2>

            {error && (
                <div className="error-message mb-4">
                    <span>⚠️</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        name="full_name"
                        required
                        className="w-full input"
                        placeholder="Nguyễn Văn A"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full input"
                        placeholder="email@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={6}
                        className="w-full input"
                        placeholder="Tối thiểu 6 ký tự"
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
                    ) : 'Đăng ký'}
                </button>
            </form>

            <p className="text-center mt-6 text-sm text-text-secondary">
                Đã có tài khoản?{' '}
                <Link
                    href="/login"
                    className="text-primary hover:text-primary-hover font-medium underline-offset-4 hover:underline transition-all"
                >
                    Đăng nhập ngay
                </Link>
            </p>
        </div>
    )
}