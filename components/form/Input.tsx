/* =========================
   8. Input with Error State
========================= */
export function Input({
    error,
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    label?: string;
}) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-text-primary">
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`input w-full ${error ? 'input-error' : ''}`}
            />

            {error && (
                <p className="text-sm text-error flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}
