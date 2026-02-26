'use client'

import { SearchCommandPalette } from '../SearchCommandPalette'
import { PlusCircle } from 'lucide-react'

export function UsersPageHeader({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="flex items-center justify-between py-4 px-6">
            <h1 className="text-2xl font-bold text-zinc-100">Khách hàng</h1>
            <div className="flex items-center gap-4">
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
                >
                    <PlusCircle className="w-5 h-5" />
                    Thêm khách hàng
                </button>
            </div>
        </div>
    )
}