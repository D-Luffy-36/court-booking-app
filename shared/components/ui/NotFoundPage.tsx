export function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <p className="text-2xl font-semibold mt-4">Page Not Found</p>
                <p className="text-text-secondary mt-2 mb-6">
                    The page you are looking for does not exist.
                </p>
                <button className="btn-primary">
                    Go Home
                </button>
            </div>
        </div>
    );
}