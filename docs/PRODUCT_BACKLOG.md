# Backlog Sản Phẩm - Báo Rồng Vàng

## Tổng Quát

Backlog sản phẩm Báo Rồng Vàng được ưu tiên theo Phase và Epic. Mỗi mục trong backlog được liên kết với User Story và Epic.

**Huyết**: Mỗi mục trong backlog có một:

- **ID Duy Nhất** (VD: PB-001)
- **Tiêu Đề**
- **Mô Tả**
- **Epic Liên Quan**
- **Kích Cỡ Công Việc** (XS, S, M, L, XL)
- **Ưu Tiên** (Cao, Trung Bình, Thấp)
- **Trạng Thái** (Chờ, Trong Tiến Hành, Hoàn Thành)

---

## PHASE 1: NỀN TẢNG MVP

### 1: Trang Chủ & Bài Viết

| ID     | Tiêu Đề                          | Epic         | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | -------------------------------- | ------------ | ------- | ---------- | ---------- |
| PB-001 | Xây Dựng Cấu Trúc Dự Án          | Nền Tảng MVP | XS      | Cao        | ⏳         |
| PB-002 | Thiết Kế Thành Phần ArticleCard  | Nền Tảng MVP | S       | Cao        | ⏳         |
| PB-003 | Xây Dựng Trang Chủ               | US-001       | M       | Cao        | ⏳         |
| PB-004 | Xây Dựng Trang Chi Tiết Bài Viết | US-004       | M       | Cao        | ⏳         |
| PB-005 | Tạo API Mock Cho Bài Viết        | Nền Tảng MVP | M       | Cao        | ⏳         |
| PB-006 | Tối Ưu Hóa Hình Ảnh              | Nền Tảng MVP | M       | Cao        | ⏳         |
| PB-007 | Thêm Responsive Design           | US-001       | M       | Cao        | ⏳         |
| PB-008 | Viết Unit Test Trang Chủ         | Nền Tảng MVP | M       | Trung Bình | ⏳         |

### 2: Tìm Kiếm & Lọc

| ID     | Tiêu Đề                           | Epic         | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | --------------------------------- | ------------ | ------- | ---------- | ---------- |
| PB-009 | Thanh Tìm Kiếm Trong Header       | US-002       | S       | Cao        | ⏳         |
| PB-010 | Trang Kết Quả Tìm Kiếm            | US-002       | M       | Cao        | ⏳         |
| PB-011 | Bộ Lọc Danh Mục                   | US-003       | S       | Cao        | ⏳         |
| PB-012 | Phân Trang                        | Nền Tảng MVP | M       | Cao        | ⏳         |
| PB-013 | Sắp Xếp Bài Viết (Ngày, Phổ Biến) | Nền Tảng MVP | S       | Trung Bình | ⏳         |
| PB-014 | Xử Lý Trạng Thái Trống            | Nền Tảng MVP | S       | Trung Bình | ⏳         |
| PB-015 | Viết Unit Test Tìm Kiếm           | Nền Tảng MVP | M       | Trung Bình | ⏳         |

### 3: Nội Dung & API

| ID     | Tiêu Đề                            | Epic         | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | ---------------------------------- | ------------ | ------- | ---------- | ---------- |
| PB-016 | Tạo Mock Data 100+ Bài Viết        | Nền Tảng MVP | M       | Cao        | ⏳         |
| PB-017 | Xác Định Cấu Trúc Dữ Liệu Bài Viết | Nền Tảng MVP | S       | Cao        | ⏳         |
| PB-018 | Xác Định Danh Mục Bài Viết         | Nền Tảng MVP | S       | Cao        | ⏳         |
| PB-019 | Bộ Lọc Bài Viết Nổi Bật            | Nền Tảng MVP | S       | Trung Bình | ⏳         |
| PB-020 | Bộ Lọc Bài Viết Xu Hướng           | Nền Tảng MVP | S       | Trung Bình | ⏳         |
| PB-021 | Hỗ Trợ Phân Trang 1000+ Bài Viết   | Nền Tảng MVP | M       | Cao        | ⏳         |
| PB-022 | Tối Ưu Hóa Truy Vấn API            | Nền Tảng MVP | M       | Cao        | ⏳         |

### 4: Chất Lượng & Tối Ưu Hóa

| ID     | Tiêu Đề                            | Epic         | Kích Cỡ | Ưu Tiên | Trạng Thái |
| ------ | ---------------------------------- | ------------ | ------- | ------- | ---------- |
| PB-023 | Đạt 80%+ Độ Phủ Unit Test          | Nền Tảng MVP | L       | Cao     | ⏳         |
| PB-024 | Viết Integration Test Cho Tìm Kiếm | Nền Tảng MVP | M       | Cao     | ⏳         |
| PB-025 | Kiểm Tra Truy Cập WCAG AA          | Nền Tảng MVP | M       | Cao     | ⏳         |
| PB-026 | Tối Ưu Hóa Hiệu Suất Lighthouse    | Nền Tảng MVP | L       | Cao     | ⏳         |
| PB-027 | Kiểm Tra Trình Duyệt Chéo          | Nền Tảng MVP | M       | Cao     | ⏳         |
| PB-028 | Sửa Lỗi và Tinh Chỉnh              | Nền Tảng MVP | M       | Cao     | ⏳         |

### 5: Triển Khai & Giám Sát

| ID     | Tiêu Đề                                | Epic         | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | -------------------------------------- | ------------ | ------- | ---------- | ---------- |
| PB-029 | Thiết Lập GitHub Actions CI/CD         | Nền Tảng MVP | M       | Cao        | ⏳         |
| PB-030 | Triển Khai Đến Staging                 | Nền Tảng MVP | M       | Cao        | ⏳         |
| PB-031 | Thiết Lập Giám Sát Lỗi (Sentry)        | Nền Tảng MVP | S       | Cao        | ⏳         |
| PB-032 | Thiết Lập Phân Tích (Google Analytics) | Nền Tảng MVP | S       | Trung Bình | ⏳         |
| PB-033 | Thử Tải Và Kế Hoạch Dung Lượng         | Nền Tảng MVP | M       | Cao        | ⏳         |
| PB-034 | Triển Khai Đến Sản Xuất                | Nền Tảng MVP | S       | Cao        | ⏳         |

---

## PHASE 2: TÀI KHOẢN & CÁ NHÂN HÓA

| ID     | Tiêu Đề                           | Epic                    | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | --------------------------------- | ----------------------- | ------- | ---------- | ---------- |
| PB-035 | Thiết Kế Cơ Sở Dữ Liệu Người Dùng | Tài Khoản & Cá Nhân Hóa | S       | Cao        | ⏳         |
| PB-036 | Xây Dựng Trang Đăng Ký            | US-006                  | M       | Cao        | ⏳         |
| PB-037 | Xây Dựng Trang Đăng Nhập          | US-007                  | S       | Cao        | ⏳         |
| PB-038 | Tích Hợp Xác Thực JWT             | Tài Khoản & Cá Nhân Hóa | M       | Cao        | ⏳         |
| PB-039 | Tính Năng Quên Mật Khẩu           | US-008                  | M       | Cao        | ⏳         |
| PB-040 | Tính Năng Đánh Dấu Bài Viết       | US-005                  | M       | Cao        | ⏳         |
| PB-041 | Danh Sách Lưu Trữ                 | US-005                  | S       | Cao        | ⏳         |
| PB-042 | Lịch Sử Đọc                       | US-009                  | M       | Cao        | ⏳         |
| PB-043 | Trang Cài Đặt Người Dùng          | US-010                  | M       | Cao        | ⏳         |
| PB-044 | Tùy Chọn Chủ Đề (Sáng/Tối)        | US-010                  | S       | Trung Bình | ⏳         |
| PB-045 | Tùy Chọn Danh Mục Ưa Thích        | US-010                  | S       | Trung Bình | ⏳         |
| PB-046 | Tùy Chọn Kích Thước Font          | US-010                  | S       | Thấp       | ⏳         |
| PB-047 | Trang Hồ Sơ Người Dùng            | Tài Khoản & Cá Nhân Hóa | S       | Trung Bình | ⏳         |
| PB-048 | Viết Unit Test Xác Thực           | Tài Khoản & Cá Nhân Hóa | M       | Cao        | ⏳         |

---

## PHASE 3: KIẾM TIỀN & XUẤT BẢN NỘI DUNG

| ID     | Tiêu Đề                       | Epic                | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | ----------------------------- | ------------------- | ------- | ---------- | ---------- |
| PB-049 | Thiết Kế Mô Hình Đăng Ký      | Kiếm Tiền & Đăng Ký | M       | Cao        | ⏳         |
| PB-050 | Tích Hợp Stripe Thanh Toán    | PB-049              | L       | Cao        | ⏳         |
| PB-051 | Trang Đăng Ký Gói             | US-013              | M       | Cao        | ⏳         |
| PB-052 | Bảng Điều Khiển Đơn Đặt Hàng  | Kiếm Tiền & Đăng Ký | S       | Cao        | ⏳         |
| PB-053 | Hỗ Trợ Hủy Đăng Ký            | Kiếm Tiền & Đăng Ký | S       | Cao        | ⏳         |
| PB-054 | Hỗ Trợ Bài Viết Cao Cấp       | US-014              | M       | Cao        | ⏳         |
| PB-055 | Hệ Thống Tường Lửa Nội Dung   | PB-054              | M       | Cao        | ⏳         |
| PB-056 | Không Quảng Cáo Cho Premium+  | US-015              | S       | Trung Bình | ⏳         |
| PB-057 | Bảng Điều Khiển Tác Giả       | US-011              | L       | Cao        | ⏳         |
| PB-058 | Chức Năng Viết Bài Viết       | US-011              | L       | Cao        | ⏳         |
| PB-059 | Bảng Điều Khiển Biên Tập      | US-012              | L       | Cao        | ⏳         |
| PB-060 | Chức Năng Thẩm Duyệt Bài Viết | US-012              | M       | Cao        | ⏳         |
| PB-061 | Hệ Thống Nhận Xét Nội Tuyến   | PB-060              | M       | Cao        | ⏳         |
| PB-062 | Tích Hợp Quảng Cáo            | Kiếm Tiền & Đăng Ký | L       | Trung Bình | ⏳         |

---

## PHASE 4: PHƯƠNG TIỆN ĐA PHƯƠNG & NỘI DUNG

| ID     | Tiêu Đề                    | Epic                  | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | -------------------------- | --------------------- | ------- | ---------- | ---------- |
| PB-063 | Trình Phát Video           | US-016                | L       | Cao        | ⏳         |
| PB-064 | Hỗ Trợ Nhúng YouTube/Vimeo | PB-063                | M       | Cao        | ⏳         |
| PB-065 | Thư Viện Hình Ảnh          | Phương Tiện Đa Phương | L       | Cao        | ⏳         |
| PB-066 | Trình Phát Podcast         | Phương Tiện Đa Phương | L       | Cao        | ⏳         |
| PB-067 | Hỗ Trợ Infographics        | Phương Tiện Đa Phương | M       | Trung Bình | ⏳         |

---

## PHASE 5: KHUYẾN NGHỊ AI & THÔNG BÁO

| ID     | Tiêu Đề                         | Epic   | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | ------------------------------- | ------ | ------- | ---------- | ---------- |
| PB-068 | Công Cụ Khuyến Nghị             | US-017 | XL      | Cao        | ⏳         |
| PB-069 | Lọc Cộng Tác                    | PB-068 | L       | Cao        | ⏳         |
| PB-070 | Thuật Toán Học Máy              | PB-068 | L       | Cao        | ⏳         |
| PB-071 | Phần Khuyến Nghị Trên Trang Chủ | PB-068 | M       | Cao        | ⏳         |
| PB-072 | Hệ Thống Thông Báo              | US-018 | L       | Cao        | ⏳         |
| PB-073 | Tóm Tắt Email Hàng Ngày         | PB-072 | M       | Cao        | ⏳         |
| PB-074 | Cảnh báo Tin Tức Nóng           | PB-072 | M       | Cao        | ⏳         |
| PB-075 | Lập Lịch Thông báo              | PB-072 | M       | Trung Bình | ⏳         |

---

## BACKLOG CHỜ PHÂN LOẠI (Tương Lai)

| ID     | Tiêu Đề                          | Epic        | Kích Cỡ | Ưu Tiên    | Trạng Thái |
| ------ | -------------------------------- | ----------- | ------- | ---------- | ---------- |
| PB-076 | Ứng Dụng Di Động iOS             | Tương Lai   | XL      | Thấp       | 📋         |
| PB-077 | Ứng Dụng Di Động Android         | Tương Lai   | XL      | Thấp       | 📋         |
| PB-078 | Hỗ Trợ Đa Ngôn Ngữ               | Quốc Tế Hóa | XL      | Trung Bình | 📋         |
| PB-079 | Mở Rộng Sang Thị Trường Quốc Tế  | Quốc Tế Hóa | L       | Trung Bình | 📋         |
| PB-080 | Chế Độ Đọc Ngoại Tuyến           | Tương Lai   | L       | Thấp       | 📋         |
| PB-081 | Chia Sẻ Xã Hội Nâng Cao          | Tương Lai   | M       | Thấp       | 📋         |
| PB-082 | Bình Luận Người Dùng             | Tương Lai   | L       | Thấp       | 📋         |
| PB-083 | Huy Hiệu & Thành Tích Người Dùng | Tương Lai   | M       | Thấp       | 📋         |

---

## Huyết Lệnh

- **Trạng Thái**: ⏳ (Chờ), ⏳ (Trong Tiến Hành), ✅ (Hoàn Thành), 📋 (Chờ Phân Loại)
- **Ưu Tiên**: Cao (Phải Làm), Trung Bình (Nên Làm), Thấp (Có Thể Làm)
- **Kích Cỡ Công Việc**: XS (1 điểm), S (3 điểm), M (5 điểm), L (8 điểm), XL (13 điểm)

---

## Tiêu Chí Hoàn Thành Phase

### Phase 1

- [ ] 80%+ unit test coverage
- [ ] Lighthouse Score ≥ 90
- [ ] WCAG 2.1 AA compliance
- [ ] <3 second page load time
- [ ] 0 critical/high severity bugs
- [ ] 99.9% uptime for 1 week

### Phase 2

- [ ] 40%+ 1-week retention
- [ ] 3+ sessions/week per user
- [ ] 100%+ unit test coverage (auth module)
- [ ] User preferences working across sessions

### Phase 3

- [ ] 2%+ subscription conversion
- [ ] <24 hour content approval turnaround
- [ ] Writer/Editor satisfaction >4/5
- [ ] 0% content moderation errors

### Phase 4

- [ ] 30%+ articles with multimedia
- [ ] 100K+ video views/month
- [ ] +50% session duration vs Phase 3

### Phase 5

- [ ] 15%+ recommendation click-through
- [ ] 85%+ recommendation accuracy
- [ ] 60%+ users opted-in to notifications
- [ ] 30%+ notification click-through rate
