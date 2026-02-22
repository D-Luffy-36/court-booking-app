'use client'

import { useState } from 'react'
import { createClient } from '@lib/supabase/client'
import Link from 'next/link'

export function ForgotPasswordForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                // URL này sẽ là nơi user được chuyển đến sau khi click link trong email
                // Bạn cần tạo trang này sau để user nhập mật khẩu mới
                redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
            })
            if (error) throw error
            setSuccess(true)
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi gửi yêu cầu')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="max-w-md w-full card shadow-2xl text-center">
                <div className="text-primary text-5xl mb-4">✉️</div>
                <h2 className="text-2xl font-bold mb-2 text-text-primary">Kiểm tra email</h2>
                <p className="text-text-secondary mb-6">
                    Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư đến (và cả mục spam).
                </p>
                <Link
                    href="/login"
                    className="btn-secondary w-full flex justify-center"
                >
                    Quay lại đăng nhập
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-md w-full card shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2 text-text-primary">
                Quên mật khẩu?
            </h2>
            <p className="text-center text-text-secondary mb-6 text-sm">
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
            </p>

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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <span className="spinner spinner-sm"></span>
                            Đang gửi...
                        </>
                    ) : 'Gửi liên kết'}
                </button>
            </form>

            <div className="text-center mt-6">
                <Link
                    href="/login"
                    className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                    <span>←</span> Quay lại đăng nhập
                </Link>
            </div>
        </div>
    )
}