// middleware.ts (nằm ở thư mục gốc)
import { NextRequest } from 'next/server'
import { withAuthGuard } from './middlewares/auth-guard'

export default async function middleware(req: NextRequest) {
    // Bạn có thể chạy nhiều logic ở đây nếu muốn
    return await withAuthGuard(req)
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}