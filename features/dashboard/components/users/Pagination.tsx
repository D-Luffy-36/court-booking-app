'use client'

export function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
    return (
        <div className="flex items-center justify-end px-6 py-4">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-sm text-zinc-400 disabled:opacity-50"
                aria-label="Previous page"
            >
                Prev
            </button>
            <span className="px-2 text-sm text-zinc-300">
                {page} / {totalPages}
            </span>
            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm text-zinc-400 disabled:opacity-50"
                aria-label="Next page"
            >
                Next
            </button>
        </div>
    )
}