"use client"

import dynamic from 'next/dynamic'
import SkeletonRow from './SkeletonRow'
import { Booking } from '../types'
import { Suspense } from 'react'

const BookingTable = dynamic(() => import('./BookingTable'), { ssr: false })

export default function BookingTableWrapper({ bookings, loading }: { bookings: Booking[]; loading?: boolean }) {
    return (
        <BookingTable bookings={bookings} loading={loading} />
    )
}
