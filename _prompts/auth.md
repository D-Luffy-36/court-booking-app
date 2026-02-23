Bước 1: Thiết lập "Hợp đồng" dữ liệu (Schema)

Prompt: "
Tôi đang dùng Next.js 14 và Supabase.
Bảng profiles.ts cấu trúc như sau:
Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
"

Bước 2: Xây dựng Logic lõi (Server Actions)

Prompt: "Dựa trên cấu trúc thư mục tôi có (có features/auth), hãy viết các Server Actions trong Next.js để xử lý: Login, Register, Logout và Reset Password bằng Supabase Auth. Đảm bảo có xử lý lỗi và trả về object { error: string | null, success: boolean }."

Bước 3: Đổ dữ liệu vào UI (The Shell)

Bây giờ mới xử lý các file trong thư mục (auth) như login/page.tsx, register/page.tsx.

Tư duy: Sử dụng ShadcnUI hoặc Tailwind để AI "vẽ" giao diện cực nhanh.

Prompt: "Hãy tạo cho tôi file register/page.tsx. Sử dụng React Hook Form, Zod để validate (email, password tối thiểu 8 ký tự). Giao diện dùng Tailwind CSS, thiết kế tối giản, hiện đại. Khi submit sẽ gọi đến Server Action register tôi vừa có ở Bước 2."


Bước 4: Bảo mật Route (Middleware)

Đây là bước quan trọng nhất để hoàn thiện luồng Auth.

Tư duy: Chặn người dùng chưa đăng nhập vào các trang (admin) hoặc (user).

Prompt: "Viết file middleware.ts cho Next.js App Router. Nếu người dùng chưa login mà vào các đường dẫn bắt đầu bằng "/dashboard", hãy redirect họ về /login. Sử dụng @supabase/auth-helpers-nextjs.
và show cấu trúc thư mục, không dùng src"


Prompt để AI tối ưu cho bạn:
"Hãy hoàn thiện file middleware.ts của tôi.
Sử dụng matcher để bỏ qua các file tĩnh (next/static, favicon, images).
Chèn logic check role 'admin' từ bảng profiles trong Supabase.
Nếu user là 'admin' mà truy cập trang chủ /, hãy tự động redirect họ vào /dashboard."