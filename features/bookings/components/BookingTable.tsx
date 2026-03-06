"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import BookingStatus from './BookingStatus'
import ActionMenu from './ActionMenu'
import { Booking, BookingUI } from '../../bookings/types'
import SkeletonRow from './SkeletonRow'
import { toast } from 'sonner'

// new sub-components
import BookingTableHeader from './BookingTableHeader'
import TableTabs from './TableTabs'
import TableHeader from './TableHeader'
import BookingRow from './BookingRow'
import BookingDetailDrawer from './BookingDetailDrawer'

export default function BookingTable({ bookings, loading }: { bookings: BookingUI[]; loading?: boolean }) {
    const [activeTab, setActiveTab] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [actionType, setActionType] = useState<string | null>(null)

    const filteredBookings = bookings.filter(b => {
        const matchesTab = activeTab === 'all' ? true : b.status === activeTab
        const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesTab && matchesSearch
    })

    // ... inside BookingTable component

    // Giả lập hàm gọi API để cập nhật trạng thái
    const updateBookingStatus = (bookingId: string, newStatus: string): Promise<void> => {
        console.log(`Updating booking ${bookingId} to status ${newStatus}`);
        return new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập độ trễ mạng
    }

    const handleAction = (type: string, booking: Booking) => {
        setSelectedBooking(booking)
        setActionType(type)

        if (type === 'VIEW') {
            setIsDrawerOpen(true)
            return
        }

        // actions that need confirmation
        if (['CANCEL', 'DELETE', 'RESTORE'].includes(type)) {
            setIsConfirmModalOpen(true)
        } else {
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
            <BookingTableHeader
                count={bookings.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onCreate={() => console.log('create new')}
            />
            {/* ── Content Card ── */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">

                {/* Tabs Navigation */}
                <TableTabs activeTab={activeTab} onChange={setActiveTab} />

                {/* ── Table Header ── */}
                <TableHeader />

                {/* ── Table Body ── */}
                <div className="divide-y divide-zinc-800">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <BookingRow key={booking.id} booking={booking} onAction={handleAction} />
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

            <BookingDetailDrawer
                isOpen={isDrawerOpen && actionType === 'VIEW'}
                bookingId={selectedBooking?.id || null}
                onClose={() => {
                    setIsDrawerOpen(false)
                    setSelectedBooking(null)
                }}
            />
        </div>
    )
}