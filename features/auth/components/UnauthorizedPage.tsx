import Link from 'next/link'

export function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <div className="max-w-md w-full card shadow-2xl p-8 text-center">
                <div className="text-error text-5xl mb-4">
                    {/* Lock Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-text-primary">Không có quyền truy cập (403)</h1>
                <p className="mt-2 text-text-secondary">
                    Rất tiếc, tài khoản của bạn không có quyền để xem trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là một sự nhầm lẫn.
                </p>
                <Link href="/" className="mt-8 inline-block btn-primary shadow-lg shadow-primary/20 w-full">
                    Về trang chủ
                </Link>
            </div>
        </div>
    )
}
