import React from 'react'
import { fetchBookingsServer } from 'features/bookings/services/fetch'
import BookingTableWrapper from 'features/bookings/components/BookingTableWrapper'

export default async function Page() {
    // Server-side fetch (could be replaced with Supabase server client)
    const bookings = await fetchBookingsServer()

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* BookingTableWrapper is a client component that handles dynamic import */}
            {/* Pass bookings data as prop */}
            <BookingTableWrapper bookings={bookings} loading={false} />
        </div>
    )
}
