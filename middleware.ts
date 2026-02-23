// d:\Projects\arena-manager\court-booking-app\middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    // Tạo một response và supabase client trên mỗi request.
    // Điều này rất quan trọng để session được cập nhật đúng cách.
    let res = NextResponse.next({
        request: {
            headers: req.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    // Nếu cookie được set, cập nhật cả request và response.
                    req.cookies.set({ name, value, ...options })
                    res = NextResponse.next({
                        request: {
                            headers: req.headers,
                        },
                    })
                    res.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    // Nếu cookie bị xóa, cập nhật cả request và response.
                    req.cookies.set({ name, value: '', ...options })
                    res = NextResponse.next({
                        request: {
                            headers: req.headers,
                        },
                    })
                    res.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    // Luôn gọi getUser() để làm mới session nếu nó đã hết hạn.
    const { data: { user } } = await supabase.auth.getUser()
    const { pathname } = req.nextUrl

    // QUY TẮC 1: Bảo vệ các trang trong /dashboard.
    // Nếu người dùng chưa đăng nhập và cố gắng truy cập /dashboard, chuyển hướng về /login.
    if (!user && pathname.startsWith('/dashboard')) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('next', pathname) // Lưu lại trang họ muốn đến để redirect lại sau khi login.
        return NextResponse.redirect(url)
    }

    // QUY TẮC 2: Xử lý cho người dùng đã đăng nhập.
    if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()

        // QUY TẮC 3: Nếu là admin và truy cập trang chủ, tự động chuyển vào dashboard.
        if (profile?.role === 'admin' && pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        // QUY TẮC 4: Bảo vệ trang Admin (Role Guard)
        // Nếu user thường (không phải admin) mà cố vào /dashboard -> đá về trang chủ
        if (pathname.startsWith('/dashboard') && profile?.role !== 'admin') {
            // Chuyển hướng đến trang báo lỗi không có quyền truy cập
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }
    }

    // Nếu không có quy tắc nào khớp, cho phép request đi tiếp.
    return res
}

// Cấu hình matcher để middleware chỉ chạy trên các đường dẫn cần thiết,
// bỏ qua các file tĩnh để tối ưu hiệu năng.
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}