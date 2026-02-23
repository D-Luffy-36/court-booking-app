create table venue_profile (
  id uuid default gen_random_uuid() primary key,
  
  -- Thông tin định danh
  name text not null,                -- Tên sân (VD: Sân Bóng Đá Mini Elite)
  owner_name text,                   -- Tên chủ sân (VD: Anh Hoàng)
  
  -- Thông tin liên lạc & Địa điểm
  address text not null,             -- Địa chỉ cụ thể
  phone text,                        -- Số điện thoại đặt sân
  map_url text,                      -- Đường dẫn Google Maps
  
  -- Vận hành
  opening_hours text,                -- Giờ mở cửa (VD: 05:00 sáng - 10:00 tối)
  
  -- Thời gian hệ thống
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
