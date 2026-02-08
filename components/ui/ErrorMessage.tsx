/* =========================
   4. Error Message
========================= */
export function ErrorMessage({
    message,
    onRetry,
}: {
    message: string;
    onRetry?: () => void;
}) {
    return (
        <div className="error-message">
            <svg
                className="w-5 h-5 text-error flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                />
            </svg>

            <div className="flex-1">
                <p>{message}</p>
            </div>

            {onRetry && (
                <button onClick={onRetry} className="btn-primary text-sm">
                    Retry
                </button>
            )}
        </div>
    );
}
