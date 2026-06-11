# Quick Start - Bắt Đầu Nhanh Giao Diện Dashboard

## 🚀 Chạy Dự Án

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy development server
npm run dev

# 3. Truy cập website
# Mở browser và vào: http://localhost:5173
```

---

## 📍 Truy Cập Các Dashboard

### 🏠 Trang Chủ
```
http://localhost:5173/
```

### ✍️ Author Dashboard (Tác Giả)
```
http://localhost:5173/author
```
**Tính năng:**
- Tạo bài viết mới
- Quản lý bài nháp
- Theo dõi bài chờ duyệt
- Xem bài đã đăng

### 📋 Editor Dashboard (Biên Tập Viên)
```
http://localhost:5173/editor
```
**Tính năng:**
- Xem danh sách bài chờ duyệt
- Duyệt/Từ chối bài viết
- Chỉnh sửa bài viết
- Xem hướng dẫn chỉnh sửa

### ⚙️ Admin Dashboard (Quản Trị Viên)
```
http://localhost:5173/admin
```
**Tính năng:**
- Xem thống kê toàn bộ hệ thống
- Quản lý bài viết, người dùng
- Quản lý chuyên mục, biên tập viên
- Cài đặt hệ thống

---

## 🎯 Các Vai Trò & Quyền Hạn

### 👤 Author (Tác Giả/Phóng Viên)
- Viết bài viết mới
- Lưu bài nháp
- Gửi bài để duyệt
- Quản lý bài riêng
- Cập nhật hồ sơ cá nhân

### ✏️ Editor (Biên Tập Viên)
- Duyệt/Từ chối bài viết
- Chỉnh sửa bài viết
- Xem danh sách bài chờ duyệt
- Xem hướng dẫn chỉnh sửa
- Quản lý hồ sơ cá nhân

### 🔐 Admin (Quản Trị Viên)
- Tất cả quyền của Editor
- Quản lý toàn bộ bài viết
- Quản lý người dùng & biên tập viên
- Quản lý chuyên mục
- Cài đặt hệ thống
- Xem thống kê & báo cáo

---

## 📊 Workflow Xuất Bản Bài Viết

```
1. Author viết bài → Lưu nháp
   ↓
2. Author gửi duyệt
   ↓
3. Editor kiểm tra
   ├─→ Duyệt ngay → Xuất bản
   ├─→ Chỉnh sửa & Duyệt → Xuất bản
   └─→ Từ chối → Author sửa & gửi lại
```

---

## 🎨 Giao Diện & Các Biểu Tượng

### Header Icons (sau khi đăng nhập)
- **✍️** (Pen) = Author Dashboard
- **📋** (Clipboard) = Editor Dashboard
- **⚙️** (Gear) = Admin Dashboard

### Sidebar Menu Icons
- **📊** = Dashboard/Tổng quan
- **📝** = Bài viết
- **📂** = Chuyên mục
- **👥** = Người dùng
- **✏️** = Biên tập viên
- **⚙️** = Cài đặt

### Status Badges
- **✅ Duyệt** = Bài được duyệt
- **❌ Từ chối** = Bài bị từ chối
- **⏳ Chờ duyệt** = Bài chờ được duyệt
- **📰 Đã đăng** = Bài được xuất bản
- **📝 Nháp** = Bài còn lưu nháp

---

## 🔗 File & Folder Structure

```
src/
├── client/
│   ├── pages/
│   │   ├── author/
│   │   │   ├── AuthorDashboard.jsx
│   │   │   └── AuthorDashboard.module.css
│   │   ├── editor/
│   │   │   ├── EditorDashboard.jsx
│   │   │   └── EditorDashboard.module.css
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminDashboard.module.css
│   │   └── ...
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   └── App/
│       └── App.jsx
└── utils/
    └── mockData.js
```

---

## 📚 Tài Liệu Chi Tiết

Có sẵn 4 file hướng dẫn:

1. **AUTHOR_DASHBOARD_GUIDE.md** - Hướng dẫn Author Dashboard
2. **EDITOR_DASHBOARD_GUIDE.md** - Hướng dẫn Editor Dashboard
3. **ADMIN_DASHBOARD_GUIDE.md** - Hướng dẫn Admin Dashboard
4. **DASHBOARDS_OVERVIEW.md** - Tổng hợp tất cả dashboard

---

## 🐛 Troubleshooting

### Dashboard không hiển thị
- Kiểm tra URL: `/author`, `/editor`, `/admin`
- Xóa cache browser (Ctrl+Shift+Delete)
- Reload trang (F5)

### Sidebar không xuất hiện
- Kiểm tra import trong App.jsx
- Xem console cho lỗi (F12)

### CSS không load đúng
- Kiểm tra tên class trong CSS Module
- Xác nhận import styles đúng

### Biểu tượng không hiển thị
- Sử dụng emoji trực tiếp (✍️, 📋, ⚙️)
- Kiểm tra font support

---

## ✨ Demo Features

### Author Dashboard
- ✅ 6 stat cards (Nháp, Chờ duyệt, Đã đăng, Lượt xem)
- ✅ Rich text editor với toolbar
- ✅ Quản lý bài viết theo trạng thái
- ✅ Profile panel

### Editor Dashboard
- ✅ 4 stat cards (Chờ duyệt, Đã duyệt, Từ chối, Đã xuất bản)
- ✅ Review cards chi tiết
- ✅ 3 nút hành động (Từ chối, Chỉnh sửa, Duyệt)
- ✅ Hướng dẫn chỉnh sửa
- ✅ Bảng danh sách bài viết

### Admin Dashboard
- ✅ 6 stat cards toàn hệ thống
- ✅ Biểu đồ bài viết theo trạng thái
- ✅ Hoạt động gần đây
- ✅ Quản lý CRUD đầy đủ
- ✅ Cài đặt hệ thống

---

## 🚀 Next Steps

Sau khi làm quen với giao diện:

1. **Xem các file hướng dẫn chi tiết**
   ```
   docs/AUTHOR_DASHBOARD_GUIDE.md
   docs/EDITOR_DASHBOARD_GUIDE.md
   docs/ADMIN_DASHBOARD_GUIDE.md
   ```

2. **Tìm hiểu code**
   - Xem structure của các component
   - Hiểu CSS Modules
   - Học React hooks (useState, useEffect)

3. **Tùy chỉnh giao diện**
   - Thay đổi màu sắc
   - Thêm icon/emoji
   - Điều chỉnh layout

4. **Kết nối API (Phase 2)**
   - Thay mock data bằng API thực
   - Thêm form validation
   - Implement authentication

---

## 💡 Tips & Tricks

- **Dark Mode**: Tất cả dashboard sử dụng dark theme
- **Responsive**: Thay đổi kích thước browser để thử responsive
- **Sidebar Navigation**: Dễ dàng chuyển đổi giữa các mục
- **Quick Access**: Dùng icon trong header để truy cập nhanh
- **Badge Notifications**: Số badge trên menu cho biết số lượng cần xử lý

---

**Phiên bản**: 1.0  
**Cập nhật lần cuối**: 11/06/2026  

💬 **Cần giúp đỡ?** Xem các file .md trong project hoặc kiểm tra console (F12) để xem lỗi.
