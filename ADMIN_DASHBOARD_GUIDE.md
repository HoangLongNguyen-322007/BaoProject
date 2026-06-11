# Giao Diện Quản Trị - Hướng Dẫn Sử Dụng

## Giới Thiệu
Giao diện Admin Dashboard cung cấp toàn bộ công cụ quản lý hệ thống website Báo Rồng Vàng, từ quản lý bài viết, người dùng, biên tập viên cho đến cài đặt hệ thống.

## Cách Truy Cập

### Cách 1: Thông qua URL
- Truy cập trực tiếp: `http://localhost:5173/admin` (hoặc port Vite của bạn)

### Cách 2: Thông qua Header (khi đã đăng nhập với quyền Admin)
- Đăng nhập vào tài khoản có vai trò Admin
- Trên thanh header, bên cạnh avatar người dùng sẽ có biểu tượng ⚙️ (quản lý hệ thống)
- Click vào biểu tượng này để truy cập vào Admin Dashboard

## Các Tính Năng Chính

### 1. **Bảng Điều Khiển (Dashboard)**
Cung cấp cái nhìn toàn cảnh về hoạt động của website:

**Thống Kê Chính:**
- 📰 **Tổng bài viết**: 1,245
- 👥 **Tác giả**: 127
- ✏️ **Biên tập viên**: 23
- 👁️ **Tổng lượt xem**: 156.8K
- 💬 **Bình luận**: 3,421
- 📂 **Chuyên mục**: 12

**Biểu Đồ & Thống Kê:**
- **Bài viết theo trạng thái**: Hiển thị biểu đồ cột với phân bố:
  - Nháp: 245 bài
  - Chờ duyệt: 98 bài
  - Đã duyệt: 654 bài
  - Từ chối: 145 bài

- **Hoạt động gần đây**: Danh sách 4 hoạt động mới nhất:
  - 📰 Xuất bản bài viết
  - 👤 Người dùng mới đăng ký
  - ✏️ Bài viết được sửa
  - ❌ Bài viết bị từ chối

### 2. **Bài Chờ Duyệt & Bài Đã Duyệt**
*(Quick access từ sidebar)*
- Xem nhanh danh sách bài viết chờ duyệt (badge hiển thị số lượng)
- Xem danh sách bài viết đã được duyệt
- Tương tự như Editor Dashboard nhưng với quyền admin cao hơn

### 3. **Quản Lý Bài Viết**
Quản lý toàn bộ bài viết trên hệ thống

**Tính năng:**
- 🔍 **Tìm kiếm**: Tìm bài viết theo tiêu đề, tác giả, nội dung
- 🔖 **Lọc theo trạng thái**: 
  - Tất cả trạng thái
  - Nháp
  - Chờ duyệt
  - Đã duyệt
  - Đã đăng

**Bảng quản lý hiển thị:**
- ID bài viết
- Tiêu đề
- Tác giả
- Trạng thái (Badge: Đã đăng, Chờ duyệt, Nháp...)
- Ngày tạo
- **Hành động**:
  - 👁️ **Xem**: Xem bài viết
  - ✏️ **Sửa**: Chỉnh sửa bài viết
  - 🗑️ **Xóa**: Xóa bài viết

**Thêm bài viết mới:** Click nút "+ Bài viết mới" để tạo bài viết trong hệ thống

### 4. **Quản Lý Chuyên Mục**
Quản lý toàn bộ danh mục/chuyên mục bài viết

**Tính năng:**
- **Thẻ chuyên mục** hiển thị:
  - Màu sắc đại diện
  - Tên chuyên mục
  - Số lượng bài viết trong chuyên mục
  - Nút Sửa & Xóa

**Hành động:**
- ➕ **Thêm chuyên mục**: Click nút "+ Thêm chuyên mục"
- ✏️ **Sửa**: Chỉnh sửa tên, mô tả, màu sắc chuyên mục
- 🗑️ **Xóa**: Xóa chuyên mục (nếu không có bài viết)

### 5. **Quản Lý Người Dùng**
Quản lý toàn bộ người dùng tạo tài khoản trên website

**Tính năng:**
- 🔍 **Tìm kiếm**: Tìm người dùng theo tên, email
- 🔖 **Lọc theo vai trò**:
  - Tất cả vai trò
  - Author (Tác giả)
  - Editor (Biên tập viên)
  - Admin

**Bảng quản lý hiển thị:**
- ID
- Tên người dùng
- Email
- Vai trò (Author, Editor, Admin)
- Ngày tham gia
- **Hành động**:
  - 👁️ **Chi tiết**: Xem thông tin chi tiết
  - ✏️ **Sửa**: Chỉnh sửa thông tin, đổi vai trò
  - 🔒 **Khóa**: Khóa/deactivate tài khoản

### 6. **Quản Lý Biên Tập Viên**
Quản lý toàn bộ biên tập viên trên hệ thống

**Bảng quản lý hiển thị:**
- Tên biên tập viên
- Email
- Cấp độ (Cấp 1, Cấp 2, Cấp 3)
- Bài duyệt (số lượng)
- Duyệt thành công (số lượng)
- **Hành động**:
  - ✏️ **Sửa**: Chỉnh sửa thông tin, nâng/hạ cấp
  - 🗑️ **Xóa**: Xóa biên tập viên

**Thêm biên tập viên mới:** Click nút "+ Thêm biên tập viên"

### 7. **Cài Đặt Hệ Thống**
Cấu hình các tham số chính của website

**Thông Tin Chung:**
- Tên trang web: "Báo Rồng Vàng"
- Mô tả
- Email liên hệ

**Cài Đặt Nội Dung:**
- Bài viết trên trang: Số lượng bài viết hiển thị mỗi trang (mặc định: 12)
- ☑ Yêu cầu duyệt bài trước khi xuất bản
- ☑ Cho phép bình luận trên bài viết
- ☐ Duyệt bình luận trước khi hiển thị

**Bảo Mật:**
- Thời hạn hết hạn phiên (phút): Timeout cho phiên đăng nhập
- ☑ Bật 2FA (Two-Factor Authentication)

**Lưu cài đặt:** Click nút "💾 Lưu cài đặt" để lưu các thay đổi

## Sidebar Navigation

Sidebar bên trái cung cấp quick access đến các phần chính:

- **📊 Bảng điều khiển**: Dashboard chính
- **📋 Bài chờ duyệt** (3): Bài viết chờ duyệt (badge = số lượng)
- **✅ Bài đã duyệt** (8): Bài viết đã duyệt
- **📝 Quản lý bài viết**: Quản lý toàn bộ bài viết
- **📂 Quản lý chuyên mục**: Quản lý danh mục
- **👥 Quản lý người dùng**: Quản lý tài khoản
- **✏️ Quản lý biên tập viên**: Quản lý biên tập viên
- **📄 Quản lý cộng tác viên**: Quản lý cộng tác viên (contributor)
- **⚙️ Cài đặt hệ thống**: Cấu hình website

## Giao Diện & Thiết Kế

- **Giao diện tối (Dark Theme)**: Dễ chịu khi làm việc lâu
- **Sidebar navigation**: Điều hướng nhanh chóng
- **Tables & Cards**: Hiển thị dữ liệu rõ ràng và dễ quản lý
- **Color scheme**:
  - Vàng (#e4b24a) cho các hành động chính
  - Cam (#ff9800) cho cảnh báo
  - Đỏ (#f44336) cho xóa/nguy hiểm
  - Xanh lá (#4caf50) cho thành công
- **Responsive**: Hoạt động tốt trên desktop, tablet, mobile

## Quyền Hạn Admin

Với vai trò Admin, bạn có thể:
- ✅ Quản lý toàn bộ bài viết
- ✅ Duyệt/từ chối bài viết
- ✅ Quản lý người dùng, biên tập viên
- ✅ Tạo/sửa/xóa chuyên mục
- ✅ Cấu hình hệ thống
- ✅ Xem thống kê và báo cáo
- ✅ Quản lý cài đặt bảo mật

## Cách Chạy Dự Án

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Truy cập vào http://localhost:5173 (hoặc port được in ra)
# Sau đó vào /admin để xem Admin Dashboard
```

## Tệp Liên Quan

- **Component chính**: `/src/client/pages/admin/AdminDashboard.jsx`
- **Styles**: `/src/client/pages/admin/AdminDashboard.module.css`
- **Route**: `/src/client/App/App.jsx` (route `/admin`)
- **Header update**: `/src/client/components/Header.jsx` (thêm link admin)

## Ghi Chú

- Dữ liệu hiện tại sử dụng MOCK_ARTICLES và mock data từ `/src/utils/mockData.js`
- Trong phase 2, cần kết nối API thực tế để:
  - Lấy danh sách bài viết, người dùng
  - Thực hiện CRUD operations (Create, Read, Update, Delete)
  - Lưu cài đặt hệ thống
  - Quản lý quyền hạn người dùng
- Form hiện tại là mô phỏng, cần thêm validation
- Các biểu đồ cần tích hợp thư viện chart (Chart.js, ApexCharts, etc.)

## User Workflow

```
Admin
  ├─→ Xem Dashboard (Thống kê tổng quát)
  ├─→ Quản lý Bài Viết (CRUD)
  ├─→ Quản lý Chuyên Mục (CRUD)
  ├─→ Quản lý Người Dùng (CRUD, Phân quyền)
  ├─→ Quản lý Biên Tập Viên (CRUD, Nâng/Hạ cấp)
  └─→ Cài Đặt Hệ Thống (Config)
```

---
**Phiên bản**: 1.0  
**Cập nhật lần cuối**: 11/06/2026
