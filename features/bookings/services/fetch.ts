import { Booking, BookingStatusType } from '../../bookings/types'

// Mock data kept here for feature service (could be swapped with supabase server client)
export const mockBookings: Booking[] = [
    { id: 'BK-001', customerName: 'Nguyễn Văn A', createdAt: '2026-02-25T10:12:00Z', time: '14:30', date: '2026-05-24', service: 'Sân chính - 60 phút', amount: 350000, status: 'pending' },
    { id: 'BK-002', customerName: 'Trần Thị B', createdAt: '2026-02-26T12:30:00Z', time: '09:00', date: '2026-05-25', service: 'Sân phụ - 30 phút', amount: 150000, status: 'confirmed' },
    { id: 'BK-003', customerName: 'Lê Văn C', createdAt: '2026-02-27T08:00:00Z', time: '18:00', date: '2026-05-26', service: 'Sân chính - 90 phút', amount: 500000, status: 'completed' },
    { id: 'BK-004', customerName: 'Phạm D', createdAt: '2026-02-28T14:00:00Z', time: '20:00', date: '2026-05-27', service: 'Sân phụ - 60 phút', amount: 300000, status: 'cancelled' },
    { id: 'BK-005', customerName: 'Hoàng E', createdAt: '2026-03-01T09:30:00Z', time: '07:00', date: '2026-05-28', service: 'Sân chính - 60 phút', amount: 350000, status: 'confirmed' },
    { id: 'BK-006', customerName: 'Vũ F', createdAt: '2026-03-02T13:15:00Z', time: '16:00', date: '2026-05-29', service: 'Sân tập - 45 phút', amount: 200000, status: 'pending' }
]

export async function fetchBookingsMock(delay = 600): Promise<Booking[]> {
    await new Promise((res) => setTimeout(res, delay))
    return mockBookings
}

// placeholder for a real server-side supabase fetch
export async function fetchBookingsServer(): Promise<Booking[]> {
    // here you would use your Supabase server client, e.g. serverSupabaseClient().from('bookings').select('*')
    return fetchBookingsMock(300)
}
