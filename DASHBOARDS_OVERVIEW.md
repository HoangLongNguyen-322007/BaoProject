# Tổng Hợp Giao Diện Dashboard - Báo Rồng Vàng

## 📊 Tổng Quan

Website Báo Rồng Vàng hiện có 3 giao diện quản lý chính:

1. **Author Dashboard** (✍️) - Cho Tác Giả/Phóng Viên
2. **Editor Dashboard** (📋) - Cho Biên Tập Viên
3. **Admin Dashboard** (⚙️) - Cho Quản Trị Viên

---

## 1️⃣ Author Dashboard (Tác Giả)

### 🔗 URL: `/author`
### 🎯 Vai Trò: Tác giả báo, Phóng viên

### ✨ Tính Năng:
- **Tổng Quan**: Thống kê bài nháp, bài chờ duyệt, bài đã đăng, tổng lượt xem
- **Tạo Bài Viết Mới**: Rich text editor với:
  - Nhập tiêu đề, chọn chuyên mục
  - Toolbar định dạng (B, I, U, danh sách, quote, liên kết, hình ảnh, video)
  - Nút "Lưu nháp" và "Gửi duyệt"
- **Quản Lý Bài Viết**:
  - Nháp (Drafts)
  - Chờ duyệt (Pending)
  - Đã đăng (Published)
- **Hồ Sơ Cá Nhân**: Thông tin, thống kê, cập nhật thông tin

### 📁 Files:
- `/src/client/pages/author/AuthorDashboard.jsx`
- `/src/client/pages/author/AuthorDashboard.module.css`

---

## 2️⃣ Editor Dashboard (Biên Tập Viên)

### 🔗 URL: `/editor`
### 🎯 Vai Trò: Biên tập viên, Chỉnh sửa bài viết

### ✨ Tính Năng:
- **Bảng Điều Khiển**: Thống kê chờ duyệt, đã duyệt, từ chối, đã xuất bản
- **Bài Chờ Duyệt**: Review cards với:
  - Thông tin tác giả, tiêu đề, tóm tắt, metadata
  - Hình ảnh bài viết
  - 3 nút hành động: Từ chối, Chỉnh sửa & Duyệt, Duyệt ngay
- **Bài Đã Duyệt**: Danh sách bài đã được duyệt
- **Bài Bị Từ Chối**: Danh sách bài bị từ chối + lý do
- **Bài Đã Đăng**: Danh sách bài xuất bản + lượt xem
- **Hướng Dẫn Chỉnh Sửa**: Tiêu chí duyệt, chiều dài, hướng dẫn, lý do từ chối
- **Hồ Sơ Cá Nhân**: Thông tin biên tập viên, thống kê

### 📁 Files:
- `/src/client/pages/editor/EditorDashboard.jsx`
- `/src/client/pages/editor/EditorDashboard.module.css`

---

## 3️⃣ Admin Dashboard (Quản Trị Viên)

### 🔗 URL: `/admin`
### 🎯 Vai Trò: Quản trị hệ thống, Quản lý toàn bộ

### ✨ Tính Năng:
- **Bảng Điều Khiển**:
  - 6 thẻ thống kê chính (Bài viết, Tác giả, Biên tập viên, Lượt xem, Bình luận, Chuyên mục)
  - Biểu đồ bài viết theo trạng thái
  - Danh sách hoạt động gần đây

- **Quản Lý Bài Viết**:
  - Tìm kiếm, lọc theo trạng thái
  - Bảng CRUD: Xem, Sửa, Xóa bài viết
  - Tạo bài viết mới

- **Quản Lý Chuyên Mục**:
  - Grid thẻ chuyên mục (Màu sắc, tên, số bài viết)
  - Thêm, Sửa, Xóa chuyên mục

- **Quản Lý Người Dùng**:
  - Tìm kiếm, lọc theo vai trò
  - Bảng: Chi tiết, Sửa, Khóa tài khoản

- **Quản Lý Biên Tập Viên**:
  - Bảng: Cấp độ, bài duyệt, thống kê
  - Sửa, Xóa biên tập viên

- **Cài Đặt Hệ Thống**:
  - Thông tin chung (Tên site, Mô tả, Email)
  - Cài đặt nội dung (Bài/trang, Duyệt bài, Cho phép bình luận)
  - Bảo mật (Timeout, 2FA)

### 📁 Files:
- `/src/client/pages/admin/AdminDashboard.jsx`
- `/src/client/pages/admin/AdminDashboard.module.css`

---

## 🚀 Cách Truy Cập

### Từ URL Trực Tiếp:
```
http://localhost:5173/author
http://localhost:5173/editor
http://localhost:5173/admin
```

### Từ Header (khi đã đăng nhập):
Bên cạnh avatar người dùng sẽ có các icon:
- **✍️** = Author Dashboard
- **📋** = Editor Dashboard  
- **⚙️** = Admin Dashboard

---

## 🎨 Thiết Kế

### Color Scheme:
- **Vàng** (#e4b24a): Hành động chính, duyệt bài
- **Cam** (#ff9800): Chỉnh sửa, cảnh báo
- **Đỏ** (#f44336): Từ chối, xóa, nguy hiểm
- **Xanh lá** (#4caf50): Thành công, đã duyệt
- **Xanh dương** (#45b7d1): Biên tập viên

### Giao Diện:
- Dark theme phù hợp brand
- Sidebar navigation
- Responsive design (Desktop, Tablet, Mobile)
- Smooth transitions & hover effects

---

## 📋 Workflow Hoàn Chỉnh

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHOR (Tác Giả)                         │
│ Viết bài → Lưu nháp → Hoàn thành → Gửi duyệt              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   EDITOR (Biên Tập Viên)                    │
│ Kiểm tra chất lượng                                          │
│ ├─→ ✅ Duyệt ngay → Xuất bản                               │
│ ├─→ ✏️ Chỉnh sửa & Duyệt → Xuất bản                       │
│ └─→ ❌ Từ chối → Thông báo cho tác giả                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   ADMIN (Quản Trị Viên)                      │
│ Quản lý toàn bộ: Bài viết, Người dùng, Chuyên mục, Config  │
│ Giám sát hệ thống, Thống kê, Báo cáo                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Phân Quyền

| Chức Năng | Author | Editor | Admin |
|-----------|--------|--------|-------|
| Viết bài | ✅ | ❌ | ✅ |
| Duyệt bài | ❌ | ✅ | ✅ |
| Sửa bài của người khác | ❌ | ✅ | ✅ |
| Quản lý bài viết | ✅ | ❌ | ✅ |
| Quản lý người dùng | ❌ | ❌ | ✅ |
| Quản lý chuyên mục | ❌ | ❌ | ✅ |
| Cài đặt hệ thống | ❌ | ❌ | ✅ |

---

## 📱 Responsive Design

Tất cả dashboard đều được tối ưu cho:
- **Desktop** (1200px+): Hiển thị đầy đủ
- **Tablet** (768px - 1024px): Điều chỉnh layout
- **Mobile** (<768px): Hiển thị thay thế cho bảng (card view)

---

## 🔄 Routes

| Đường dẫn | Component | Vai trò |
|-----------|-----------|--------|
| `/` | HomePage | Tất cả |
| `/author` | AuthorDashboard | Author+ |
| `/editor` | EditorDashboard | Editor+ |
| `/admin` | AdminDashboard | Admin |
| `/article/:id` | ArticleDetailPage | Tất cả |
| `/search` | SearchPage | Tất cả |
| `/category/:category` | CategoryPage | Tất cả |
| `/profile` | ProfileEditPage | Authenticated |
| `/login` | LoginPage | Guest |
| `/register` | RegisterPage | Guest |

---

## 📚 Tài Liệu Hướng Dẫn

Mỗi dashboard có file hướng dẫn chi tiết:
- `AUTHOR_DASHBOARD_GUIDE.md`
- `EDITOR_DASHBOARD_GUIDE.md`
- `ADMIN_DASHBOARD_GUIDE.md`

---

## 🛠️ Công Nghệ & Dependencies

- **React 19.2.6**: UI Library
- **React Router 7.16.0**: Routing
- **Vite 8.0.14**: Build tool
- **CSS Modules**: Styling

---

## 📝 Ghi Chú & Next Steps

### Current Status:
- ✅ Giao diện UI hoàn thành
- ✅ Routing cấu hình
- ✅ Mock data sử dụng
- ✅ Responsive design

### Phase 2 (To-Do):
- [ ] Kết nối API thực tế
- [ ] Xác thực & phân quyền
- [ ] Form validation
- [ ] Real-time notifications
- [ ] Advanced charts & analytics
- [ ] Export/Import features
- [ ] Audit logs

---

**Phiên bản**: 1.0  
**Cập nhật lần cuối**: 11/06/2026  
**Repository**: BaoProject (HoangLongNguyen-322007)
