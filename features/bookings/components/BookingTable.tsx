"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Calendar, Clock, SlidersHorizontal, MoreHorizontal } from 'lucide-react'
import BookingStatus from './BookingStatus'
import ActionButtons from './ActionButtons'
import ActionMenu from './ActionMenu'
import { Booking, BookingUI } from '../../bookings/types'
import SkeletonRow from './SkeletonRow'
import { TABS } from '../../bookings/constants/status'
import { toast } from 'sonner'

export default function BookingTable({ bookings, loading }: { bookings: BookingUI[]; loading?: boolean }) {
    const [activeTab, setActiveTab] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredBookings = bookings.filter(b => {
        const matchesTab = activeTab === 'all' ? true : b.status === activeTab
        const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesTab && matchesSearch
    })

    // ... inside BookingTable component
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [actionType, setActionType] = useState<string | null>(null)

    // Giả lập hàm gọi API để cập nhật trạng thái
    const updateBookingStatus = (bookingId: string, newStatus: string): Promise<void> => {
        console.log(`Updating booking ${bookingId} to status ${newStatus}`);
        return new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập độ trễ mạng
    }

    const handleAction = (type: string, booking: Booking) => {
        setSelectedBooking(booking)
        setActionType(type)

        // Nếu là hành động nguy hiểm hoặc cần xác nhận
        if (['CANCEL', 'DELETE', 'RESTORE'].includes(type)) {
            setIsConfirmModalOpen(true)
        } else {
            // Nếu là hành động thực thi ngay (ví dụ: VIEW, PRINT)
            executeAction(type, booking)
        }
    }

    const executeAction = async (type: string, booking: Booking) => {
        const loadingToast = toast.loading('Đang xử lý...')

        try {
            switch (type) {
                case 'CONFIRM':
                    // Giả lập gọi API
                    await updateBookingStatus(booking.id, 'confirmed')
                    toast.success(`Đã xác nhận đơn của ${booking.customerName}`, { id: loadingToast })
                    break;

                case 'CANCEL':
                    await updateBookingStatus(booking.id, 'cancelled')
                    toast.error(`Đã hủy đơn của ${booking.customerName}`, { id: loadingToast })
                    break;

                case 'RESTORE':
                    await updateBookingStatus(booking.id, 'pending') // Phục hồi về trạng thái chờ
                    toast.success(`Đã phục hồi đơn của ${booking.customerName}`, { id: loadingToast })
                    break;

                case 'CHECK_IN':
                    await updateBookingStatus(booking.id, 'completed') // Chuyển sang completed sau khi chơi xong
                    toast.success('Check-in thành công', { id: loadingToast })
                    break;

                case 'VIEW':
                    // Trong thực tế, đây sẽ là nơi mở Drawer hoặc Modal chi tiết
                    console.log('Xem chi tiết:', booking)
                    toast.info('Mở modal xem chi tiết...', { id: loadingToast })
                    break;

                case 'EDIT':
                    console.log('Chỉnh sửa:', booking)
                    toast.info('Mở modal chỉnh sửa...', { id: loadingToast })
                    break;

                case 'RESCHEDULE':
                    console.log('Đổi lịch:', booking)
                    toast.info('Mở modal đổi lịch...', { id: loadingToast })
                    break;

                case 'PRINT':
                    console.log('In phiếu đặt sân:', booking)
                    toast.info('Đang chuẩn bị in phiếu đặt sân...', { id: loadingToast })
                    // window.print(); // Ví dụ gọi hàm in của trình duyệt
                    break;

                case 'PRINT_INVOICE':
                    console.log('In hóa đơn:', booking)
                    toast.info('Đang chuẩn bị in hóa đơn...', { id: loadingToast })
                    // window.print();
                    break;

                default:
                    console.warn(`Hành động chưa được xử lý: ${type}`)
                    toast.dismiss(loadingToast)
                    break;
            }

            // RE-VALIDATE: Gọi lại hàm fetch danh sách từ server để đồng bộ UI
            // refreshData(); 

        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại', { id: loadingToast })
        } finally {
            setIsConfirmModalOpen(false)
            setSelectedBooking(null)
        }
    }

    return (
        <div className="w-full p-6 text-zinc-200">
            {/* ── Top Bar: Title & Actions ── */}
            <div className="flex flex-col mb-8 gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Lịch đặt chỗ</h1>
                    <p className="text-sm text-zinc-500">Quản lý {bookings.length} đơn đặt sân trong hệ thống</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            placeholder="Tìm tên khách hàng..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="h-10 w-64 rounded-md border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm outline-none focus:border-emerald-500/50 transition-colors"
                        />
                    </div>
                    <button className="flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
                        <Plus size={18} />
                        Tạo mới
                    </button>
                </div>
            </div>

            {/* ── Content Card ── */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">

                {/* Tabs Navigation */}
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4">
                    <nav className="flex">
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.key ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.key && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* ── Table Header ── */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-zinc-800 bg-zinc-900/30 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    <div className="col-span-4">Khách hàng</div>
                    <div className="col-span-3">Thời gian & Dịch vụ</div>
                    <div className="col-span-2">Thanh toán</div>
                    <div className="col-span-2">Trạng thái</div>
                    <div className="col-span-1 text-right">Thao tác</div>
                </div>

                {/* ── Table Body ── */}
                <div className="divide-y divide-zinc-800">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-900/40 transition-colors group"
                                >
                                    {/* Customer */}
                                    <div className="col-span-4 flex items-center gap-3">
                                        <div className="h-9 w-9 flex shrink-0 items-center justify-center rounded bg-zinc-800 text-xs font-bold text-zinc-400">
                                            {booking.customerName.charAt(0)}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-medium text-zinc-100 truncate">{booking.customerName}</span>
                                            <span className="text-[11px] text-zinc-500 font-mono uppercase">ID: {booking.id.split('-').pop()}</span>
                                        </div>
                                    </div>

                                    {/* Schedule */}
                                    <div className="col-span-3 flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm text-zinc-200">
                                            <Clock size={14} className="text-zinc-500" />
                                            <span>{booking.time}</span>
                                            <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 border border-zinc-700">
                                                {booking.service.split('-').pop()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <Calendar size={13} />
                                            <span>{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2">
                                        <div className="text-sm font-semibold text-white">
                                            {booking.amount.toLocaleString('vi-VN')}₫
                                        </div>
                                        <span className="text-[10px] text-emerald-500/80 font-medium">Đã nhận</span>
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2">
                                        <BookingStatus status={booking.status} />
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-1 text-right">
                                        <ActionMenu booking={booking} onAction={handleAction} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center text-zinc-600 text-sm">
                                Không tìm thấy dữ liệu phù hợp.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Footer ── */}
                <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4 bg-zinc-900/20">
                    <p className="text-xs text-zinc-500">
                        Hiển thị <span className="font-medium text-zinc-300">{filteredBookings.length}</span> trên {bookings.length} kết quả
                    </p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs border border-zinc-800 rounded hover:bg-zinc-800 disabled:opacity-50">Trước</button>
                        <button className="px-3 py-1 text-xs border border-zinc-800 rounded bg-zinc-800">1</button>
                        <button className="px-3 py-1 text-xs border border-zinc-800 rounded hover:bg-zinc-800">Sau</button>
                    </div>
                </div>
            </div>
        </div>
    )
}