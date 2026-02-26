'use client'

import { useState } from 'react'
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react'

interface Member {
    id: string
    name: string
    email: string
    phone: string
    role: 'user' | 'admin'
    tier: 'Đồng' | 'Bạc' | 'Vàng'
    total: number
    avatarUrl?: string
}

const TIER_CONFIG = {
    'Đồng': { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
    'Bạc': { bg: 'bg-slate-400/10', text: 'text-slate-300', border: 'border-slate-400/20' },
    'Vàng': { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20' },
}

export function UsersTable({ users }: { users: Member[] }) {
    if (users.length === 0) return null

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Người dùng</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 hidden sm:table-cell">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 hidden md:table-cell text-right">Tổng chi tiêu</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {users.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function UserRow({ user }: { user: Member }) {
    const tier = TIER_CONFIG[user.tier]

    return (
        <tr className="group transition-all duration-200 hover:bg-zinc-800/40">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                            alt={user.name}
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-zinc-800 transition-transform group-hover:scale-105"
                        />
                        {user.role === 'admin' && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-900" title="Admin" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                            {user.name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-tight ${tier.bg} ${tier.text} ${tier.border}`}>
                                {user.tier}
                            </span>
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                <span className="text-sm text-zinc-400 group-hover:text-zinc-300">{user.email}</span>
            </td>

            <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-right font-mono text-sm text-zinc-300">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(user.total)}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-right">
                {/* Action Buttons - Chỉ hiện rõ khi hover row */}
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <ActionButton icon={<Eye className="w-4 h-4" />} label="Xem" color="hover:text-blue-400" />
                    <ActionButton icon={<Pencil className="w-4 h-4" />} label="Sửa" color="hover:text-emerald-400" />
                    <div className="w-px h-4 bg-zinc-700 mx-1" />
                    <ActionButton icon={<Trash2 className="w-4 h-4" />} label="Xóa" color="hover:text-red-400" />
                </div>
            </td>
        </tr>
    )
}

function ActionButton({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
    return (
        <button
            title={label}
            className={`p-2 rounded-lg text-zinc-500 transition-all duration-200 hover:bg-zinc-700/50 ${color}`}
        >
            {icon}
        </button>
    )
}