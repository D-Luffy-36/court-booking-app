import { RawBooking, BookingUI } from "../types";

// object-style mapper; can be extended with additional conversions later
export const bookingMapper = {
    toUI(raw: RawBooking): BookingUI {
        const startDate = new Date(raw.start_time);

        // Format thời gian: "14:30 - 15:30"
        const startTimeStr = startDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
        const endDateStr = new Date(raw.end_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });

        const duration = bookingMapper.calculateDuration(raw.start_time, raw.end_time);

        return {
            id: raw.id,
            // Ưu tiên tên từ user profile, nếu không có thì dùng tên chụp lại lúc đặt
            customerName: raw.captured_user_name || "Khách lẻ",
            courtName: raw.captured_court_name,
            date: raw.start_time, // Lưu ISO string để component Table tự format date
            time: `${startTimeStr} - ${endDateStr}`,
            // Thêm trường duration để UI hiển thị "60 phút" hoặc "Sân 1"
            duration: `${duration} phút`,
            amount: parseFloat(raw.total_price), // Chuyển từ string sang number để format tiền
            status: raw.status,
            createdAt: raw.created_at
        };
    },

    /**
     * Calculates the duration of a booking in minutes based on start and end time strings.
     */
    calculateDuration(start: string, end: string): number {
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        return Math.round((endTime - startTime) / (1000 * 60)); // trả về số phút
    }

};