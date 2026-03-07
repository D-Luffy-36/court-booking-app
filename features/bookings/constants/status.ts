export const TABS = [
    { key: 'all', label: 'Tất cả' },
    { key: 'pending', label: 'Đang chờ' },
    { key: 'confirmed', label: 'Đã xác nhận' },
    { key: 'completed', label: 'Đã hoàn thành' }
]

export const STATUS_COLORS = {
    pending: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    confirmed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    cancelled: { bg: 'bg-zinc-500/10', text: 'text-zinc-400' },
    completed: { bg: 'bg-indigo-500/10', text: 'text-indigo-400' }
} as const
