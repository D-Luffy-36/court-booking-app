-- 1. Phần "Đích" (INSERT INTO): Khai báo danh sách các cột
-- mà bạn muốn đổ dữ liệu vào bảng bookings.

-- 2. Phần "Nguồn" (SELECT): Thay vì dùng từ khóa VALUES,
-- bạn dùng SELECT để lấy dữ liệu thực tế đang nằm trong database.

-- 3.Cơ chế Snapshot:
-- p.full_name và c.name được copy thẳng vào bảng bookings.
-- Sau này nếu User A có đổi tên thành "A Đẹp Trai", 
-- thì dòng captured_user_name trong đơn hàng cũ vẫn mãi mãi là "Nguyen Van A".

-- Chèn một đơn đặt sân mới bằng cách "Snapshot" dữ liệu từ các bảng liên quan
-- Insert one random booking by picking an existing profile and court.
-- * Chooses a random profile and a random court independently.
-- * Picks a random start time in the next 14 days and a duration of 60 or 90 minutes
-- * Generates a random total_price within a sensible range for testing
WITH chosen_profile AS (
    SELECT id, full_name
    FROM profiles
    ORDER BY random()
    LIMIT 1
), chosen_court AS (
    SELECT id, name
    FROM courts
    ORDER BY random()
    LIMIT 1
), times AS (
    SELECT
        -- random start within next 14 days, between 6:00 and 22:00
        (date_trunc('day', now()) + (floor(random()*14)::int || ' days')::interval
         + (6 + floor(random()*16)::int || ' hours')::interval) AS start_time,
        (CASE WHEN random() < 0.5 THEN 60 ELSE 90 END) AS duration_minutes,
        (100000 + floor(random()*400000))::numeric AS price
)
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
    p.id,
    c.id,
    p.full_name,
    c.name,
    t.price,
    t.start_time,
    t.start_time + (t.duration_minutes || ' minutes')::interval,
    'pending'
FROM chosen_profile p CROSS JOIN chosen_court c CROSS JOIN times t;