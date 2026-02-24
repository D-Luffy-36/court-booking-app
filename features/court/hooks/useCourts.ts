// features/court/hooks/useCourts.ts
'use client'

import { useState, useEffect } from 'react'
import { courtApi } from '../services/courtApi'
import type { Court, NewCourt } from '../types/court.types'

export function useCourts() {
    // ===== STATE LAYER =====
    // lưu danh sách sân sau khi fetch
    const [courts, setCourts] = useState<Court[]>([])

    // trạng thái loading để UI biết đang gọi API
    const [loading, setLoading] = useState(true)

    const [updating, setUpdating] = useState(false); // Trạng thái riêng cho việc Update
    const [creating, setCreating] = useState(false); // Trạng thái riêng cho việc Create

    // lưu lỗi nếu fetch thất bại
    const [error, setError] = useState<string | null>(null)

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

    // 🆕 HÀM UPDATE GỬI TỪ FORM
    const updateCourt = async (id: string, updates: Partial<Court>) => {
        try {
            setUpdating(true);

            // 1. Gọi API update ở service layer
            await courtApi.update(id, updates);

            // 2. Cập nhật State cục bộ để UI thay đổi ngay lập tức (Optimistic Update)
            setCourts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));

            // 3. Thông báo thành công (Có thể dùng sonner/toast tại đây)
            return { success: true };
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Update failed';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setUpdating(false);
        }
    };

    // 🆕 HÀM CREATE GỬI TỪ FORM
    const createCourt = async (courtData: NewCourt) => {
        try {
            setCreating(true);
            setError(null);

            // 1. Gọi API create
            const newCourt = await courtApi.create(courtData);

            // 2. Cập nhật State cục bộ (thêm vào đầu danh sách vì list đang sort desc)
            setCourts((prev) => [newCourt, ...prev]);

            return { success: true, data: newCourt };
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Create failed';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setCreating(false);
        }
    };

    useEffect(() => {
        // ===== LIFECYCLE TRIGGER =====
        // chạy fetch khi component mount lần đầu
        fetchCourts()
    }, [])

    // ===== RETURN API CHO COMPONENT =====
    // component chỉ cần dùng state + refetch
    return {
        courts,
        loading,
        updating, // Export thêm trạng thái này để Form biết khi nào đang lưu
        creating, // Export trạng thái creating
        error,
        refetch: fetchCourts,
        updateCourt, // Export hàm này để Form sử dụng
        createCourt // Export hàm create
    }
}
