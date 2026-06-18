## BaoProject - Báo Rồng Vàng

Website đọc báo nhưng bản temu
Dự án cho btl ở uni

# Documentation

Tất cả ở trong docs/

# Hướng dẫn Cài đặt & Chạy Local

Vì dự án sử dụng PostgreSQL nên bạn cần thiết lập Database trước khi chạy server.

### 1. Cài đặt thư viện
```bash
npm i
```

### 2. Thiết lập Biến Môi trường (.env)
- Chép file `.env.example` thành file `.env`
```bash
cp .env.example .env
```
- Mở file `.env` và sửa lại thông số `DATABASE_URL` theo Username và Password PostgreSQL trên máy của bạn. Ví dụ: `postgresql://postgres:123456@localhost:5432/baorongvang`

### 3. Tạo Database & Chạy Script khởi tạo
- Đảm bảo PostgreSQL đang chạy trên máy bạn.
- Mở PostgreSQL (qua pgAdmin hoặc terminal psql) và tạo một database mới có tên là `baorongvang`:
```sql
CREATE DATABASE baorongvang;
```
- Chạy lệnh sau để tự động tạo các bảng (Tables) và dữ liệu mẫu (Seed):
```bash
npm run db:reset-full
```

### 4. Chạy dự án (Dev)
```bash
npm run dev
```

# Build for Production

- Build
```bash
npm i
npm run build
```

- Run build
```bash
npm i -g serve
serve -s build
```

- Nhấn Ctrl C để dừng chạy.
