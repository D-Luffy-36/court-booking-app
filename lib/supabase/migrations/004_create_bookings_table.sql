
-- 1. Tạo bảng bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys: Chuyển sang SET NULL để giữ dữ liệu khi User/Sân bị xóa
    court_id UUID REFERENCES courts(id) ON DELETE SET NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

    -- SNAPSHOT: Thông tin cố định tại thời điểm đặt (Quan trọng cho báo cáo)
    captured_user_name TEXT NOT NULL, 
    captured_user_phone TEXT,        -- Cần thiết để chủ sân gọi khách nếu User xóa App
    captured_court_name TEXT NOT NULL, 
    
    -- THỜI GIAN & GIÁ
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    
    -- TRẠNG THÁI
    status TEXT NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'confirmed', 'cancelled', 'archived')),
    
    -- THÔNG TIN BỔ SUNG
    payment_status TEXT NOT NULL DEFAULT 'unpaid'
        CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    notes TEXT, -- Khách hàng ghi chú (ví dụ: "Cần mượn thêm vợt")
    internal_notes TEXT, -- Chủ sân ghi chú nội bộ (ví dụ: "Khách hay bùng")

    -- AUDIT LOGS
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- RÀNG BUỘC LOGIC
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

-- 8. Tạo Trigger để gọi hàm validate_booking_duration trước khi insert hoặc update
CREATE TRIGGER trg_validate_booking_time
BEFORE INSERT OR UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION validate_booking_time();



-- 1. Phần "Đích" (INSERT INTO): Khai báo danh sách các cột
-- mà bạn muốn đổ dữ liệu vào bảng bookings.

-- 2. Phần "Nguồn" (SELECT): Thay vì dùng từ khóa VALUES,
-- bạn dùng SELECT để lấy dữ liệu thực tế đang nằm trong database.

-- 3.Cơ chế Snapshot:
-- p.full_name và c.name được copy thẳng vào bảng bookings.
-- Sau này nếu User A có đổi tên thành "A Đẹp Trai", 
-- thì dòng captured_user_name trong đơn hàng cũ vẫn mãi mãi là "Nguyen Van A".

-- Chèn một đơn đặt sân mới bằng cách "Snapshot" dữ liệu từ các bảng liên quan
INSERT INTO bookings (
    user_id, 
    court_id, 
    captured_user_name, 
    captured_court_name, 
    total_price,
    start_time,
    end_time,
    status
) 
SELECT 
    p.id,           -- Lấy từ bảng profiles
    c.id,           -- Lấy từ bảng courts
    p.full_name,    -- Chụp ảnh tên user tại thời điểm này
    c.name,         -- Chụp ảnh tên sân tại thời điểm này
    500000,         -- Giá tiền (thường truyền từ frontend hoặc tính toán)
    '2026-05-20 14:00', 
    '2026-05-20 16:00',
    'pending'
FROM 
    profiles p, 
    courts c
WHERE 
    p.id = 'u123' 
    AND c.id = 'court-999';