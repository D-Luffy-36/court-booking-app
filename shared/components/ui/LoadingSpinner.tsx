/* =========================
   1. Loading Spinner
========================= */
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClass = {
        sm: 'spinner-sm',
        md: 'spinner-md',
        lg: 'spinner-lg',
    }[size];

    return <div className={`spinner ${sizeClass}`} />;
}