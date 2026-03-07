"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RawBooking } from '../../bookings/types'
import { X, Loader2, AlertCircle, User, MapPin, Calendar, CreditCard, FileText, Info } from 'lucide-react'
import { createClient } from '../../../lib/supabase/client'

interface BookingDetailDrawerProps {
    isOpen: boolean
    bookingId: string | null
    onClose: () => void
}

export default function BookingDetailDrawer({ isOpen, bookingId, onClose }: BookingDetailDrawerProps) {
    const [booking, setBooking] = useState<RawBooking | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        if (isOpen && bookingId) {
            setLoading(true)
            setError(null)
            setBooking(null)

            const fetchBooking = async () => {
                const { data, error } = await supabase.from('bookings').select('*').eq('id', bookingId).single()

                if (error) setError(error.message)
                else setBooking(data as RawBooking)
                setLoading(false)
            }
            fetchBooking()
        } else {
            // Reset state khi đóng drawer
            setBooking(null)
            setLoading(false)
            setError(null)
        }
    }, [isOpen, bookingId])

    return (
        <AnimatePresence>
            {isOpen && bookingId && (
                <>
                    {/* Backdrop mờ phía sau */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Drawer chính */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 text-zinc-100 shadow-2xl z-[60] flex flex-col border-l border-zinc-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                            <div>
                                <h2 className="text-xl font-semibold text-white">Chi tiết đặt sân</h2>
                                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Mã đơn: #{bookingId.slice(-6)}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <X size={20} className="text-zinc-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {loading && (
                                <div className="flex flex-col items-center justify-center py-12 text-zinc-500 space-y-3">
                                    <Loader2 className="animate-spin" size={24} />
                                    <p className="text-sm">Đang tải dữ liệu...</p>
                                </div>
                            )}

                            {error && (
                                <div className="flex flex-col items-center justify-center py-12 text-red-400 space-y-3">
                                    <AlertCircle size={24} />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            {!loading && !error && booking && (
                                <>
                                    {/* Status Banner */}
                                    <div className={`p-4 rounded-lg border flex items-center justify-between ${booking.status === 'confirmed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                        booking.status === 'cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                            'bg-amber-500/10 border-amber-500/20 text-amber-500'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <Info size={20} />
                                            <div>
                                                <div className="font-semibold text-sm">Trạng thái đơn</div>
                                                <div className="text-xs opacity-80">
                                                    {booking.status === 'confirmed' ? 'Đã xác nhận' :
                                                        booking.status === 'cancelled' ? 'Đã hủy' : 'Đang chờ xử lý'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs font-mono bg-black/20 px-2 py-1 rounded">
                                            {booking.status?.toUpperCase()}
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <section className="space-y-3">
                                        <h3 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <User size={16} /> Thông tin khách hàng
                                        </h3>
                                        <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-zinc-500 text-sm">Họ và tên</span>
                                                <span className="font-medium text-zinc-200">{booking.captured_user_name || 'Khách vãng lai'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-zinc-500 text-sm">Số điện thoại</span>
                                                <span className="font-medium text-zinc-200 font-mono">{booking.captured_user_phone || '---'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-zinc-500 text-sm">Nguồn đặt</span>
                                                <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 capitalize">{booking.booking_source}</span>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Booking Details */}
                                    <section className="space-y-3">
                                        <h3 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <Calendar size={16} /> Chi tiết đặt sân
                                        </h3>
                                        <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4 space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-zinc-800 p-2 rounded-lg text-zinc-400">
                                                    <MapPin size={18} />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-500">Sân bóng</div>
                                                    <div className="font-medium text-zinc-200">{booking.captured_court_name}</div>
                                                </div>
                                            </div>
                                            <div className="h-px bg-zinc-800/50" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-xs text-zinc-500 mb-1">Ngày đá</div>
                                                    <div className="font-medium text-zinc-200 text-sm">
                                                        {new Date(booking.start_time).toLocaleDateString('vi-VN')}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-500 mb-1">Khung giờ</div>
                                                    <div className="font-medium text-zinc-200 text-sm">
                                                        {new Date(booking.start_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.end_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Payment Info */}
                                    <section className="space-y-3">
                                        <h3 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                            <CreditCard size={16} /> Thanh toán
                                        </h3>
                                        <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-zinc-500 text-sm">Trạng thái</span>
                                                <span className={`text-xs px-2 py-0.5 rounded font-medium ${booking.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'
                                                    }`}>
                                                    {booking.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-zinc-500 text-sm">Phương thức</span>
                                                <span className="text-sm text-zinc-300 capitalize">{booking.payment_method || '---'}</span>
                                            </div>
                                            <div className="h-px bg-zinc-800/50 my-2" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-zinc-200 font-medium">Tổng tiền</span>
                                                <span className="text-lg font-bold text-emerald-500">
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(booking.total_price))}
                                                </span>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Notes */}
                                    {(booking.notes || booking.internal_notes) && (
                                        <section className="space-y-3">
                                            <h3 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                                <FileText size={16} /> Ghi chú
                                            </h3>
                                            <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4 space-y-3 text-sm">
                                                {booking.notes && (
                                                    <div>
                                                        <span className="text-zinc-500 text-xs block mb-1">Ghi chú của khách:</span>
                                                        <p className="text-zinc-300">{booking.notes}</p>
                                                    </div>
                                                )}
                                                {booking.internal_notes && (
                                                    <div className="pt-2 border-t border-zinc-800/50">
                                                        <span className="text-amber-500/80 text-xs block mb-1">Ghi chú nội bộ:</span>
                                                        <p className="text-zinc-300">{booking.internal_notes}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </section>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl transition-all active:scale-[0.98]"
                            >
                                Đóng
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}