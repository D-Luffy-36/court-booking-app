import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // getAll giúp lấy toàn bộ cookies để xác thực session
                getAll() {
                    return cookieStore.getAll()
                },
                // setAll giúp ghi đè hoặc cập nhật nhiều cookie cùng lúc
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // Lỗi này thường xảy ra khi gọi setAll từ một Server Component
                        // Next.js không cho phép set cookie khi đang render HTML.
                        // Việc set cookie thực tế đã được xử lý bởi Middleware rồi.
                    }
                },
            },
        }
    )
}