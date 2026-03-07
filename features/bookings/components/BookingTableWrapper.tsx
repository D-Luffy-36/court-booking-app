"use client"

import dynamic from 'next/dynamic'
import SkeletonRow from './SkeletonRow'
import { RawBooking, BookingUI } from '../types'
import { bookingMapper } from '../utils/booking.mapper'

const BookingTable = dynamic(() => import('./BookingTable'), { ssr: false })

export default function BookingTableWrapper({ bookings, loading }: { bookings: RawBooking[]; loading?: boolean }) {
    // convert raw data to UI-friendly form on client
    const uiBookings: BookingUI[] = bookings.map(bookingMapper.toUI)

    return (
        <BookingTable bookings={uiBookings} loading={loading} />
    )
}
