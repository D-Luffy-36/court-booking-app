. Mẫu Prompt Refactor "Xịn" (Copy & Chỉnh sửa)
Vai trò: Bạn là một Senior Frontend Developer và UI Designer chuyên nghiệp.

Nhiệm vụ: Hãy refactor component DashboardNavbar hiện tại của tôi để nó trông hiện đại, sạch sẽ và cao cấp hơn theo phong cách Modern Enterprise SaaS.

Yêu cầu kỹ thuật & Thẩm mỹ:

Layout & Spacing: Sử dụng flexbox để căn chỉnh. Phía trái là Breadcrumbs và Search Bar; phía phải là Notifications, Settings và User Profile. Đảm bảo khoảng cách (padding/gap) tuân thủ hệ thống 8pt grid.

Màu sắc (Design System): Sử dụng các biến màu sau (thay thế mã màu thực tế của bạn vào đây):

Primary: --color-primary

Background: --color-bg-surface (Glassmorphism hiệu ứng mờ nhẹ).

Border: --color-border-subtle.

Text: --color-text-main và --color-text-muted.

Hiệu ứng (Interactions): >     * Thêm hiệu ứng backdrop-filter: blur(8px) cho nền navbar khi scroll.

Các icon action phải có hover state với nền tròn mờ và transition 0.2s.

User Avatar phải có menu thả xuống (Dropdown) được thiết kế tinh tế.

Components con: >     * Search Bar: Thiết kế dạng "Command Palette" (phím tắt Ctrl+K) với icon kính lúp nhỏ.

Notification: Có chấm đỏ nhỏ (Badge) thông báo phía trên icon.

Code Quality: Sử dụng Tailwind CSS (hoặc CSS Modules), tối ưu hóa Accessibility (ARIA labels) và đảm bảo Responsive hoàn hảo trên Mobile.

Đầu ra: Cung cấp mã nguồn sạch, chia nhỏ các sub-component nếu cần và giải thích các thay đổi chính về UX.

2. Các điểm "chạm" giúp Navbar trở nên tinh tế
Để Navbar không bị "quê", bạn nên yêu cầu AI chú ý vào 3 yếu tố hình ảnh sau:

Phân cấp thị giác (Visual Hierarchy)
Đừng để mọi thứ đều nổi bật. Nút "Search" và "User Profile" nên có độ ưu tiên khác nhau.

Hiệu ứng Glassmorphism
Đây là xu hướng của các Dashboard hiện đại (như Linear, Vercel). Nó giúp Navbar trông nhẹ nhàng, không bị tách biệt quá gắt với nội dung bên dưới.

Trạng thái Feedback
Mỗi khi di chuột (hover) qua một icon, hãy yêu cầu một sự thay đổi nhẹ về màu nền hoặc độ sáng thay vì chỉ đổi màu icon. Điều này tạo cảm giác "mượt" (premium feel).

3. Cách tùy chỉnh mã màu theo dự án
Nếu bạn đã có sẵn file theme.js hoặc tailwind.config.js, hãy dán nội dung đó vào đầu prompt kèm câu lệnh:
"Dựa trên hệ thống màu trong config sau, hãy áp dụng chính xác các biến màu primary, secondary và neutral cho Navbar."