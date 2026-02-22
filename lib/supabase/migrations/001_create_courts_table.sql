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