// database enums (same as RawBooking.status)
export type BookingStatusType = 'pending' | 'confirmed' | 'cancelled' | 'completed'

// Raw entity returned from API/DB (snake_case exactly matching columns)
export interface RawBooking {
    id: string
    court_id: string
    user_id: string
    booking_source: string
    captured_user_name: string | null
    captured_user_phone: string | null
    captured_court_name: string
    start_time: string
    end_time: string
    subtotal_price: string
    discount_amount: string
    total_price: string
    final_amount_paid: string
    status: BookingStatusType
    payment_status: string
    payment_method: string | null
    cancelled_by: string | null
    cancel_reason: string | null
    is_no_show: boolean
    notes: string | null
    internal_notes: string | null
    created_at: string
    updated_at: string
}

// UI-friendly type derived from RawBooking with camelCase and reduced fields
export interface BookingUI {
    id: string
    customerName: string
    courtName: string
    date: string
    time: string
    amount: number
    duration: string          // e.g. court or booking service name shown in table
    status: BookingStatusType
    createdAt: string
}

export const ACTIONS = {
    VIEW: 'VIEW',
    CONFIRM: 'CONFIRM',
    EDIT: 'EDIT',
    CHECK_IN: 'CHECK_IN',
    RESCHEDULE: 'RESCHEDULE',
    PRINT: 'PRINT',
    PRINT_INVOICE: 'PRINT_INVOICE',
    RESTORE: 'RESTORE',
    CANCEL: 'CANCEL',
} as const;


// legacy type alias used throughout feature (kept for backwards compatibility)
export type Booking = BookingUI;
