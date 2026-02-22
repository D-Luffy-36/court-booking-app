import { createClient } from '@/lib/supabase/server' // Đảm bảo đúng alias @ hoặc đường dẫn tương đối
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // Lấy path cần redirect tới, mặc định là dashboard hoặc trang chủ
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()

        // Đổi code lấy session. 
        // Quan trọng: Supabase SSR sẽ tự động dùng setAll() bạn viết trong server.ts 
        // để lưu cookie vào trình duyệt tại bước này.
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Sử dụng URL object để tạo link redirect an toàn hơn
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // Nếu không có code hoặc lỗi, đẩy về trang login kèm thông báo lỗi
    return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}