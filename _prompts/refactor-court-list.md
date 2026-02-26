🚀 Prompt: Refactor CourtList Component for Admin and User roles
"Tôi cần refactor component CourtList hiện tại thành hai phiên bản riêng biệt dành cho Admin và User trong ứng dụng Next.js 15. Cấu trúc thư mục của tôi đã có sẵn Route Groups là (admin) và (user).

Yêu cầu chung:

Tách logic hiển thị thành hai component: CourtListUser và CourtListAdmin.

Cả hai đều lấy dữ liệu từ bảng courts trong Supabase. Hiện tại bảng này đang ở chế độ UNRESTRICTED, nhưng code cần sẵn sàng để hoạt động với RLS sau này.

1. Đối với CourtListUser (Hiển thị tại app/(user)/courts/page.tsx):

Giao diện + chức năng: như Courst List hiện tại thôi

2. Đối với CourtListAdmin (Hiển thị tại app/(admin)/dashboard/courts/page.tsx):

Giao diện: Thay đổi từ dạng Card sang Dạng Bảng (Table) hoặc Card thu nhỏ (Compact Card) để quản lý được nhiều sân cùng lúc.

Nội dung bổ sung: * Hiển thị trạng thái vận hành (Trống / Có khách / Đang bảo trì).

Hiển thị doanh thu dự kiến hôm nay hoặc số lượt đặt chỗ.

Action: Thêm các nút chức năng: 'Chỉnh sửa' (Edit), 'Tạm đóng sân' (Toggle Status), và 'Xóa sân'.

Mục tiêu: Tối ưu hiệu suất quản lý và thao tác nhanh cho chủ sân.

3. Kỹ thuật yêu cầu:

Sử dụng Shared Component cho các phần chung như Badge loại sân (Sân 5, Sân 7).

Xử lý lỗi Hydration Mismatch (như trong ảnh image_c89864.png) bằng cách kiểm tra biến isMounted hoặc sử dụng useEffect.

Sử dụng lucide-react cho các icon quản lý của Admin và sonner để thông báo khi Admin thay đổi trạng thái sân thành công."

💡 Tại sao bạn cần dùng Prompt này?
Sửa lỗi Hydration: Ảnh console cho thấy bạn đang bị lỗi render không đồng nhất. Prompt này nhắc AI chú ý xử lý phần đó.

Đúng kiến trúc: Bạn đã có sẵn (admin) và (user) trong thư mục app, prompt này yêu cầu AI đặt code vào đúng vị trí để tránh nhầm lẫn route.

Thay đổi Business Mindset: Admin không cần xem quả bóng xoay to đùng, họ cần số liệu. Prompt này ép AI phải tạo ra giao diện thực tế hơn cho việc kinh doanh.