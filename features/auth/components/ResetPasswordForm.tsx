'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function ResetPasswordForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp')
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            setSuccess(true)
            // Redirect về login sau 2s
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi đổi mật khẩu')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="max-w-md w-full card shadow-2xl text-center">
                <div className="text-primary text-5xl mb-4 animate-check">✓</div>
                <h2 className="text-2xl font-bold mb-2 text-text-primary">Đổi mật khẩu thành công!</h2>
                <p className="text-text-secondary mb-6">
                    Bạn sẽ được chuyển hướng đến trang đăng nhập trong giây lát...
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-md w-full card shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-text-primary">
                Đặt lại mật khẩu
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
                        Mật khẩu mới
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

                <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                        Xác nhận mật khẩu
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        minLength={6}
                        className="w-full input"
                        placeholder="Nhập lại mật khẩu mới"
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
                            Đang cập nhật...
                        </>
                    ) : 'Đổi mật khẩu'}
                </button>
            </form>
        </div>
    )
}