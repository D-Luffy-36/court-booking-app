// features/court/components/CourtList.tsx
'use client'

import { useCourts } from '../hooks/useCourts'

export function CourtList() {
    const { courts, loading, error } = useCourts()

    if (loading) {
        return <div className="p-4">Đang tải...</div>
    }

    if (error) {
        return <div className="p-4 text-red-500">Lỗi: {error}</div>
    }

    if (courts.length === 0) {
        return <div className="p-4">Không có sân nào</div>
    }

    return (
        <div className="grid gap-4 p-4">
            <h2 className="text-2xl font-bold">Danh sách sân</h2>

            {courts.map((court) => (
                <div
                    key={court.id}
                    className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                    <h3 className="text-xl font-semibold">{court.name}</h3>
                    <p className="text-gray-600">Loại: {court.type}</p>
                    <p className="text-green-600 font-bold">
                        {court.price_per_hour.toLocaleString('vi-VN')}đ/giờ
                    </p>
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${court.is_available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {court.is_available ? 'Có sẵn' : 'Đã đặt'}
                    </span>
                </div>
            ))}
        </div>
    )
}