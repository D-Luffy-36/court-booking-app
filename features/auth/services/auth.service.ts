import { createClient } from '@/lib/supabase/client'

// Import type để đảm bảo input đúng structure
import type { RegisterData, LoginData } from '../types/auth.types'

// Object tập trung toàn bộ logic auth → giúp UI không cần biết Supabase chi tiết
export const authApi = {
    /**
     * Đăng ký user mới
     * - Tạo account bằng email/password
     * - Lưu thêm metadata (full_name)
     */
    async register({ email, password, full_name }: RegisterData) {
        const supabase = createClient()

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                // metadata lưu vào auth.users.raw_user_meta_data
                data: {
                    full_name,
                },
            },
        })

        // fail fast → đẩy lỗi lên caller xử lý
        if (error) throw error

        // trả session + user info
        return data
    },

    /**
     * Đăng nhập user bằng email/password
     */
    async login({ email, password }: LoginData) {
        const supabase = createClient()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error

        // trả session + user
        return data
    },

    /**
     * Đăng xuất session hiện tại
     */
    async logout() {
        const supabase = createClient()

        const { error } = await supabase.auth.signOut()

        if (error) throw error
    },

    /**
     * Lấy user đang đăng nhập
     * - Không throw nếu chưa login → trả null
     */
    async getCurrentUser() {
        const supabase = createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

        return user
    },

    /**
     * Lấy profile từ bảng `profiles`
     * - Thường dùng để fetch dữ liệu mở rộng ngoài auth
     */
    async getProfile(userId: string) {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) throw error

        return data
    },
}
