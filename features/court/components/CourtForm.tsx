'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCourts } from '../hooks/useCourts'

export function CourtForm() {
    const router = useRouter()
    const { createCourt, creating, error: apiError } = useCourts()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({})

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const type = formData.get('type') as string
        const pitch_size = formData.get('pitch_size') as string
        const price = Number(formData.get('price'))

        // Validation cơ bản
        const newErrors: Record<string, string> = {}
        if (!name.trim()) newErrors.name = "Tên sân không được để trống"
        if (!type) newErrors.type = "Vui lòng chọn loại sân"
        if (!pitch_size) newErrors.pitch_size = "Vui lòng chọn kích thước sân"
        if (price <= 0) newErrors.price = "Giá thuê phải lớn hơn 0"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Gọi API qua Hook
        const result = await createCourt({
            name: name.trim(),
            type,
            pitch_size,
            price_per_hour: price,
            is_available: true // Mặc định sân mới tạo là có sẵn
        })

        if (result.success) {
            router.push('/dashboard/courts')
            router.refresh()
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-sm border border-border p-8">
            {/* Error Alert */}
            {(errors.submit || apiError) && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg flex items-start gap-3 mb-6">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{apiError || errors.submit}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tên sân */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                        Tên sân <span className="text-error">*</span>
                    </label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Ví dụ: Sân A - Real Madrid"
                        className={`input w-full bg-background text-text-primary border-border focus:ring-primary ${errors.name ? "!border-error focus:!ring-error" : ""}`}
                        disabled={creating}
                    />
                    {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kích thước sân */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-text-secondary">
                            Kích thước <span className="text-error">*</span>
                        </label>
                        <select
                            name="pitch_size"
                            className={`input w-full bg-background text-text-primary border-border focus:ring-primary ${errors.pitch_size ? "!border-error" : ""}`}
                            required
                            disabled={creating}
                            defaultValue=""
                        >
                            <option value="" disabled>-- Chọn kích thước --</option>
                            <option value="Sân 5">Sân 5 người</option>
                            <option value="Sân 7">Sân 7 người</option>
                            <option value="Sân 11">Sân 11 người</option>
                        </select>
                        {errors.pitch_size && <p className="text-error text-xs mt-1">{errors.pitch_size}</p>}
                    </div>

                    {/* Loại sân */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-text-secondary">
                            Loại mặt sân <span className="text-error">*</span>
                        </label>
                        <select
                            name="type"
                            className={`input w-full bg-background text-text-primary border-border focus:ring-primary ${errors.type ? "!border-error" : ""}`}
                            required
                            disabled={creating}
                            defaultValue=""
                        >
                            <option value="" disabled>-- Chọn loại sân --</option>
                            <option value="Sân cỏ nhân tạo">Sân cỏ nhân tạo</option>
                            <option value="Sân cỏ tự nhiên">Sân cỏ tự nhiên</option>
                            <option value="Sân xi măng">Sân xi măng</option>
                        </select>
                        {errors.type && <p className="text-error text-xs mt-1">{errors.type}</p>}
                    </div>
                </div>

                {/* Giá thuê */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                        Giá thuê (VNĐ/giờ) <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                        <input
                            name="price"
                            type="number"
                            required
                            min="0"
                            step="1000"
                            // Thêm dòng này để set giá mặc định
                            defaultValue={240000}
                            placeholder="Ví dụ: 240000"
                            className={`input w-full pr-16 bg-background text-text-primary border-border focus:ring-primary ${errors.price ? "!border-error" : ""}`}
                            disabled={creating}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium border-l pl-3 border-border">
                            VNĐ
                        </span>
                    </div>
                    {errors.price && <p className="text-error text-xs mt-1">{errors.price}</p>}
                    <p className="text-[10px] text-text-muted mt-1 italic">* Giá mặc định đề xuất là 240.000đ/giờ</p>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
                    <Link href="/dashboard/courts" className="btn-secondary">
                        Hủy bỏ
                    </Link>
                    <button type="submit" disabled={creating} className="btn-primary min-w-[140px] shadow-lg shadow-primary/20">
                        {creating ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang tạo...
                            </>
                        ) : 'Tạo sân mới'}
                    </button>
                </div>
            </form>
        </div>
    )
}