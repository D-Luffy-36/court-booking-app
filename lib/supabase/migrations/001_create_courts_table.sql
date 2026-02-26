-- Table: courts
CREATE TABLE courts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price_per_hour NUMERIC NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- 1. Thêm cột mới với kiểu dữ liệu là Text
ALTER TABLE courts 
ADD COLUMN pitch_size text;

-- 2. (Tùy chọn) Ràng buộc để chỉ cho phép nhập đúng 3 loại sân này
ALTER TABLE courts 
ADD CONSTRAINT check_pitch_type 
CHECK (pitch_size IN ('Sân 5', 'Sân 7', 'Sân 11'));


-- 1. Tạo kiểu dữ liệu Enum cho status để đảm bảo tính nhất quán (Tùy chọn nhưng khuyến khích)
-- Nếu bạn không muốn dùng Enum, có thể dùng kiểu TEXT thông thường.
CREATE TYPE court_status AS ENUM ('active', 'maintenance', 'archived');

-- 2. Thêm các cột mới vào bảng courts
ALTER TABLE courts 
ADD COLUMN status court_status DEFAULT 'active',
ADD COLUMN is_deleted BOOLEAN DEFAULT false,
ADD COLUMN deleted_at TIMESTAMPTZ DEFAULT null;

-- 3. Tạo Index cho is_deleted để tăng tốc độ truy vấn (vì sau này bạn luôn lọc theo trường này)
CREATE INDEX idx_courts_not_deleted ON courts (is_deleted) WHERE is_deleted = false;

-- 4. (Nâng cao) Tạo một View để tự động lọc các sân chưa bị xóa
-- Giúp bạn truy vấn ở phía Frontend dễ dàng hơn mà không cần thêm .eq('is_deleted', false) mỗi lần.
CREATE VIEW active_courts AS
SELECT * FROM courts
WHERE is_deleted = false AND status != 'archived';

-- A. View Courts (SELECT) - Public Access
CREATE POLICY "Allow public read access" 
ON courts FOR SELECT 
TO public 
USING (true);
-- B. Create New Court (INSERT) - Admin Only
CREATE POLICY "Allow admin to insert courts" 
ON courts FOR INSERT 
TO authenticated 
WITH CHECK ((auth.jwt() ->> 'email') = 'pa3067832@gmail.com');


-- C. Update Court (UPDATE) - Admin Only