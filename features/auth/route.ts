import { createClient } from '@/lib/supabase/server' // Đảm bảo đúng alias @ hoặc đường dẫn tương đối
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const supabase = await createClient()

        // Đổi code lấy session. 
        // Quan trọng: Supabase SSR sẽ tự động dùng setAll() bạn viết trong server.ts 
        // để lưu cookie vào trình duyệt tại bước này.
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            const supabase = await createClient();
            // 1. Lấy user id từ session vừa tạo
            const { data: { user } } = await supabase.auth.getUser();

            // 2. Truy vấn role từ bảng profiles (giả sử bạn có bảng này)
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user?.id)
                .single();

            // 3. Điều hướng dựa trên role
            if (profile?.role === 'admin') {
                return NextResponse.redirect(`${origin}/dashboard`);
            }

            // Mặc định hoặc là user thường
            return NextResponse.redirect(`${origin}/`);

        }
    }

    // Nếu không có code hoặc lỗi, đẩy về trang login kèm thông báo lỗi
    return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}