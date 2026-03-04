export type BookingStatusType = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export type Booking = {
    id: string
    customerName: string
    createdAt: string
    time: string
    date: string
    service: string
    amount: number
    status: BookingStatusType
}
