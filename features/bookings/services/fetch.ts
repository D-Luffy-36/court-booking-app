import { RawBooking } from '../../bookings/types'

// Mock data kept here for feature service (could be swapped with supabase server client)
export const mockBookings: RawBooking[] = [
    {
        "id": "bce78917-6eaf-44a6-baf0-d56118e6410c",
        "court_id": "a8d6ad3a-a311-4061-97e5-0d28be5922d1",
        "user_id": "48aac409-5806-4b19-a728-908e142b0012",
        "booking_source": "app",
        "captured_user_name": "anPham",
        "captured_user_phone": null,
        "captured_court_name": "Sân 2",
        "start_time": "2026-03-12 11:00:00+00",
        "end_time": "2026-03-12 12:30:00+00",
        "subtotal_price": "0.00",
        "discount_amount": "0.00",
        "total_price": "382759.00",
        "final_amount_paid": "0.00",
        "status": "pending",
        "payment_status": "unpaid",
        "payment_method": null,
        "cancelled_by": null,
        "cancel_reason": null,
        "is_no_show": false,
        "notes": null,
        "internal_notes": null,
        "created_at": "2026-03-02 09:22:49.000336+00",
        "updated_at": "2026-03-02 09:22:49.000336+00"
    },
    {
        "id": "55e50095-9a76-41f0-930e-7f5fa67ebbf0",
        "court_id": "89241cb4-616e-4bb0-8bc5-0321501addab",
        "user_id": "48aac409-5806-4b19-a728-908e142b0012",
        "booking_source": "app",
        "captured_user_name": "anPham",
        "captured_user_phone": null,
        "captured_court_name": "Sân 1",
        "start_time": "2026-03-15 15:00:00+00",
        "end_time": "2026-03-15 16:00:00+00",
        "subtotal_price": "0.00",
        "discount_amount": "0.00",
        "total_price": "122290.00",
        "final_amount_paid": "0.00",
        "status": "pending",
        "payment_status": "unpaid",
        "payment_method": null,
        "cancelled_by": null,
        "cancel_reason": null,
        "is_no_show": false,
        "notes": null,
        "internal_notes": null,
        "created_at": "2026-03-02 09:58:45.210189+00",
        "updated_at": "2026-03-02 09:58:45.210189+00"
    },
    {
        "id": "d955d8bd-23cc-498b-9e26-ae33726ec736",
        "court_id": "89241cb4-616e-4bb0-8bc5-0321501addab",
        "user_id": "b70d64eb-c3e3-4ead-b544-3e1d1dd093d4",
        "booking_source": "app",
        "captured_user_name": "anpham",
        "captured_user_phone": null,
        "captured_court_name": "Sân 1",
        "start_time": "2026-03-14 19:00:00+00",
        "end_time": "2026-03-14 20:00:00+00",
        "subtotal_price": "0.00",
        "discount_amount": "0.00",
        "total_price": "294589.00",
        "final_amount_paid": "0.00",
        "status": "pending",
        "payment_status": "unpaid",
        "payment_method": null,
        "cancelled_by": null,
        "cancel_reason": null,
        "is_no_show": false,
        "notes": null,
        "internal_notes": null,
        "created_at": "2026-03-02 09:58:46.943224+00",
        "updated_at": "2026-03-02 09:58:46.943224+00"
    },
    {
        "id": "b7d522a0-6f75-4f5b-b1ed-2ace54d9b901",
        "court_id": "a8d6ad3a-a311-4061-97e5-0d28be5922d1",
        "user_id": "48aac409-5806-4b19-a728-908e142b0012",
        "booking_source": "app",
        "captured_user_name": "anPham",
        "captured_user_phone": null,
        "captured_court_name": "Sân 2",
        "start_time": "2026-03-05 20:00:00+00",
        "end_time": "2026-03-05 21:00:00+00",
        "subtotal_price": "0.00",
        "discount_amount": "0.00",
        "total_price": "218514.00",
        "final_amount_paid": "0.00",
        "status": "pending",
        "payment_status": "unpaid",
        "payment_method": null,
        "cancelled_by": null,
        "cancel_reason": null,
        "is_no_show": false,
        "notes": null,
        "internal_notes": null,
        "created_at": "2026-03-02 09:58:48.608484+00",
        "updated_at": "2026-03-02 09:58:48.608484+00"
    },
    {
        "id": "d756cf0f-86f8-4cb9-a8c4-b660095cc813",
        "court_id": "6c92cf52-bab7-40d6-add7-f6c6d50e2e60",
        "user_id": "48aac409-5806-4b19-a728-908e142b0012",
        "booking_source": "app",
        "captured_user_name": "anPham",
        "captured_user_phone": null,
        "captured_court_name": "Sân 5",
        "start_time": "2026-03-10 09:00:00+00",
        "end_time": "2026-03-10 10:30:00+00",
        "subtotal_price": "0.00",
        "discount_amount": "0.00",
        "total_price": "379057.00",
        "final_amount_paid": "0.00",
        "status": "pending",
        "payment_status": "unpaid",
        "payment_method": null,
        "cancelled_by": null,
        "cancel_reason": null,
        "is_no_show": false,
        "notes": null,
        "internal_notes": null,
        "created_at": "2026-03-02 09:59:27.187655+00",
        "updated_at": "2026-03-02 09:59:27.187655+00"
    }
]

// service helpers always return RawBooking; UI conversion happens elsewhere if needed
export async function fetchBookingsMock(delay = 600): Promise<RawBooking[]> {
    await new Promise((res) => setTimeout(res, delay))
    return mockBookings
}

// placeholder for a real server-side supabase fetch
export async function fetchBookingsServer(): Promise<RawBooking[]> {
    // here you would use your Supabase server client, e.g. serverSupabaseClient().from('bookings').select('*')
    return fetchBookingsMock(300)
}


