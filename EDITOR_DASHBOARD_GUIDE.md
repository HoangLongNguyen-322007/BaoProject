# Giao Diện Duyệt Bài - Hướng Dẫn Sử Dụng

## Giới Thiệu
Giao diện Editor Dashboard được thiết kế cho phép các biên tập viên, phòng chỉnh sửa dễ dàng quản lý, duyệt và xuất bản bài viết trên website Báo Rồng Vàng.

## Cách Truy Cập

### Cách 1: Thông qua URL
- Truy cập trực tiếp: `http://localhost:5173/editor` (hoặc port Vite của bạn)

### Cách 2: Thông qua Header (khi đã đăng nhập)
- Đăng nhập vào tài khoản với vai trò biên tập viên
- Trên thanh header, bên cạnh avatar người dùng sẽ có biểu tượng 📋 (duyệt bài)
- Click vào biểu tượng này để truy cập vào Editor Dashboard

## Các Tính Năng Chính

### 1. **Bảng Điều Khiển (Dashboard)**
Hiển thị thống kê toàn cảnh công việc:
- **📋 Chờ duyệt**: Số lượng bài viết chưa được duyệt (hiển thị badge số lượng)
- **✅ Đã duyệt**: Số lượng bài viết đã được duyệt
- **❌ Từ chối**: Số lượng bài viết bị từ chối
- **📰 Đã xuất bản**: Số lượng bài viết đã được xuất bản

Phần "Bài viết chờ duyệt gần đây" hiển thị danh sách các bài viết cần được xử lý ưu tiên.

### 2. **Bài Chờ Duyệt (Pending)**
Danh sách tất cả bài viết đang chờ được duyệt với giao diện thẻ chi tiết:

Mỗi thẻ bài viết hiển thị:
- **Thông tin tác giả**: Avatar, tên, thời gian gửi
- **Chuyên mục**: Danh mục bài viết (Thời sự, Kinh tế, Công nghệ, v.v.)
- **Tiêu đề bài viết**: Tiêu đề chính
- **Tóm tắt**: Đoạn tóm tắt nội dung
- **Metadata**: Thời gian đọc, số từ
- **Hình ảnh**: Ảnh đại diện bài viết
- **3 nút hành động**:
  - **Từ chối**: Từ chối bài viết
  - **Chỉnh sửa & Duyệt**: Mở editor để chỉnh sửa rồi duyệt
  - **Duyệt ngay**: Duyệt bài viết mà không chỉnh sửa

### 3. **Bài Đã Duyệt (Approved)**
Danh sách các bài viết đã được duyệt nhưng chưa xuất bản

Bảng hiển thị:
- Tiêu đề bài viết
- Tác giả
- Ngày duyệt
- Trạng thái (✅ Duyệt)

### 4. **Bài Bị Từ Chối (Rejected)**
Danh sách các bài viết bị từ chối

Bảng hiển thị:
- Tiêu đề bài viết
- Tác giả
- Lý do từ chối
- Ngày từ chối

### 5. **Bài Đã Đăng (Published)**
Danh sách các bài viết đã được xuất bản

Bảng hiển thị:
- Tiêu đề bài viết
- Tác giả
- Ngày đăng
- Lượt xem

### 6. **Hướng Dẫn Chỉnh Sửa (Guidelines)**
Tài liệu hướng dẫn chi tiết bao gồm:

#### ✅ Tiêu Chí Duyệt Bài
- Tiêu đề rõ ràng, hấp dẫn và không lạm dụng từ khóa
- Nội dung không vi phạm chính sách nội dung
- Không chứa thông tin sai lệch hoặc tin giả
- Hình ảnh/video phải rõ ràng và liên quan đến nội dung
- Tôn trọng bản quyền và nguồn tin
- Không chứa spam hoặc quảng cáo che giấu

#### 📏 Chiều Dài Tối Thiểu/Tối Đa
- Tiêu đề: 10-100 ký tự
- Tóm tắt: 50-200 ký tự
- Nội dung: 300-5000 từ
- Thời gian đọc: 2-20 phút

#### 🎯 Hướng Dẫn Chỉnh Sửa
- Điều chỉnh tiêu đề để tăng độ hấp dẫn
- Kiểm tra chính tả và lỗi ngữ pháp
- Đảm bảo cấu trúc bài viết hợp lý
- Thêm các tiêu đề phụ để dễ đọc
- Xác minh các nguồn tin và dữ liệu
- Loại bỏ nội dung không liên quan

#### 🚫 Lý Do Từ Chối Bài
- Nội dung không phù hợp với chính sách
- Thông tin không được xác minh
- Vi phạm bản quyền hoặc sở hữu trí tuệ
- Chất lượng nội dung thấp
- Không phù hợp với tiêu chuẩn báo

### 7. **Hồ Sơ Cá Nhân (Profile)**
Thông tin và thống kê của biên tập viên:

**Thông tin cá nhân:**
- Họ tên
- Chức vụ (Biên Tập Viên Cấp 1, 2, 3...)
- Email
- Số điện thoại
- Chuyên mục duyệt trách nhiệm
- Ngày tham gia
- Cấp độ

**Thống kê cá nhân:**
- Bài đã duyệt (tổng số)
- Tỉ lệ duyệt (% bài được duyệt)
- Bài từ chối (tổng số)

**Hành động:**
- Cập nhật thông tin cá nhân
- Đổi mật khẩu

## Quy Trình Duyệt Bài Viết

### Bước 1: Xem Danh Sách
- Truy cập mục "Bài chờ duyệt"
- Xem danh sách các bài viết cần duyệt

### Bước 2: Kiểm Tra Chi Tiết
- Xem thông tin tác giả, tiêu đề, nội dung
- Xem hình ảnh đi kèm
- Kiểm tra metadata (thời gian đọc, số từ)

### Bước 3: Ra Quyết Định
Có 3 lựa chọn:

1. **Từ Chối**
   - Click nút "Từ chối"
   - Hệ thống sẽ gửi thông báo cho tác giả
   - Bài viết sẽ được chuyển sang danh sách "Bài bị từ chối"

2. **Chỉnh Sửa & Duyệt**
   - Click nút "Chỉnh sửa & Duyệt"
   - Mở editor để sửa tiêu đề, nội dung, hình ảnh
   - Lưu các thay đổi
   - Duyệt bài viết

3. **Duyệt Ngay**
   - Click nút "Duyệt ngay"
   - Bài viết sẽ được phê duyệt ngay lập tức
   - Chuyển sang danh sách "Bài đã duyệt"

### Bước 4: Xuất Bản
- Sau khi duyệt, bài viết sẽ tự động được đăng lên trang chủ
- Hoặc có thể lên lịch xuất bản

## Sidebar Navigation

Sidebar bên trái cung cấp quick access đến các phần chính:

- **📊 Tổng quan**: Bảng điều khiển chính
- **📋 Bài chờ duyệt** (3): Danh sách bài chờ duyệt (số badge = số lượng)
- **✅ Bài đã duyệt** (8): Danh sách bài đã duyệt
- **❌ Bài từ chối** (2): Danh sách bài bị từ chối
- **📰 Bài đã đăng** (15): Danh sách bài xuất bản
- **📝 Hướng dẫn chỉnh sửa**: Tài liệu hướng dẫn
- **👤 Hồ sơ cá nhân**: Thông tin cá nhân và cài đặt

## Giao Diện & Thiết Kế

- **Giao diện tối (Dark Theme)**: Dễ chịu khi làm việc lâu
- **Sidebar navigation**: Điều hướng nhanh chóng
- **Review Cards**: Hiển thị đầy đủ thông tin bài viết
- **Color scheme**: 
  - Vàng (#e4b24a) cho các hành động phê duyệt
  - Cam (#ff9800) cho chỉnh sửa
  - Đỏ (#f44336) cho từ chối
  - Xanh lá (#4caf50) cho trạng thái duyệt
- **Responsive**: Hoạt động tốt trên desktop, tablet, mobile

## Cách Chạy Dự Án

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Truy cập vào http://localhost:5173 (hoặc port được in ra)
# Sau đó vào /editor để xem Editor Dashboard
```

## Tệp Liên Quan

- **Component chính**: `/src/client/pages/editor/EditorDashboard.jsx`
- **Styles**: `/src/client/pages/editor/EditorDashboard.module.css`
- **Route**: `/src/client/App/App.jsx` (route `/editor`)
- **Header update**: `/src/client/components/Header.jsx` (thêm link editor)

## Ghi Chú

- Dữ liệu hiện tại sử dụng MOCK_ARTICLES từ `/src/utils/mockData.js`
- Trong phase 2, cần kết nối API thực tế để:
  - Lấy danh sách bài chờ duyệt
  - Lưu quyết định duyệt/từ chối
  - Gửi thông báo cho tác giả
  - Tự động xuất bản bài viết được duyệt
- Form hiện tại là mô phỏng, cần thêm xử lý form validation
- Chức năng rich text editor cần được tích hợp để chỉnh sửa

## Tích Hợp Giữa Author & Editor Dashboard

1. **Tác giả (Author)** viết bài → **Gửi duyệt**
2. **Biên tập viên (Editor)** nhận bài → Kiểm tra chất lượng
3. **Quyết định**:
   - ✅ Duyệt: Bài viết sẽ xuất bản
   - ❌ Từ chối: Gửi feedback cho tác giả
   - ✏️ Chỉnh sửa: Sửa lỗi rồi duyệt
4. **Tác giả** nhận thông báo → Có thể sửa và gửi lại (nếu bị từ chối)
5. **Xuất bản**: Bài viết được đăng lên trang chủ

---
**Phiên bản**: 1.0  
**Cập nhật lần cuối**: 11/06/2026
