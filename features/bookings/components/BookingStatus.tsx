import React from 'react'
import { BookingStatusType } from '../../bookings/types'
import { STATUS_COLORS } from '../../bookings/constants/status'

type Props = { status: BookingStatusType }

export default function BookingStatus({ status }: Props) {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium'
  const colors = STATUS_COLORS[status]
  return (
    <span className={`${base} ${colors.bg} ${colors.text} border border-zinc-700/30`} aria-label={status}>
      {status === 'pending' && 'Đang chờ'}
      {status === 'confirmed' && 'Đã xác nhận'}
      {status === 'cancelled' && 'Đã hủy'}
      {status === 'completed' && 'Hoàn thành'}
    </span>
  )
}
