"use client"

import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react'

interface ActionButtonsProps {
    id: string
    onView?: () => void
    onEdit?: () => void
    onDelete?: () => void
}

export default function ActionButtons({ id, onView, onEdit, onDelete }: ActionButtonsProps) {
    // define actions array for easy management/overflow
    const actions = [
        { icon: <Eye size={16} />, label: 'Xem chi tiết', onClick: onView, hoverClasses: 'hover:bg-white hover:text-white hover:border-white' },
        { icon: <Edit size={16} />, label: 'Chỉnh sửa', onClick: onEdit, hoverClasses: 'hover:bg-emerald-600 hover:text-white hover:border-emerald-600' },
        { icon: <Trash2 size={16} />, label: 'Xóa', onClick: onDelete, hoverClasses: 'hover:bg-red-600 hover:text-white hover:border-red-600' }
    ]

    const visible = actions.slice(0, 3)
    const extras = actions.length > 3 ? actions.slice(3) : []

    return (
        <div className="flex items-center gap-2 relative">
            {visible.map((a, i) => (
                <button
                    key={i}
                    onClick={a.onClick}
                    title={a.label}
                    type="button"
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-all duration-200 active:scale-95 md:opacity-70 hover:opacity-100 ${a.hoverClasses}`}
                >
                    {a.icon}
                </button>
            ))}

            {extras.length > 0 && (
                <div className="relative group">
                    <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-all duration-200 active:scale-95 md:opacity-70 hover:opacity-100"
                        title="Thêm"
                        type="button"
                    >
                        <MoreHorizontal size={16} />
                    </button>
                    <div className="absolute right-0 top-full mt-1 hidden flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-900/80 p-1 shadow-lg group-hover:flex">
                        {extras.map((a, i) => (
                            <button
                                key={i}
                                onClick={a.onClick}
                                title={a.label}
                                type="button"
                                className={`inline-flex h-9 w-full items-center justify-start gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 px-2 transition-all duration-200 active:scale-95 ${a.hoverClasses}`}
                            >
                                {a.icon}
                                <span className="text-sm">{a.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
