# Giao Diện Tạo Bài Viết - Hướng Dẫn Sử Dụng

## Giới Thiệu
Giao diện Author Dashboard được thiết kế cho phép các nhà báo, phóng viên dễ dàng quản lý, tạo, và xuất bản bài viết trên website Báo Rồng Vàng.

## Cách Truy Cập

### Cách 1: Thông qua URL
- Truy cập trực tiếp: `http://localhost:5173/author` (hoặc port Vite của bạn)

### Cách 2: Thông qua Header (khi đã đăng nhập)
- Đăng nhập vào tài khoản
- Trên thanh header, bên cạnh avatar người dùng sẽ có biểu tượng ✍️ (viết bài)
- Click vào biểu tượng này để truy cập vào Author Dashboard

## Các Tính Năng Chính

### 1. **Tổng Quan (Dashboard)**
- Hiển thị thống kê:
  - **Nháp**: Số lượng bài viết đang lưu nháp
  - **Chờ duyệt**: Số lượng bài viết chờ được biên tập viên duyệt
  - **Đã đăng**: Số lượng bài viết đã được xuất bản
  - **Tổng lượt xem**: Tổng số lượt xem của tất cả bài viết
- Hiển thị danh sách bài viết gần đây

### 2. **Tạo Bài Viết Mới**
- Nhập tiêu đề bài viết
- Chọn chuyên mục (Thời sự, Kinh tế, Công nghệ, v.v.)
- Soạn thảo nội dung với Rich Text Editor:
  - **Định dạng text**: In đậm, in nghiêng, gạch dưới
  - **Danh sách**: Thêm bullet points hoặc danh sách có số thứ tự
  - **Trích dẫn**: Thêm quote blocks
  - **Liên kết**: Chèn hyperlinks
  - **Hình ảnh/Video**: Nhúng media
  - **Thêm nội dung**: Các tùy chọn định dạng khác

### 3. **Quản Lý Bài Viết**

#### Nháp (Drafts)
- Xem tất cả bài viết đang soạn thảo
- Chỉnh sửa bài viết
- Xóa bài viết
- Gửi bài viết để duyệt

#### Chờ Duyệt (Pending)
- Xem bài viết đã gửi cho biên tập viên duyệt
- Chỉnh sửa bài viết dựa trên feedback
- Theo dõi tiến độ duyệt bài

#### Đã Đăng (Published)
- Xem tất cả bài viết đã xuất bản
- Xem chi tiết và thống kê bài viết
- Chỉnh sửa bài viết đã đăng

### 4. **Hồ Sơ Cá Nhân**
- Hiển thị thông tin:
  - Tên tác giả
  - Chức vụ/vai trò
  - Email
  - Số điện thoại
  - Chuyên mục trách nhiệm
  - Ngày tham gia
- Thống kê cá nhân:
  - Tổng bài viết đã đăng
  - Tổng lượt xem
  - Tổng bình luận
- Cập nhật thông tin cá nhân
- Đổi mật khẩu

## Quy Trình Xuất Bản Bài Viết

1. **Soạn thảo**: Truy cập mục "Tạo bài viết mới"
2. **Lưu nháp**: Click "Lưu nháp" để lưu bài viết chưa hoàn thành
3. **Hoàn thành**: Soạn xong nội dung
4. **Gửi duyệt**: Click "Gửi duyệt" để gửi cho biên tập viên kiểm tra
5. **Chờ phê duyệt**: Biên tập viên sẽ duyệt bài viết
6. **Xuất bản**: Sau khi duyệt, bài viết sẽ được đăng lên trang chủ

## Giao Diện & Thiết Kế

- **Giao diện tối**: Thiết kế dark mode phù hợp với phong cách của Báo Rồng Vàng
- **Sidebar navigation**: Điều hướng nhanh giữa các mục chính
- **Responsive design**: Hoạt động tốt trên desktop, tablet, mobile
- **Color scheme**: Sử dụng vàng (#e4b24a) làm màu chủ đạo, tương thích với brand của báo

## Cách Chạy Dự Án

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Truy cập vào http://localhost:5173 (hoặc port được in ra)
# Sau đó vào /author để xem Author Dashboard
```

## Tệp Liên Quan

- **Component chính**: `/src/client/pages/author/AuthorDashboard.jsx`
- **Styles**: `/src/client/pages/author/AuthorDashboard.module.css`
- **Route**: `/src/client/App/App.jsx` (route `/author`)
- **Header update**: `/src/client/components/Header.jsx` (thêm link đến author dashboard)

## Ghi Chú

- Dữ liệu hiện tại sử dụng MOCK_ARTICLES từ `/src/utils/mockData.js`
- Trong phase 2, cần kết nối API thực tế để lưu, cập nhật bài viết
- Form hiện tại là mô phỏng, cần thêm xử lý form validation và error handling
- Chức năng rich text editor cần được tích hợp với thư viện như Quill hoặc TipTap

---
**Phiên bản**: 1.0  
**Cập nhật lần cuối**: 11/06/2026
