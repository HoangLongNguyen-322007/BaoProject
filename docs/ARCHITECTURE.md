# Kiến Trúc Hệ Thống BaoProject

## 1. Tổng Quan

BaoProject được xây dựng dựa trên kiến trúc ba tầng (Three-Tier Architecture):

- **Frontend**: React
- **Backend**: Express.js
- **Database**: PostgreSQL

Kiến trúc này cho phép tách biệt các mối quan tâm khác nhau, dễ bảo trì, mở rộng và kiểm thử.

---

## 2. Kiến Trúc Tổng Thể

```
┌─────────────────────────────────┐
│     Client (Trình Duyệt Web)    │
└──────────────┬──────────────────┘
               │
        ┌──────▼───────┐
        │   HTTP/HTTPS │
        └──────┬───────┘
               │
┌──────────────▼──────────────┐
│     Frontend (React)        │
│  - Giao diện người dùng     │
│  - Xử lý client-side logic  │
│  - State Management         │
└──────────────┬──────────────┘
               │
        ┌──────▼───────┐
        │   REST API   │
        │   (JSON)     │
        └──────┬───────┘
               │
┌──────────────▼──────────────┐
│   Backend (Express.js)      │
│  - API Endpoints            │
│  - Business Logic           │
│  - Authentication/Validation│
│  - File Upload Processing   │
└──────────────┬──────────────┘
               │
        ┌──────▼───────┐
        │  SQL Queries │
        └──────┬───────┘
               │
┌──────────────▼───────────────┐
│ Database (PostgreSQL)        │
│  - Data Storage              │
│  - Data Integrity            │
│  - Query Execution           │
└──────────────────────────────┘
```

---

## 3. Frontend - React

### 3.1 Mục Đích

- Cung cấp giao diện người dùng tương tác
- Xử lý logic phía client
- Gửi/nhận dữ liệu đến/từ Backend

### 3.2 Cấu Trúc Thư Mục

```
src/
├── components/          # Các component React tái sử dụng
├── pages/              # Các trang chính
├── services/           # API client services
├── hooks/              # Custom hooks
├── context/            # React Context (nếu cần)
├── utils/              # Tiện ích chung
├── styles/             # CSS/SCSS
└── App.jsx             # Component chính
```

### 3.3 Công Nghệ Sử Dụng

- **React**: UI library
- **React Router**: Điều hướng (nếu cần)
- **Axios/Fetch**: HTTP requests
- **State Management**: useState, useContext hoặc Redux/Zustand (tuỳ chọn)
- **CSS Framework**: Tailwind CSS, Material-UI, hoặc tự viết (tuỳ chọn)

### 3.4 Quy Trình Giao Tiếp

1. Người dùng tương tác với giao diện
2. React component xử lý sự kiện
3. Gọi API service để gửi request đến Backend
4. Nhận response từ Backend
5. Cập nhật state và render lại giao diện

---

## 4. Backend - Express.js

### 4.1 Mục Đích

- Xử lý business logic
- Quản lý request/response
- Xác thực và ủy quyền
- Tương tác với database
- Xử lý tệp và tài nguyên

### 4.2 Cấu Trúc Thư Mục

```
backend/
├── routes/             # Định nghĩa các endpoint API
├── controllers/        # Xử lý logic cho mỗi route
├── models/            # Database models/schemas
├── middleware/        # Middleware (auth, logging, error handling)
├── validators/        # Validation schemas
├── services/          # Business logic layer
├── config/            # Cấu hình ứng dụng
├── utils/             # Tiện ích chung
├── public/            # Tệp tĩnh
└── server.js          # Entry point
```

### 4.3 Công Nghệ Sử Dụng

- **Express.js**: Web framework
- **PostgreSQL Client**: pg hoặc Sequelize/TypeORM
- **dotenv**: Quản lý biến môi trường
- **Cors**: Cross-Origin Resource Sharing
- **bcrypt**: Mã hoá mật khẩu
- **jsonwebtoken**: JWT authentication
- **multer**: Xử lý upload tệp
- **validator**: Xác thực dữ liệu

### 4.4 API Endpoints (Ví Dụ)

```
GET    /api/users              - Lấy danh sách người dùng
GET    /api/users/:id          - Lấy thông tin một người dùng
POST   /api/users              - Tạo người dùng mới
PUT    /api/users/:id          - Cập nhật người dùng
DELETE /api/users/:id          - Xoá người dùng
POST   /api/auth/login         - Đăng nhập
POST   /api/auth/logout        - Đăng xuất
POST   /api/auth/register      - Đăng ký tài khoản
```

### 4.5 Response Format

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Thành công",
   "data": {
      "id": 1,
      "name": "Bảo"
   }
}
```

---

## 5. Database - PostgreSQL

### 5.1 Mục Đích

- Lưu trữ dữ liệu ứng dụng
- Đảm bảo toàn vẹn dữ liệu
- Xử lý các truy vấn phức tạp
- Hỗ trợ transactions

### 5.2 Schema Cơ Bản (Ví Dụ)

```sql
-- Bảng người dùng
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng vai trò
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng liên kết người dùng - vai trò
CREATE TABLE user_roles (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id)
);
```

### 5.3 Các Tính Năng Chính

- **Primary Key**: Khóa chính để xác định duy nhất bản ghi
- **Foreign Key**: Liên kết giữa các bảng
- **Constraints**: Ràng buộc dữ liệu (NOT NULL, UNIQUE, CHECK)
- **Indexes**: Tăng tốc độ truy vấn
- **Transactions**: Đảm bảo tính ACID

### 5.4 Kết Nối từ Backend

```javascript
// Ví dụ sử dụng pg
const { Pool } = require('pg');

const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
});
```

---

## 6. Quy Trình Giao Tiếp Dữ Liệu

### 6.1 Quy Trình Request-Response

```
1. Frontend (React)
   └─> Gửi HTTP Request (GET/POST/PUT/DELETE)
       └─> Có thể kèm theo:
           - Headers (Authorization, Content-Type, v.v.)
           - Query parameters (?page=1&limit=10)
           - Body (JSON data)

2. Backend (Express.js)
   ├─> Nhận request
   ├─> Xác thực middleware (CORS, Auth)
   ├─> Validate dữ liệu
   ├─> Xử lý business logic
   ├─> Thực hiện truy vấn database
   └─> Gửi response

3. Database (PostgreSQL)
   ├─> Nhận truy vấn SQL
   ├─> Xử lý logic database
   ├─> Trả về kết quả
   └─> Commit hoặc Rollback

4. Frontend (React)
   ├─> Nhận response
   ├─> Parse JSON
   ├─> Cập nhật state
   └─> Render giao diện
```

### 6.2 Ví Dụ: Tạo Người Dùng Mới

**Frontend (React)**

```javascript
const response = await axios.post('/api/users', {
   username: 'johndoe',
   email: 'john@example.com',
   password: 'securePassword123',
   full_name: 'John Doe',
});
```

**Backend (Express.js)**

```javascript
app.post('/api/users', async (req, res) => {
   try {
      const { username, email, password, full_name } = req.body;

      // Validate dữ liệu
      // Mã hoá mật khẩu
      const passwordHash = await bcrypt.hash(password, 10);

      // Thực hiện truy vấn database
      const result = await pool.query(
         'INSERT INTO users (username, email, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING *',
         [username, email, passwordHash, full_name]
      );

      res.json({ success: true, data: result.rows[0] });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
});
```

**Database (PostgreSQL)**

```sql
INSERT INTO users (username, email, password_hash, full_name)
VALUES ('johndoe', 'john@example.com', '$2b$10$...', 'John Doe')
RETURNING *;
```

---

## 7. Bảo Mật

### 7.1 Authentication & Authorization

- Sử dụng **JWT (JSON Web Token)** cho xác thực
- Sử dụng **CORS** cho phép truy cập từ client
- **Middleware xác thực** kiểm tra token ở các endpoint yêu cầu
- **Password hashing** với bcrypt

### 7.2 Validation

- Xác thực dữ liệu trên cả Frontend và Backend
- Sử dụng **validators** để kiểm tra kiểu dữ liệu

### 7.3 Biến Môi Trường

```
.env
DB_USER=postgres
DB_PASSWORD=secure_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=baodb
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 7.4 HTTPS

- Sử dụng HTTPS trong production
- Sử dụng SSL/TLS certificates

---

## 8. Deployment

### 8.1 Frontend (React)

- Build: `npm run build` → Tạo folder `dist/`
- Deploy trên:
   - **Vercel**, **Netlify**, **GitHub Pages** (Static hosting)
   - **Nginx**, **Apache** (Server riêng)

### 8.2 Backend (Express.js)

- Deploy trên:
   - **Heroku**, **Railway**, **Render**
   - **AWS EC2**, **DigitalOcean**, **Linode**
   - **Docker container** trên cloud platforms

### 8.3 Database (PostgreSQL)

- Lựa chọn:
   - **Managed services**: Amazon RDS, Heroku PostgreSQL, Render Postgres
   - **Self-hosted**: PostgreSQL server trên VPS

### 8.4 Quy Trình CI/CD (Tuỳ Chọn)

- Sử dụng GitHub Actions, GitLab CI/CD, Jenkins
- Tự động test, build, deploy

---

## 9. Monitoring & Logging

### 9.1 Logging

```javascript
// Sử dụng winston, morgan, hoặc bunyan
app.use(morgan('combined'));
logger.info('User created', { userId: 1 });
```

### 9.2 Monitoring

- Theo dõi performance backend (response time, error rate)
- Theo dõi database (query performance, connection pool)
- Sử dụng tools: Sentry, DataDog, New Relic, v.v.

---

## 10. Công Nghệ Bổ Sung (Tuỳ Chọn)

| Chức Năng         | Công Nghệ                  |
| ----------------- | -------------------------- |
| ORM               | Sequelize, TypeORM, Prisma |
| API Documentation | Swagger/OpenAPI            |
| Testing           | Jest, Mocha, Pytest        |
| Caching           | Redis                      |
| Message Queue     | RabbitMQ, Kafka            |
| Email Service     | SendGrid, Nodemailer       |
| File Storage      | AWS S3, Cloudinary         |
| Real-time         | Socket.IO, WebSocket       |

---

## 11. Quy Trình Phát Triển

### 11.1 Cycle

1. **Planning**: Xác định features
2. **Design**: Thiết kế kiến trúc, database schema
3. **Development**:
   - Backend: API endpoints
   - Frontend: UI components
   - Database: Migrations
4. **Testing**: Unit tests, Integration tests
5. **Deployment**: Staging → Production
6. **Monitoring**: Thu thập metrics, logs

### 11.2 Git Workflow

```
main (stable)
├── develop (development)
│   ├── feature/auth-system
│   ├── feature/user-management
│   └── feature/dashboard
└── hotfix/bug-fix
```

---

## 12. Conclusion

Kiến trúc này cung cấp:

- ✅ **Scalability**: Dễ mở rộng từng tầng độc lập
- ✅ **Maintainability**: Tách biệt các mối quan tâm
- ✅ **Testability**: Dễ kiểm thử từng phần
- ✅ **Security**: Bảo mật dữ liệu và xác thực
- ✅ **Performance**: Tối ưu hoá và caching

---

**Tác Giả**: BaoProject Team  
**Ngày Cập Nhật**: 2026-06-10  
**Phiên Bản**: 1.0
