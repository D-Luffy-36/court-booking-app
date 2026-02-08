/* =========================
   7. Skeleton Loader
========================= */
export function SkeletonLoader() {
    return (
        <div className="card space-y-4">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
        </div>
    );
}