'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function CourtForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const type = formData.get('type') as string
        const price = Number(formData.get('price'))

        try {
            const { error: insertError } = await supabase
                .from('courts')
                .insert([
                    {
                        name,
                        type,
                        price_per_hour: price,
                        is_available: true // Mặc định sân mới tạo là có sẵn
                    }
                ])

            if (insertError) throw insertError

            // Thành công -> Quay về danh sách và refresh data
            router.push('/dashboard/courts')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi tạo sân')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto card shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Thông tin sân mới</h2>

            {error && (
                <div className="error-message mb-4">
                    <span>⚠️</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">Tên sân</label>
                    <input
                        name="name"
                        required
                        placeholder="Ví dụ: Sân A - Real Madrid"
                        className="w-full input"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-text-secondary">Loại sân</label>
                        <select name="type" className="w-full input" required>
                            <option value="5">Sân 5 người</option>
                            <option value="7">Sân 7 người</option>
                            <option value="11">Sân 11 người</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-text-secondary">Giá thuê (VNĐ/giờ)</label>
                        <input
                            name="price"
                            type="number"
                            required
                            min="0"
                            step="1000"
                            placeholder="Ví dụ: 200000"
                            className="w-full input"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <Link href="/dashboard/courts" className="btn-secondary">
                        Hủy bỏ
                    </Link>
                    <button type="submit" disabled={loading} className="btn-primary min-w-[120px]">
                        {loading ? <span className="spinner spinner-sm"></span> : 'Tạo sân'}
                    </button>
                </div>
            </form>
        </div>
    )
}