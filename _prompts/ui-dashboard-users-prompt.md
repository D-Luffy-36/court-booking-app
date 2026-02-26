Mẫu Prompt Refactor Trang Dashboard Users
Vai trò: Bạn là một Senior Frontend Developer và chuyên gia UI/UX Design.

Nhiệm vụ: Hãy xây dựng/refactor trang quản lý khách hàng /dashboard/users/page.tsx cho dự án Next.js (App Router). Giao diện phải mang phong cách Modern Enterprise SaaS (giống như Linear, Vercel hoặc Raycast) với chế độ Dark Mode cao cấp.

Yêu cầu kỹ thuật & Thẩm mỹ:

Layout & Layout Phân cấp:

Sử dụng hệ thống 8pt Grid cho toàn bộ padding và margin.

Header: Tiêu đề "Khách hàng" lớn bên trái; bên phải là thanh Search dạng Command Palette (Ctrl+K) và nút "Thêm khách hàng" với icon cộng.

Filter Tabs: Ngay dưới Header là dải Tab (Tất cả, Thành viên, Thường xuyên) có hiệu ứng chuyển động mượt mà khi switch.

Màu sắc (Design System - Dark Mode):

Background: Sử dụng đen sâu (#000000) cho nền trang và xám đậm (zinc-900/50) cho Surface của Table.

Primary Accent: Màu xanh lá (emerald-500) cho các nút hành động chính và trạng thái Active.

Badges: Các gói thành viên (Đồng, Bạc, Vàng) phải có màu sắc riêng biệt (Amber, Slate, Yellow) nhưng ở dạng nhạt (soft/muted) để không bị chói.

Table UI & Interaction:

Visual Hierarchy: Tên người dùng để trắng (text-zinc-100), email và số điện thoại để xám (text-zinc-400).

Row Hover: Khi di chuột qua mỗi dòng, row phải đổi màu nền nhẹ và hiển thị nút hành động nhanh.

Action Menu: Nút "..." khi click mở ra Dropdown menu có hiệu ứng Glassmorphism (backdrop-blur-md) và đổ bóng (soft shadow).

Components con & UX:

Avatar: Sử dụng avatar tròn, có độ phân giải tốt, kèm viền mỏng (ring-1) để tách biệt với nền.

Empty State: Thiết kế giao diện khi không tìm thấy kết quả tìm kiếm.

Pagination: Bộ phân trang tối giản, hỗ trợ phím tắt hoặc nút Next/Prev tinh tế.

Code Quality: * Sử dụng Tailwind CSS, ưu tiên các class utility cho dark mode.

Sử dụng Lucide React cho hệ thống icon.

Tối ưu hóa Accessibility (ARIA labels cho Table và Dropdown).

Đảm bảo tính Responsive: Ẩn các cột "Email" hoặc "Tổng chi tiêu" trên màn hình nhỏ, ưu tiên hiển thị Tên và Avatar.

Đầu ra: Cung cấp mã nguồn sạch (page.tsx và các sub-components), giả lập (mock data) khoảng 5-8 user và giải thích ngắn gọn các quyết định thiết kế để tối ưu trải nghiệm người dùng.

Gợi ý "Chạm" thêm cho Prompt này:
Dữ liệu thực tế: Nếu bạn muốn AI viết luôn logic kết nối, hãy thêm: "Sử dụng Supabase client để fetch dữ liệu từ table 'users' và handle trạng thái loading bằng Skeleton."

Animation: Thêm dòng: "Sử dụng Framer Motion để tạo hiệu ứng 'stagger' khi danh sách người dùng hiện ra lần đầu."

Trạng thái Role: Nhắc AI xử lý màu sắc cho Admin/User tương tự như cách chúng ta đã fix màu đỏ nãy: "Lưu ý Badge dành cho Role Admin không được dùng màu đỏ để tránh nhầm lẫn với báo lỗi."