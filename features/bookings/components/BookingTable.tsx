"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Calendar, Clock, SlidersHorizontal } from 'lucide-react'
import BookingStatus from './BookingStatus'
import ActionButtons from './ActionButtons'
import { Booking } from '../../bookings/types'
import SkeletonRow from './SkeletonRow'
import { TABS } from '../../bookings/constants/status'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.05 }
    }
}

const rowVariants = {
    hidden: { opacity: 0, y: 6 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: 'easeInOut' }
    },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15 } }
}

export default function BookingTable({ bookings, loading }: { bookings: Booking[]; loading?: boolean }) {
    const [activeTab, setActiveTab] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredBookings = bookings.filter(b => {
        const matchesTab = activeTab === 'all' ? true : b.status === activeTab
        const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesTab && matchesSearch
    })

    return (
        <div className="flex flex-col gap-10 p-6 font-sans">
            {/* ── Header ── */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-500">
                        Quản lý hệ thống
                    </p>
                    <h1 className="text-[2rem] font-bold leading-none tracking-tight text-white">
                        Lịch đặt chỗ
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        Theo dõi và xử lý các đơn đặt sân trong hệ thống.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    {/* Search */}
                    <div className="relative group">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-400 transition-colors duration-200"
                            size={14}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Tìm khách hàng..."
                            className="h-9 w-52 rounded-lg border border-zinc-800 bg-zinc-900 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200"
                        />
                    </div>

                    {/* Filter button */}
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-all duration-200 active:scale-95">
                        <SlidersHorizontal size={14} />
                    </button>

                    {/* Create button */}
                    <button className="relative flex h-9 items-center gap-2 overflow-hidden rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-500 active:scale-95 shadow-lg shadow-emerald-900/40">
                        <Plus size={15} />
                        Tạo mới
                    </button>
                </div>
            </div>

            {/* ── Main Card ── */}
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">

                {/* Tabs + Count Bar */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 pt-3 pb-0 bg-zinc-900/30">
                    <nav className="flex gap-0.5">
                        {TABS.map((tab) => {
                            const count = tab.key === 'all'
                                ? bookings.length
                                : bookings.filter(b => b.status === tab.key).length
                            const isActive = activeTab === tab.key

                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'text-white'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                        }`}
                                >
                                    {tab.label}
                                    {count > 0 && (
                                        <span className={`ml-2 inline-flex h-4.5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums transition-all ${isActive
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-zinc-800 text-zinc-500'
                                            }`}>
                                            {count}
                                        </span>
                                    )}
                                    {/* Active underline */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="tab-underline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t-full"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            )
                        })}
                    </nav>

                    <span className="mb-1 text-[11px] text-zinc-600 font-medium pr-1">
                        {filteredBookings.length} kết quả
                    </span>
                </div>

                {/* ── Table Header ── */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 border-b border-zinc-800/50 bg-zinc-900/10">
                    <div className="col-span-4 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">Khách hàng</div>
                    <div className="col-span-3 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">Lịch trình</div>
                    <div className="col-span-2 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">Thanh toán</div>
                    <div className="col-span-2 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">Trạng thái</div>
                </div>

                {/* ── Table Body ── */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="divide-y divide-zinc-800/40">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="px-6 py-5">
                                    <SkeletonRow />
                                </div>
                            ))}
                        </div>
                    ) : filteredBookings.length > 0 ? (
                        <motion.div
                            key={activeTab + searchQuery}
                            initial="hidden"
                            animate="show"
                            variants={container}
                            className="divide-y divide-zinc-800/40"
                        >
                            {filteredBookings.map((booking) => (
                                <motion.div
                                    key={booking.id}
                                    variants={rowVariants}
                                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-5 items-center relative transition-colors duration-200 bg-zinc-900/20 hover:bg-zinc-900/40 rounded-lg"
                                >
                                    {/* Hover accent line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-r-full" />

                                    {/* ── Customer Info ── */}
                                    <div className="col-span-1 md:col-span-4 flex items-center gap-4 min-w-0">
                                        {/* Avatar */}
                                        <div className="relative shrink-0">
                                            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-linear-to-br from-zinc-700 to-zinc-800 border border-zinc-700/60 text-sm font-bold text-white shadow-inner">
                                                {booking.customerName.charAt(0)}
                                            </div>
                                            {/* Online dot placeholder */}
                                            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-emerald-500" />
                                        </div>

                                        <div className="flex flex-col min-w-0">
                                            <span className="font-semibold text-[13.5px] text-zinc-100 truncate group-hover:text-white transition-colors">
                                                {booking.customerName}
                                            </span>
                                            <span className="text-[11px] font-mono text-zinc-600 tracking-tight">
                                                #{booking.id.split('-').pop()?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── Schedule Info ── */}
                                    <div className="col-span-1 md:col-span-3 flex flex-col gap-2 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Clock size={13} className="text-zinc-600 shrink-0" />
                                            <span className="text-[13px] font-semibold text-zinc-200 truncate">{booking.time}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 font-medium shrink-0">
                                                {booking.service.split('-').pop()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={12} className="text-zinc-700 shrink-0" />
                                            <span className="text-[12px] text-zinc-500">
                                                {new Date(booking.date).toLocaleDateString('vi-VN', {
                                                    weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── Price Info ── */}
                                    <div className="col-span-1 md:col-span-2 min-w-0">
                                        <div className="text-[14px] font-bold text-white tabular-nums tracking-tight">
                                            {booking.amount.toLocaleString('vi-VN')}
                                            <span className="text-emerald-500 font-semibold">₫</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <div className="h-1 w-1 rounded-full bg-emerald-500" />
                                            <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-wide">
                                                Đã thanh toán
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── Status Info ── */}
                                    <div className="col-span-1 md:col-span-2 flex items-center justify-center min-w-0">
                                        <BookingStatus status={booking.status} />
                                    </div>


                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center py-24 text-zinc-600"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50">
                                <Search size={24} className="opacity-40" />
                            </div>
                            <p className="text-sm font-medium text-zinc-500">Không tìm thấy kết quả nào</p>
                            <p className="mt-1 text-xs text-zinc-700">Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Footer ── */}
                {filteredBookings.length > 0 && !loading && (
                    <div className="flex items-center justify-between border-t border-zinc-800/60 bg-zinc-900/20 px-6 py-3">
                        <span className="text-xs text-zinc-600">
                            Hiển thị <span className="text-zinc-400 font-medium">{filteredBookings.length}</span> / {bookings.length} đơn
                        </span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3].map(p => (
                                <button
                                    key={p}
                                    className={`h-7 w-7 rounded-md text-xs font-medium transition-all ${p === 1
                                        ? 'bg-zinc-800 text-white'
                                        : 'text-zinc-600 hover:text-zinc-400'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}