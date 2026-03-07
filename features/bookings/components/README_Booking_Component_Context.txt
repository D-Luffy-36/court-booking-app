================================================================================
||                 INTERNAL DOCS: BOOKING MANAGEMENT SYSTEM                   ||
||----------------------------------------------------------------------------||
||  Last Updated: 06-03-2026 | Scope: Component Logic & Business Flow         ||
================================================================================

[1] COMPONENT: TABLE (PARENTS) - "GIÁM SÁT & HIỂN THỊ"
--------------------------------------------------------------------------------
* MÔ TẢ: Đóng vai trò là "Single Source of Truth" (Nguồn dữ liệu duy nhất).
* TRÁCH NHIỆM CHÍNH:
    - Lưu trữ Data: Chứa danh sách Bookings từ API trả về.
    - View State: Quản lý SearchQuery, ActiveTab, Pagination.
    - UI Structure: Định hình Grid (Tên, Giờ, Tiền, Trạng thái).
* LUỒNG LOGIC:
    - Khi ActionMenu thực hiện xong hành động (ví dụ: Hủy đơn), Table sẽ nhận 
      lệnh để Re-render hoặc Re-fetch (gọi lại API) để cập nhật dữ liệu mới.

[2] COMPONENT: ACTIONMENU (CHILD) - "THỰC THI & NGHIỆP VỤ"
--------------------------------------------------------------------------------
* MÔ TẢ: Chứa các "động từ" (Action). Ẩn/Hiện linh hoạt để tinh gọn UI.
* TRÁCH NHIỆM CHÍNH:
    - Context-Aware: Biết đang làm việc với ID nào (booking.id).
    - Phân quyền logic: Tự động ẩn nút "Hủy" nếu đơn đã ở trạng thái Hủy.
* CÁC KÍCH HOẠT (TRIGGERS):
    - Open Modal: Gọi cửa sổ con khi nhấn "Edit" hoặc "View".
    - Quick Action: Đổi trạng thái ngay lập tức khi nhấn "Confirm".
    - Print: Kết nối Driver máy in để xuất hóa đơn/phiếu đặt.
* GỢI Ý PRODUCTION: 
    - Cần bổ sung Confirmation Dialog (Cửa sổ xác nhận) trước các hành động 
      quan trọng như "Hủy đơn" để tránh nhầm lẫn.

[3] BUSINESS LOGIC MATRIX (SOURCE DATA)
--------------------------------------------------------------------------------
TRẠNG THÁI   | Ý NGHĨA                           | HÀNH ĐỘNG KHẢ DỤNG
-------------|-----------------------------------|------------------------------
Pending      | Khách vừa đặt, chưa có sân        | Xác nhận, Sửa, Hủy, Chi tiết
Confirmed    | Đã giữ sân cho khách              | Check-in, Đổi lịch, Hủy, In
Completed    | Khách đã chơi xong & thanh toán   | Xem chi tiết, In hóa đơn
Cancelled    | Đơn đã bị hủy                     | Xem chi tiết, Phục hồi
--------------------------------------------------------------------------------

[4] TÓM TẮT MỐI QUAN HỆ "CHA - CON" (Dựa trên kiến trúc Component)
--------------------------------------------------------------------------------
ĐẶC ĐIỂM            | CHA (TABLE)                    | CON (ACTIONMENU)
--------------------|--------------------------------|--------------------------
Dữ liệu cầm trên tay| Array<Booking> (Cả danh sách)  | Booking (Chỉ 1 đơn cụ thể)
Câu hỏi phụ trách   | "Hôm nay có bao nhiêu khách?"  | "Tôi làm gì với khách này?"
Truyền vào (Props)  | bookings, loading              | booking, onAction
Phản hồi (Output)   | Hiển thị danh sách đã lọc      | Gọi hàm cập nhật trạng thái
--------------------------------------------------------------------------------

[5] LƯU Ý CHO TƯƠNG LAI (MAINTENANCE NOTES)
--------------------------------------------------------------------------------
1. Giao tiếp (Communication): ActionMenu KHÔNG trực tiếp sửa API. Nó gọi 
   callback `onAction` truyền lên Cha. Cha sẽ là người thực thi API call.
2. Xác nhận (Safety): Luôn cần Confirmation Dialog cho các hành động 
   "Hủy" (Cancel) để tránh bấm nhầm.
3. Đồng bộ (Re-validation): Sau khi ActionMenu thực thi thành công, 
   Table PHẢI gọi lại `refreshData()` để đồng bộ UI với Server.

[HẾT NỘI DUNG]
Dùng file này để làm ngữ cảnh (Context) cho AI khi cần bảo trì sau 1 năm.
================================================================================