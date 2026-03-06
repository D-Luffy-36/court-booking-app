"use client"
import React from 'react'
import { Search, Plus } from 'lucide-react'

interface BookingTableHeaderProps {
    count: number
    searchQuery: string
    onSearchChange: (value: string) => void
    onCreate?: () => void
}

export default function BookingTableHeader({
    count,
    searchQuery,
    onSearchChange,
    onCreate,
}: BookingTableHeaderProps) {
    return (
        <div className="flex flex-col mb-8 gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-white tracking-tight">Lịch đặt chỗ</h1>
                <p className="text-sm text-zinc-500">Quản lý {count} đơn đặt sân trong hệ thống</p>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input
                        type="text"
                        placeholder="Tìm tên khách hàng..."
                        value={searchQuery}
                        onChange={e => onSearchChange(e.target.value)}
                        className="h-10 w-64 rounded-md border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm outline-none focus:border-emerald-500/50 transition-colors"
                    />
                </div>
                <button
                    onClick={onCreate}
                    className="flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
                >
                    <Plus size={18} />
                    Tạo mới
                </button>
            </div>
        </div>
    )
}