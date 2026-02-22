// middlewares/auth-guard.ts
import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function withAuthGuard(req: NextRequest) {
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
                getAll() {
                    return req.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value))
                    res = NextResponse.next({
                        request: req,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        res.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // getUser an toàn hơn getSession ở server vì nó xác thực token thật sự
    const { data: { user } } = await supabase.auth.getUser()

    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')

    if (isDashboardPage && !user) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('next', req.nextUrl.pathname)
        return NextResponse.redirect(url)
    }

    // Nếu mọi thứ ổn, trả về response gốc
    return res
}