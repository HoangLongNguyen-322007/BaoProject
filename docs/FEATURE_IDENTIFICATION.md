# Nhận Dạng Tính Năng - Báo Rồng Vàng

## Tổng Quan

Tài liệu này xác định tất cả các tính năng Báo Rồng Vàng được phân loại theo Phase, Epic, ưu tiên và trạng thái phát triển.

---

## DANH MỤC TÍNH NĂNG PHASE 1: NỀN TẢNG MVP

### 1. Tính Năng Cốt Lõi Đọc Tin Tức

#### F1.1: Trang Chủ Với Danh Sách Bài Viết

**Mô Tả**: Hiển thị danh sách bài viết nổi bật trên trang chủ

**Thành Phần**:

- Grid layout 3 cột trên desktop, 2 cột tablet, 1 cột di động
- Thẻ bài viết với hình ảnh, tiêu đề, tác giả, ngày
- Tóm tắt 2-3 dòng
- Số lượng bài viết hiển thị: 10-15

**Tiêu Chí Chấp Nhận**: US-001

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F1.2: Trang Chi Tiết Bài Viết

**Mô Tả**: Hiển thị nội dung đầy đủ của một bài viết

**Thành Phần**:

- Tiêu đề bài viết
- Tác giả, ngày, danh mục
- Hình ảnh đặc trưng
- Nội dung đầy đủ (hỗ trợ HTML/Markdown)
- Bài viết liên quan ở cuối
- Nút Chia Sẻ

**Tiêu Chí Chấp Nhận**: US-004

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F1.3: Chức Năng Tìm Kiếm

**Mô Tả**: Tìm kiếm bài viết theo từ khóa

**Thành Phần**:

- Thanh tìm kiếm trong header
- Trang kết quả tìm kiếm
- Tìm kiếm không phân biệt chữ hoa/thường
- Phân trang kết quả
- Gợi ý tìm kiếm

**Tiêu Chí Chấp Nhận**: US-002

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F1.4: Bộ Lọc Danh Mục

**Mô Tả**: Lọc bài viết theo danh mục

**Thành Phần**:

- 7 danh mục: Chính Trị, Kinh Tế, Công Nghệ, Thể Thao, Giải Trí, Sức Khỏe, Lối Sống
- Lựa chọn nhiều danh mục
- Hiển thị số lượng bài viết mỗi danh mục
- Mặc định: "Tất Cả"

**Tiêu Chí Chấp Nhận**: US-003

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 3 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F1.5: Phân Trang

**Mô Tả**: Phân trang danh sách bài viết

**Thành Phần**:

- Mỗi trang 10 bài viết
- Điều hướng Trang Trước/Tiếp Theo
- Hiển thị số trang hiện tại
- Liên kết trực tiếp đến trang

**Tiêu Chí Chấp Nhận**: US-001

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F1.6: Bài Viết Nổi Bật/Xu Hướng

**Mô Tả**: Hiển thị bài viết nổi bật và xu hướng trên trang chủ

**Thành Phần**:

- Phần "Bài Viết Nổi Bật" ở đầu trang
- Phần "Bài Viết Xu Hướng" dựa trên lượt xem
- Cập nhật mỗi 24 giờ

**Tiêu Chí Chấp Nhận**: US-001

**Ưu Tiên**: Trung Bình

**Kích Cỡ Công Việc**: 3 điểm

**Trạng Thái**: ⏳ Chờ

---

### 2. Tính Năng Thiết Kế Phản Ứng

#### F1.7: Thiết Kế Thích Ứng Di Động

**Mô Tả**: Giao diện tối ưu hóa cho tất cả kích thước màn hình

**Thành Phần**:

- Responsive breakpoints: 320px, 768px, 1024px, 1440px
- Mobile-first approach
- Điều chỉnh font size cho di động
- Thích ứng layout grid

**Tiêu Chí Chấp Nhận**: US-001, US-004

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F1.8: Điều Hướng Header

**Mô Tả**: Header với logo, menu, tìm kiếm

**Thành Phần**:

- Logo Báo Rồng Vàng
- Menu danh mục
- Thanh tìm kiếm
- Nút Đăng Nhập/Đăng Ký
- Responsive menu hamburger di động

**Tiêu Chí Chấp Nhận**: US-001

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 3 điểm

**Trạng Thái**: ⏳ Chờ

---

### 3. Tính Năng Hiệu Suất & Tối Ưu Hóa

#### F1.9: Tối Ưu Hóa Hình Ảnh

**Mô Tả**: Nén và tối ưu hóa hình ảnh cho tải nhanh

**Thành Phần**:

- WebP format với fallback JPEG
- Responsive images (srcset)
- Lazy loading hình ảnh
- Giới hạn kích thước tối đa 100KB

**Tiêu Chí Chấp Nhận**: US-001

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F1.10: Hiệu Suất Tải Trang

**Mô Tả**: Đảm bảo tải trang <3 giây

**Thành Phần**:

- Code splitting
- CSS tối thiểu
- JS bundle <100KB gzipped
- Preload/Prefetch tối ưu

**Tiêu Chí Chấp Nhận**: US-001

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

## DANH MỤC TÍNH NĂNG PHASE 2: TÀI KHOẢN & CÁ NHÂN HÓA

### 1. Tính Năng Xác Thực

#### F2.1: Đăng Ký Tài Khoản

**Mô Tả**: Cho phép người dùng tạo tài khoản mới

**Thành Phần**:

- Biểu mẫu đăng ký (Email, Mật Khẩu, Tên)
- Xác thực email
- Hashing mật khẩu với bcrypt
- Xác nhận mật khẩu

**Tiêu Chí Chấp Nhận**: US-006

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F2.2: Đăng Nhập Tài Khoản

**Mô Tả**: Cho phép người dùng đăng nhập

**Thành Phần**:

- Biểu mẫu đăng nhập (Email, Mật Khẩu)
- Tạo JWT token
- Session management
- "Ghi Nhớ Tôi"

**Tiêu Chí Chấp Nhận**: US-007

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 3 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F2.3: Quên Mật Khẩu

**Mô Tả**: Cho phép người dùng đặt lại mật khẩu

**Thành Phần**:

- Liên kết "Quên Mật Khẩu"
- Gửi email đặt lại
- Liên kết hết hạn sau 1 giờ
- Tạo mật khẩu mới

**Tiêu Chí Chấp Nhận**: US-008

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

### 2. Tính Năng Lưu Trữ & Lịch Sử

#### F2.4: Đánh Dấu Bài Viết

**Mô Tả**: Cho phép người dùng lưu bài viết yêu thích

**Thành Phần**:

- Nút "Đánh Dấu" trên trang chi tiết
- Lưu vào "Danh Sách Lưu Trữ"
- Bỏ đánh dấu bằng cách nhấp lại
- Hiển thị danh sách lưu trữ

**Tiêu Chí Chấp Nhận**: US-005

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F2.5: Lịch Sử Đọc

**Mô Tả**: Theo dõi bài viết mà người dùng đã đọc

**Thành Phần**:

- Trang "Lịch Sử Đọc" trong hồ sơ
- Danh sách bài viết gần đây
- Ngày/thời gian đọc
- Xóa lịch sử

**Tiêu Chí Chấp Nhận**: US-009

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 3 điểm

**Trạng Thái**: ⏳ Chờ

---

### 3. Tính Năng Cá Nhân Hóa

#### F2.6: Tùy Chọn Người Dùng

**Mô Tả**: Cho phép người dùng tùy chỉnh trải nghiệm

**Thành Phần**:

- Chủ Đề (Sáng/Tối)
- Danh Mục Ưa Thích
- Kích Thước Font (Normal/Lớn)
- Ngôn Ngữ (Tiếng Việt/English)

**Tiêu Chí Chấp Nhận**: US-010

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 3 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F2.7: Trang Hồ Sơ Người Dùng

**Mô Tả**: Hiển thị thông tin hồ sơ người dùng

**Thành Phần**:

- Thông tin cá nhân (Tên, Email, Ảnh đại diện)
- Thống kê (Bài viết đã đọc, Ngày tham gia)
- Nút Chỉnh Sửa Hồ Sơ
- Nút Đăng Xuất

**Tiêu Chí Chấp Nhận**: F2.6

**Ưu Tiên**: Trung Bình

**Kích Cỡ Công Việc**: 3 điểm

**Trạng Thái**: ⏳ Chờ

---

## DANH MỤC TÍNH NĂNG PHASE 3: KIẾM TIỀN & XUẤT BẢN

### 1. Tính Năng Đăng Ký

#### F3.1: Mô Hình Đăng Ký

**Mô Tả**: Xác định 3 gói đăng ký

**Thành Phần**:

- **Basic (Miễn Phí)**: Truy cập cơ bản, có quảng cáo
- **Premium ($4.99/tháng)**: Không quảng cáo, nội dung cao cấp
- **Premium+ ($9.99/tháng)**: Không quảng cáo, nội dung độc quyền, hỗ trợ ưu tiên

**Tiêu Chí Chấp Nhận**: US-013, US-014, US-015

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F3.2: Thanh Toán & Đơn Đặt Hàng

**Mô Tả**: Tích hợp thanh toán Stripe

**Thành Phần**:

- Tích hợp Stripe API
- Hỗ trợ thẻ tín dụng
- Tạo đơn đặt hàng
- Hoàn tiền

**Tiêu Chí Chấp Nhận**: US-013

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 8 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F3.3: Nội Dung Cao Cấp

**Mô Tả**: Bảo vệ nội dung dành cho người đăng ký cao cấp

**Thành Phần**:

- Đánh dấu bài viết là "Premium"
- Hiển thị tóm tắt cho người không Premium
- Kiểm tra mức đăng ký trước khi hiển thị nội dung
- Nút "Nâng Cấp Ngay"

**Tiêu Chí Chấp Nhận**: US-014

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

### 2. Tính Năng Quản Lý Nội Dung

#### F3.4: Bảng Điều Khiển Tác Giả

**Mô Tả**: Giao diện để tác giả quản lý bài viết

**Thành Phần**:

- Danh sách bài viết của tác giả
- Trạng thái (Nháp, Chờ Thẩm Duyệt, Được Phê Duyệt)
- Phân tích (Lượt Xem, Thời Gian Đọc)
- Nút "Viết Bài Viết Mới"

**Tiêu Chí Chấp Nhận**: US-011

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 8 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F3.5: Viết/Chỉnh Sửa Bài Viết

**Mô Tả**: Cho phép tác giả viết bài viết

**Thành Phần**:

- Trình soạn thảo WYSIWYG
- Hỗ trợ Markdown
- Tải lên hình ảnh
- Lưu nháp tự động
- Xem trước

**Tiêu Chí Chấp Nhận**: US-011

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 8 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F3.6: Bảng Điều Khiển Biên Tập

**Mô Tả**: Giao diện để biên tập viên thẩm duyệt bài viết

**Thành Phần**:

- Danh sách bài viết chờ thẩm duyệt
- Xem toàn bộ nội dung
- Thêm nhận xét
- Phê Duyệt/Từ Chối

**Tiêu Chí Chấp Nhận**: US-012

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 8 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F3.7: Nhận Xét Nội Tuyến

**Mô Tả**: Cho phép biên tập viên nhận xét nội dung

**Thành Phần**:

- Nhận xét từng đoạn văn
- Ghi chú cho tác giả
- Đề xuất sửa đổi
- Thông báo cho tác giả

**Tiêu Chí Chấp Nhận**: US-012

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

## DANH MỤC TÍNH NĂNG PHASE 4: PHƯƠNG TIỆN ĐA PHƯƠNG

### 1. Tính Năng Video & Phương Tiện

#### F4.1: Trình Phát Video

**Mô Tả**: Nhúng và phát video

**Thành Phần**:

- Hỗ trợ YouTube, Vimeo
- Điều khiển phát lại
- Chế độ toàn màn hình
- Responsive player

**Tiêu Chí Chấp Nhận**: US-016

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 8 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F4.2: Thư Viện Hình Ảnh

**Mô Tả**: Hiển thị bộ sưu tập ảnh

**Thành Phần**:

- Gallery grid layout
- Lightbox viewer
- Phần đóng/mở
- Hỗ trợ vuốt di động

**Tiêu Chí Chấp Nhận**: F4.1

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 8 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F4.3: Phát Podcast

**Mô Tả**: Phát podcast

**Thành Phần**:

- Trình phát âm thanh tùy chỉnh
- Điều khiển Phát/Tạm Dừng
- Thanh tiến độ
- Tốc độ phát

**Tiêu Chí Chấp Nhận**: F4.1

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 8 điểm

**Trạng Thái**: ⏳ Chờ

---

## DANH MỤC TÍNH NĂNG PHASE 5: KHUYẾN NGHỊ & THÔNG BÁO

### 1. Tính Năng Khuyến Nghị

#### F5.1: Công Cụ Khuyến Nghị

**Mô Tả**: Khuyến nghị bài viết được cá nhân hóa

**Thành Phần**:

- Lọc cộng tác
- Thuật toán học máy
- Xử lý lịch sử đọc
- Phần "Khuyến Nghị Cho Bạn"

**Tiêu Chí Chấp Nhận**: US-017

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 13 điểm

**Trạng Thái**: ⏳ Chờ

---

### 2. Tính Năng Thông Báo

#### F5.2: Hệ Thống Thông Báo

**Mô Tả**: Gửi thông báo tin tức cho người dùng

**Thành Phần**:

- Thông báo trong ứng dụng
- Thông báo email
- Tùy chọn cấu hình
- Lập lịch thông báo

**Tiêu Chí Chấp Nhận**: US-018

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 8 điểm

**Trạng Thái**: ⏳ Chờ

---

#### F5.3: Tóm Tắt Hàng Ngày

**Mô Tả**: Gửi tóm tắt tin tức hàng ngày

**Thành Phần**:

- Bộ sưu tập bài viết hàng ngày
- Tóm tắt bài viết
- Email layout được thiết kế
- Liên kết đến bài viết

**Tiêu Chí Chấp Nhận**: F5.2

**Ưu Tiên**: Cao

**Kích Cỡ Công Việc**: 5 điểm

**Trạng Thái**: ⏳ Chờ

---

---

## TỔNG KHOÁ TÍNH NĂNG

| Phase    | Tính Năng Chính         | Số Lượng | Trạng Thái |
| -------- | ----------------------- | -------- | ---------- |
| Phase 1  | Đọc Tin Tức Cốt Lõi     | 10       | ⏳         |
| Phase 2  | Tài Khoản & Cá Nhân Hóa | 7        | ⏳         |
| Phase 3  | Kiếm Tiền & Xuất Bản    | 7        | ⏳         |
| Phase 4  | Phương Tiện Đa Phương   | 3        | ⏳         |
| Phase 5  | Khuyến Nghị & Thông Báo | 3        | ⏳         |
| **TỔNG** | **Tất Cả Tính Năng**    | **30**   |            |

---

## Huyết Lệnh Nhận Dạng Tính Năng

- **Trạng Thái**: ⏳ (Chờ), 🔨 (Trong Tiến Hành), ✅ (Hoàn Thành)
- **Ưu Tiên**: Cao (Bắt Buộc), Trung Bình (Nên), Thấp (Có Thể)
- **Kích Cỡ**: 3 (Nhỏ), 5 (Vừa), 8 (Lớn), 13 (Rất Lớn)

---

## Tiêu Chí Tính Năng Hoàn Chỉnh

Một tính năng được coi là **hoàn chỉnh** khi:

✅ Tất cả User Stories được triển khai  
✅ Unit test coverage ≥ 80%  
✅ Kiểm tra UX/UI  
✅ Kiểm tra truy cập  
✅ Kiểm tra hiệu suất  
✅ Code review được phê duyệt  
✅ Triển khai lên staging thành công  
✅ QA xác nhận không có lỗi quan trọng  
✅ Có tài liệu người dùng
