"use client"
import React from 'react'
import { Calendar, Clock } from 'lucide-react'
import BookingStatus from './BookingStatus'
import ActionMenu from './ActionMenu'
import { BookingUI } from '../../bookings/types'

interface BookingRowProps {
    booking: BookingUI
    onAction: (type: string, booking: BookingUI) => void
}

export default function BookingRow({ booking, onAction }: BookingRowProps) {
    return (
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
                        {booking.duration.split('-').pop()}
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
                <ActionMenu booking={booking} onAction={onAction} />
            </div>
        </div>
    )
}