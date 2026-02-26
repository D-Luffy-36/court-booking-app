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

    // lấy role từ profile để phân quyền UI (user hoặc admin)
    const [role, setRole] = useState<string | null>(null)

    // Trạng thái loading khi đang kiểm tra session ban đầu
    const [loading, setLoading] = useState(true)

    // Tạo Supabase client để gọi auth API
    const supabase = createClient()

    // 🚀 Bổ sung hàm Logout
    const signOut = async () => {
        await supabase.auth.signOut()
    }

    /**
     * Lấy role từ profiles table
     */
    const fetchRole = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single()

            if (error) {
                console.error('Error fetching role:', error)
                setRole(null)
                return
            }

            setRole(data?.role ?? null)
        } catch (error) {
            console.error('Error fetching role:', error)
            setRole(null)
        }
    }

    useEffect(() => {

        /**
         * 1️⃣ Lấy session hiện tại khi app mount
         * - Supabase lưu session trong storage
         * - Nếu tồn tại → restore user và role
         */
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)

            // Fetch role nếu có user
            if (currentUser?.id) {
                fetchRole(currentUser.id)
            } else {
                setRole(null)
            }

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
            const currentUser = session?.user ?? null
            setUser(currentUser)

            // Fetch role khi auth state thay đổi
            if (currentUser?.id) {
                fetchRole(currentUser.id)
            } else {
                setRole(null)
            }
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
        role,                       // role từ profile (user, admin, ...)
        loading,                    // đang check session hay không
        isAuthenticated: !!user,    // boolean tiện cho guard UI
        userId: user?.id ?? null,
        signOut,            // hàm logout để UI gọi
    }
}
