// features/auth/hooks/useAuth.ts
'use client'

// React hooks quản lý state + lifecycle
import { useEffect, useState } from 'react'

// Supabase client phía frontend
import { createClient } from '@/lib/supabase/client'

// Type user Supabase để đảm bảo type-safe
import type { User } from '@supabase/supabase-js'
import type { AuthState } from '@/features/auth'


export function useAuth(): AuthState {

    // Lưu user hiện tại (null nếu chưa login)
    const [user, setUser] = useState<User | null>(null)

    // Trạng thái loading khi đang kiểm tra session ban đầu
    const [loading, setLoading] = useState(true)

    // Tạo Supabase client để gọi auth API
    const supabase = createClient()

    // 🚀 Bổ sung hàm Logout
    const signOut = async () => {
        await supabase.auth.signOut()
    }

    useEffect(() => {

        /**
         * 1️⃣ Lấy session hiện tại khi app mount
         * - Supabase lưu session trong storage
         * - Nếu tồn tại → restore user
         */
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        /**
         * 2️⃣ Lắng nghe thay đổi auth realtime
         * Trigger khi:
         * - login
         * - logout
         * - refresh token
         */
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        /**
         * Cleanup listener khi component unmount
         * → tránh memory leak
         */
        return () => subscription.unsubscribe()

    }, [])

    /**
     * Trả ra API đơn giản cho UI
     */
    return {
        user,                       // user object hoặc null
        loading,                    // đang check session hay không
        isAuthenticated: !!user,    // boolean tiện cho guard UI
        userId: user?.id ?? null,
        signOut,            // hàm logout để UI gọi
    }
}
