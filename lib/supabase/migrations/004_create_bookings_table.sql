


-- 1. Tạo bảng bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    court_id UUID NOT NULL REFERENCES courts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- Đảm bảo thời gian kết thúc phải sau thời gian bắt đầu
    CONSTRAINT check_booking_times CHECK (end_time > start_time)
);

-- 2. Bật Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 3. Tạo Index để truy vấn nhanh hơn (Tối ưu hiệu năng)
CREATE INDEX idx_bookings_court_id ON bookings(court_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);

-- 4. Tạo Policy để chỉ cho phép người dùng xem và quản lý các booking của họ
CREATE POLICY "Users can manage their own bookings" ON bookings
    FOR ALL
    USING (user_id = auth.uid());
    WITH CHECK (user_id = auth.uid());

-- 5. Tạo Policy để cho phép admin xem tất cả booking
CREATE POLICY "Admins can view all bookings" ON bookings
    FOR SELECT
    USING (EXISTS (
        SELECT 1 
        FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    ));
    WITH CHECK (EXISTS (
        SELECT 1 
        FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    ));

-- 6. Tạo Policy để cho phép admin quản lý tất cả booking
CREATE POLICY "Admins can manage all bookings" ON bookings
    FOR ALL
    USING (EXISTS (
        SELECT 1 
        FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    ));
    WITH CHECK (EXISTS (
        SELECT 1 
        FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
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