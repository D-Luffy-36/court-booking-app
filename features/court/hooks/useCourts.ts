// features/court/hooks/useCourts.ts
'use client'

import { useState, useEffect } from 'react'
import { courtApi } from '../services/courtApi'
import type { Court } from '../types/court.types'

export function useCourts() {
    // ===== STATE LAYER =====
    // lưu danh sách sân sau khi fetch
    const [courts, setCourts] = useState<Court[]>([])

    // trạng thái loading để UI biết đang gọi API
    const [loading, setLoading] = useState(true)

    // lưu lỗi nếu fetch thất bại
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // ===== DATA FETCH FUNCTION =====
        // function async gọi API lấy dữ liệu
        async function fetchCourts() {
            try {
                // 1️⃣ bật loading trước khi gọi API
                setLoading(true)

                // 2️⃣ gọi service layer để lấy dữ liệu
                const data = await courtApi.getAll()

                // 3️⃣ update state với dữ liệu mới
                setCourts(data)

                // 4️⃣ reset lỗi nếu fetch thành công
                setError(null)
            } catch (err) {
                // 5️⃣ nếu lỗi → lưu message để UI hiển thị
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to fetch courts'
                )

                // log lỗi cho dev debug
                console.error('Error in useCourts:', err)
            } finally {
                // 6️⃣ tắt loading dù thành công hay thất bại
                setLoading(false)
            }
        }

        // ===== LIFECYCLE TRIGGER =====
        // chạy fetch khi component mount lần đầu
        fetchCourts()
    }, [])

    // ===== RETURN API CHO COMPONENT =====
    // component chỉ cần dùng state + refetch
    return {
        courts,
        loading,
        error,

        // cho phép gọi lại API khi cần reload data
        refetch: () => {
            // có thể tái sử dụng fetch logic ở đây
            // (nâng cấp: tách fetchCourts ra ngoài useEffect)
        },
    }
}
