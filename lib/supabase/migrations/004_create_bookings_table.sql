
-- 1. Tạo bảng bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    court_id UUID REFERENCES courts(id) ON DELETE SET NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    
    -- Nguồn phát sinh đơn
    booking_source TEXT NOT NULL DEFAULT 'app'
        CHECK (booking_source IN ('app', 'phone')),

    -- Snapshot
    captured_user_name TEXT NOT NULL, 
    captured_user_phone TEXT,
    captured_court_name TEXT NOT NULL, 
    
    -- Thời gian
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,

    -- Tài chính
    subtotal_price NUMERIC(12, 2) NOT NULL DEFAULT 0, 
    discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    final_amount_paid NUMERIC(12, 2) DEFAULT 0,

    -- Trạng thái vận hành
    status TEXT NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'confirmed', 'checked_in', 'completed', 'cancelled')),
    
    -- Trạng thái thanh toán
    payment_status TEXT NOT NULL DEFAULT 'unpaid'
        CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded')),
    payment_method TEXT CHECK (payment_method IN ('cash', 'transfer', 'app_wallet')),

    -- Hủy / Bom
    cancelled_by UUID REFERENCES profiles(id),
    cancel_reason TEXT,
    is_no_show BOOLEAN DEFAULT FALSE,

    -- Ghi chú
    notes TEXT,
    internal_notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT check_booking_times CHECK (end_time > start_time)
);
-- 2. Bật Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 3. Tạo Index để truy vấn nhanh hơn (Tối ưu hiệu năng)
--   * court_id: tìm booking theo sân (ví dụ danh sách bookings một court)
CREATE INDEX idx_bookings_court_id ON bookings(court_id);
--   * user_id: truy vấn lịch của một người dùng
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
--   * start_time: lọc booking theo khoảng thời gian, tìm booking sắp tới
CREATE INDEX idx_bookings_start_time ON bookings(start_time);

-- 4. Tạo Policy để chỉ cho phép người dùng xem và quản lý các booking của họ
-- Users: allow users to read/create/update/delete only their own bookings
CREATE POLICY "Users can select their own bookings" ON bookings
    FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own bookings" ON bookings
    FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own bookings" ON bookings
    FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own bookings" ON bookings
    FOR DELETE
    USING (user_id = auth.uid());

-- 5. Tạo Policy để cho phép admin xem tất cả booking
CREATE POLICY "Admins can select all bookings" ON bookings
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- 6. Tạo Policy để cho phép admin quản lý tất cả booking
-- Admins: separate policies for insert/update/delete (WITH CHECK applies to INSERT/UPDATE)
CREATE POLICY "Admins can insert bookings" ON bookings
    FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY "Admins can update bookings" ON bookings
    FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    ));


-- 7. Tạo Trigger Chỉ cho phép đặt đúng 60 phút hoặc 90 phút
CREATE OR REPLACE FUNCTION validate_booking_duration()
RETURNS TRIGGER AS $$
DECLARE
    duration_minutes FLOAT;
BEGIN
    -- Tính toán khoảng thời gian (duration) theo phút
    duration_minutes := EXTRACT(EPOCH FROM (NEW.end_time - NEW.start_time)) / 60;

    -- 1. Kiểm tra nếu thời gian kết thúc trước bắt đầu
    IF NEW.end_time <= NEW.start_time THEN
        RAISE EXCEPTION 'Thời gian kết thúc không được trước hoặc bằng thời gian bắt đầu!';
    END IF;

    -- 2. Kiểm tra nếu thời gian đặt ít hơn 60 phút
    IF duration_minutes < 60 THEN
        RAISE EXCEPTION 'Thời gian đặt sân tối thiểu là 60 phút. Bạn đang đặt % phút.', duration_minutes;
    END IF;

    -- 3. (Tùy chọn) Chặn thời gian lẻ, chỉ cho phép bội số của 30 phút (60, 90, 120...)
    IF MOD(duration_minutes::numeric, 30) != 0 THEN
       RAISE EXCEPTION 'Thời gian đặt sân phải là bội số của 30 phút (60, 90, 120...).';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Tạo Trigger để gọi hàm validate_booking_duration trước khi insert hoặc update
CREATE TRIGGER trg_validate_booking_duration
BEFORE INSERT OR UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION validate_booking_duration();

