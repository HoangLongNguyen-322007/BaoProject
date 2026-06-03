# Câu Chuyện Người Dùng (User Stories) - Báo Rồng Vàng

## US-001: Xem Danh Sách Bài Viết Trên Trang Chủ

**Epic**: Nền Tảng Đọc Tin Tức Cốt Lõi

**Là một** độc giả  
**Tôi muốn** xem danh sách bài viết nổi bật trên trang chủ  
**Để có thể** nhanh chóng khám phá nội dung mới

### Tiêu Chí Chấp Nhận

- [ ] Trang chủ hiển thị 10-15 bài viết nổi bật
- [ ] Mỗi bài viết hiển thị: hình ảnh, tiêu đề, tóm tắt, tác giả, ngày
- [ ] Bài viết được sắp xếp theo ngày mới nhất trước
- [ ] Trang tải trong <3 giây
- [ ] Responsive trên di động, tablet, máy tính

### Kích Cỡ Công Việc

Medium (5 điểm)

### Ghi Chú

- Sử dụng API mock để lấy dữ liệu bài viết
- Tối ưu hóa hình ảnh để tải nhanh

---

## US-002: Tìm Kiếm Bài Viết Theo Từ Khóa

**Epic**: Nền Tảng Đọc Tin Tức Cốt Lõi

**Là một** độc giả  
**Tôi muốn** tìm kiếm bài viết bằng từ khóa  
**Để có thể** tìm nội dung cụ thể mà tôi quan tâm

### Tiêu Chí Chấp Nhận

- [ ] Có thanh tìm kiếm trên trang chủ
- [ ] Người dùng nhập từ khóa và nhấn Enter
- [ ] Kết quả tìm kiếm hiển thị tất cả bài viết khớp
- [ ] Hiển thị "Không tìm thấy kết quả" nếu không có kết quả
- [ ] Phân trang cho > 20 kết quả
- [ ] Tìm kiếm không phân biệt chữ hoa/thường

### Kích Cỡ Công Việc

Medium (5 điểm)

### Ghi Chú

- Sử dụng tìm kiếm lại trên phía máy khách
- Có thể nâng cấp lên tìm kiếm phía máy chủ sau

---

## US-003: Lọc Bài Viết Theo Danh Mục

**Epic**: Nền Tảng Đọc Tin Tức Cốt Lõi

**Là một** độc giả  
**Tôi muốn** lọc bài viết theo danh mục (Công Nghệ, Kinh Tế, v.v.)  
**Để có thể** xem nội dung chỉ từ lĩnh vực mà tôi quan tâm

### Tiêu Chí Chấp Nhận

- [ ] Hiển thị danh sách danh mục trên trang chủ
- [ ] Người dùng chọn một danh mục
- [ ] Danh sách bài viết được lọc theo danh mục đã chọn
- [ ] Hiển thị số lượng bài viết trong mỗi danh mục
- [ ] "Tất cả" được chọn theo mặc định

### Kích Cỡ Công Việc

Small (3 điểm)

### Ghi Chú

- 7 danh mục: Chính Trị, Kinh Tế, Công Nghệ, Thể Thao, Giải Trí, Sức Khỏe, Lối Sống

---

## US-004: Xem Chi Tiết Bài Viết

**Epic**: Nền Tảng Đọc Tin Tức Cốt Lõi

**Là một** độc giả  
**Tôi muốn** nhấp vào bài viết để xem nội dung đầy đủ  
**Để có thể** đọc toàn bộ bài viết

### Tiêu Chí Chấp Nhận

- [ ] Trang chi tiết hiển thị tiêu đề, tác giả, ngày, danh mục
- [ ] Hiển thị nội dung đầy đủ của bài viết
- [ ] Hiển thị hình ảnh đặc trưng
- [ ] Trang tải trong <2 giây
- [ ] Có nút "Quay Lại" để quay lại danh sách

### Kích Cỡ Công Việc

Medium (5 điểm)

### Ghi Chú

- Có liên kết bài viết liên quan ở cuối

---

## US-005: Đánh Dấu Bài Viết

**Epic**: Nền Tảng Đọc Tin Tức Cốt Lõi

**Là một** độc giả đã đăng ký  
**Tôi muốn** đánh dấu bài viết để lưu sau  
**Để có thể** tìm lại nó sau

### Tiêu Chí Chấp Nhận

- [ ] Có nút "Đánh Dấu" trên trang chi tiết bài viết
- [ ] Bài viết được lưu vào "Danh Sách Lưu Trữ"
- [ ] Người dùng có thể xem "Danh Sách Lưu Trữ" trong tài khoản
- [ ] Có thể bỏ đánh dấu bằng cách nhấp lại nút

### Kích Cỡ Công Việc

Medium (5 điểm)

### Ghi Chú

- Yêu cầu xác thực người dùng
- Bài viết được lưu trong cơ sở dữ liệu

---

## US-006: Đăng Ký Tài Khoản

**Epic**: Tài Khoản Người Dùng & Cá Nhân Hóa

**Là một** độc giả mới  
**Tôi muốn** tạo tài khoản Báo Rồng Vàng  
**Để có thể** lưu bài viết và nhận thông báo

### Tiêu Chí Chấp Nhận

- [ ] Có trang đăng ký với các trường: Email, Mật khẩu, Tên
- [ ] Xác thực email trước khi kích hoạt tài khoản
- [ ] Mật khẩu được mã hóa với bcrypt
- [ ] Thông báo lỗi rõ ràng (email đã tồn tại, mật khẩu yếu, v.v.)
- [ ] Chuyển hướng đến trang chủ sau đăng ký thành công

### Kích Cỡ Công Việc

Medium (5 điểm)

### Ghi Chú

- Yêu cầu xác thực email
- Gửi email xác thực trong 30 giây

---

## US-007: Đăng Nhập Tài Khoản

**Epic**: Tài Khoản Người Dùng & Cá Nhân Hóa

**Là một** người dùng đã đăng ký  
**Tôi muốn** đăng nhập vào tài khoản của tôi  
**Để có thể** tiếp cục nơi tôi dừng

### Tiêu Chí Chấp Nhận

- [ ] Trang đăng nhập với Email và Mật khẩu
- [ ] Xác thực thông tin đăng nhập từ cơ sở dữ liệu
- [ ] Tạo phiên người dùng (JWT token hoặc session)
- [ ] Thông báo lỗi rõ ràng (email không tồn tại, mật khẩu sai)
- [ ] Chuyển hướng đến trang chủ sau đăng nhập

### Kích Cỡ Công Việc

Small (3 điểm)

### Ghi Chú

- Sử dụng JWT token cho xác thực
- Thời hạn token: 7 ngày

---

## US-008: Quên Mật Khẩu

**Epic**: Tài Khoản Người Dùng & Cá Nhân Hóa

**Là một** người dùng  
**Tôi muốn** đặt lại mật khẩu nếu tôi quên  
**Để có thể** tiếp tục đăng nhập

### Tiêu Chí Chấp Nhận

- [ ] Có liên kết "Quên Mật Khẩu" trên trang đăng nhập
- [ ] Người dùng nhập email
- [ ] Gửi liên kết đặt lại mật khẩu qua email
- [ ] Liên kết hết hạn sau 1 giờ
- [ ] Người dùng tạo mật khẩu mới

### Kích Cỡ Công Việc

Medium (5 điểm)

### Ghi Chú

- Gửi email trong 30 giây
- Liên kết hỗ trợ 1 lần sử dụng

---

## US-009: Xem Lịch Sử Đọc

**Epic**: Tài Khoản Người Dùng & Cá Nhân Hóa

**Là một** người dùng đã đăng ký  
**Tôi muốn** xem lịch sử các bài viết mà tôi đã đọc  
**Để có thể** tìm lại bài viết mà tôi đã thấy trước đó

### Tiêu Chí Chấp Nhận

- [ ] Trang "Lịch Sử Đọc" trong hồ sơ người dùng
- [ ] Hiển thị tất cả bài viết đã đọc theo thứ tự gần đây nhất
- [ ] Hiển thị ngày/thời gian đọc
- [ ] Có nút xóa lịch sử
- [ ] Phân trang cho >20 bài viết

### Kích Cỡ Công Việc

Small (3 điểm)

### Ghi Chú

- Lưu lịch sử trong cơ sở dữ liệu khi người dùng xem bài viết

---

## US-010: Cá Nhân Hóa Tùy Chọn Người Dùng

**Epic**: Tài Khoản Người Dùng & Cá Nhân Hóa

**Là một** người dùng đã đăng ký  
**Tôi muốn** tùy chỉnh các tùy chọn (Chủ Đề, Danh Mục Ưa Thích, Kích Thước Font)  
**Để có thể** có trải nghiệm được cá nhân hóa

### Tiêu Chí Chấp Nhận

- [ ] Trang "Cài Đặt" với các tùy chọn: Chủ Đề (Sáng/Tối), Danh Mục Ưa Thích, Kích Thước Font
- [ ] Các tùy chọn được lưu vào tài khoản người dùng
- [ ] Tùy chọn được áp dụng ngay lập tức
- [ ] Các tùy chọn được duy trì trên các phiên

### Kích Cỡ Công Việc

Small (3 điểm)

### Ghi Chú

- Lưu tùy chọn trong cơ sở dữ liệu
- Chủ đề Tối tắt hình ảnh

---

## US-011: Viết Bài Viết Mới (Tác Giả)

**Epic**: Quản Lý Nội Dung & Xuất Bản

**Là một** nhà báo  
**Tôi muốn** viết và gửi bài viết mới để thẩm duyệt  
**Để có thể** xuất bản nó trên nền tảng

### Tiêu Chí Chấp Nhận

- [ ] Bảng điều khiển tác giả với nút "Viết Bài Viết Mới"
- [ ] Biểu mẫu soạn bài viết với: Tiêu đề, Danh Mục, Tóm Tắt, Nội Dung
- [ ] Tải lên hình ảnh đặc trưng
- [ ] Lưu nháp tự động mỗi 30 giây
- [ ] Nút "Gửi Để Thẩm Duyệt"
- [ ] Gửi thông báo cho biên tập viên

### Kích Cỡ Công Việc

Large (8 điểm)

### Ghi Chú

- Hỗ trợ định dạng Markdown hoặc HTML
- Hạn chế kích thước hình ảnh <5MB

---

## US-012: Thẩm Duyệt Bài Viết (Biên Tập Viên)

**Epic**: Quản Lý Nội Dung & Xuất Bản

**Là một** biên tập viên  
**Tôi muốn** xem bài viết chờ thẩm duyệt và thêm nhận xét  
**Để có thể** phê duyệt hoặc yêu cầu sửa đổi

### Tiêu Chí Chấp Nhận

- [ ] Bảng điều khiển biên tập với danh sách bài viết chờ thẩm duyệt
- [ ] Xem toàn bộ nội dung bài viết
- [ ] Thêm nhận xét nội tuyến (từng đoạn)
- [ ] Nút "Phê Duyệt" hoặc "Yêu Cầu Sửa Đổi"
- [ ] Gửi thông báo cho tác giả

### Kích Cỡ Công Việc

Large (8 điểm)

### Ghi Chú

- Tác giả được thông báo về nhận xét
- Có thể xem lịch sử phê duyệt

---

## US-013: Đăng Ký Gói Cao Cấp

**Epic**: Kiếm Tiền & Đăng Ký

**Là một** người dùng  
**Tôi muốn** đăng ký gói cao cấp để truy cập nội dung độc quyền  
**Để có thể** đọc bài viết cao cấp mà không có quảng cáo

### Tiêu Chí Chấp Nhận

- [ ] Hiển thị 3 gói đăng ký: Basic ($0), Premium ($4.99), Premium+ ($9.99)
- [ ] Tích hợp Stripe thanh toán
- [ ] Tạo đơn đặt hàng khi thanh toán thành công
- [ ] Gửi email xác nhận
- [ ] Cấp quyền truy cập nội dung cao cấp ngay lập tức

### Kích Cỡ Công Việc

Large (8 điểm)

### Ghi Chú

- Hỗ trợ thẻ tín dụng & PayPal
- Có thể hủy đăng ký

---

## US-014: Xem Bài Viết Cao Cấp

**Epic**: Kiếm Tiền & Đăng Ký

**Là một** người dùng Premium  
**Tôi muốn** truy cập bài viết độc quyền chỉ dành cho thành viên cao cấp  
**Để có thể** đọc nội dung chuyên sâu

### Tiêu Chí Chấp Nhận

- [ ] Bài viết cao cấp được đánh dấu "Premium"
- [ ] Người dùng không Premium thấy tóm tắt + nút "Nâng Cấp"
- [ ] Người dùng Premium xem nội dung đầy đủ
- [ ] Không quảng cáo cho người dùng Premium+

### Kích Cỡ Công Việc

Medium (5 điểm)

### Ghi Chú

- Kiểm tra mức đăng ký người dùng trước khi hiển thị

---

## US-015: Không Quảng Cáo Cho Premium+

**Epic**: Kiếm Tiền & Đăng Ký

**Là một** người dùng Premium+  
**Tôi muốn** duyệt nền tảng mà không thấy quảng cáo  
**Để có thể** có trải nghiệm đọc sạch sẽ

### Tiêu Chí Chấp Nhận

- [ ] Người dùng Premium+ không thấy bất kỳ quảng cáo nào
- [ ] Người dùng không Premium và Premium thấy quảng cáo
- [ ] Kiểm tra mức đăng ký trước khi hiển thị quảng cáo

### Kích Cỡ Công Việc

Small (3 điểm)

### Ghi Chú

- Hệ thống quảng cáo được xây dựng trong Phase 3

---

## US-016: Trình Phát Video

**Epic**: Phương Tiện Đa Phương & Nội Dung Phong Phú

**Là một** độc giả  
**Tôi muốn** xem video được nhúng trong bài viết  
**Để có thể** tiêu thụ nội dung video

### Tiêu Chí Chấp Nhận

- [ ] Hỗ trợ nhúng video YouTube, Vimeo
- [ ] Trình phát phản ứng
- [ ] Điều khiển phát lại (Phát, Tạm Dừng, Âm Lượng)
- [ ] Chỉ báo thời gian video
- [ ] Chế độ toàn màn hình

### Kích Cỡ Công Việc

Large (8 điểm)

### Ghi Chú

- Sử dụng thư viện video.js
- Hỗ trợ HLS streaming

---

## US-017: Khuyến Nghị Được Hỗ Trợ Bởi AI

**Epic**: Khuyến Nghị & AI

**Là một** người dùng  
**Tôi muốn** nhận khuyến nghị bài viết dựa trên lịch sử đọc của tôi  
**Để có thể** khám phá nội dung mà tôi sẽ thích

### Tiêu Chí Chấp Nhận

- [ ] Phần "Khuyến Nghị Cho Bạn" trên trang chủ
- [ ] Hiển thị 5-10 bài viết được khuyến nghị
- [ ] Khuyến nghị dựa trên: lịch sử đọc, danh mục ưa thích, bài viết tương tự
- [ ] Độ chính xác ≥80%

### Kích Cỡ Công Việc

Large (13 điểm)

### Ghi Chú

- Sử dụng thuật toán lọc cộng tác
- Cập nhật khuyến nghị mỗi 24 giờ

---

## US-018: Thông Báo Tin Tức

**Epic**: Thông Báo & Tương Tác

**Là một** người dùng  
**Tôi muốn** nhận thông báo về tin tức mới từ danh mục của tôi  
**Để có thể** không bỏ lỡ tin tức quan trọng

### Tiêu Chí Chấp Nhận

- [ ] Tùy chọn cấu hình thông báo trong cài đặt
- [ ] Chọn danh mục để nhận thông báo
- [ ] Chọn tần suất (Ngay Lập Tức, Hàng Ngày, Hàng Tuần)
- [ ] Thông báo được gửi qua email hoặc ứng dụng
- [ ] Liên kết thông báo dẫn đến bài viết

### Kích Cỡ Công Việc

Large (8 điểm)

### Ghi Chú

- Sử dụng dịch vụ email (SendGrid, AWS SES)
- Lập lịch thông báo bằng cron jobs
