# 📝 Task Manager - Full Stack Application

> Ứng dụng quản lý công việc (Task Manager) đơn giản để luyện tập và học hỏi kiến thức Full Stack Development với Node.js, Express, MongoDB và React.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.x-green.svg)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Tech Stack](#-tech-stack)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication Flow](#-authentication-flow)
- [Biến môi trường](#-biến-môi-trường)
- [Scripts](#️-scripts)
- [Best Practices](#-best-practices)
- [Roadmap](#-roadmap)

## 🎯 Giới thiệu

Đây là một dự án **học tập và thực hành** về phát triển ứng dụng Full Stack. Dự án triển khai một hệ thống quản lý công việc (Task Manager) với đầy đủ các tính năng CRUD, authentication, và API RESTful.

### 🎓 Mục đích học tập

- **Backend Development**: Xây dựng RESTful API với Node.js, Express
- **Database Design**: Thiết kế schema và quản lý MongoDB với Mongoose
- **Authentication & Security**: JWT tokens, password hashing, middleware protection
- **API Documentation**: Swagger/OpenAPI documentation
- **Code Organization**: Clean architecture, separation of concerns
- **Best Practices**: Error handling, validation, logging

### 🚀 Trạng thái dự án

- ✅ **Backend API**: Đã hoàn thành cơ bản (đang phát triển thêm)
- 🔄 **Frontend**: Đang trong giai đoạn chuẩn bị
- 📚 **Documentation**: Có Swagger UI tích hợp

## ✨ Tính năng

### Backend (API)

- ✅ **Authentication & Authorization**
  - Đăng ký tài khoản mới (register)
  - Đăng nhập (login)
  - Refresh access token
  - JWT-based authentication
  - Protected routes với middleware

- ✅ **Task Management**
  - Tạo task mới
  - Xem danh sách tasks (với filter theo status)
  - Xem chi tiết task
  - Cập nhật task (title, description, status)
  - Xóa task (soft delete)
  - Phân trang kết quả

- ✅ **User Management**
  - Xem thông tin profile
  - Quản lý user roles (USER, ADMIN)
  - User status management

- ✅ **Validation & Error Handling**
  - Request validation với Zod schema
  - Centralized error handling middleware
  - Consistent error responses

- ✅ **Documentation**
  - Swagger UI tự động
  - API testing interface
  - Schema definitions

- ✅ **Security**
  - Helmet.js security headers
  - CORS configuration
  - Password hashing với bcrypt
  - JWT token expiration

### Frontend (Đang phát triển)

- 🔄 React + Vite setup
- 🔄 API integration với Axios
- 🔄 Authentication UI
- 🔄 Task management interface
- 🔄 Responsive design

## 📦 Tech Stack

### Backend

| Technology | Version | Purpose                       |
| ---------- | ------- | ----------------------------- |
| Node.js    | 18+     | Runtime environment           |
| Express    | 5.x     | Web framework                 |
| MongoDB    | 9.x     | NoSQL database                |
| Mongoose   | 9.x     | ODM for MongoDB               |
| JWT        | 9.x     | Authentication tokens         |
| Bcrypt     | 3.x     | Password hashing              |
| Zod        | 4.x     | Schema validation             |
| Swagger    | 6.x     | API documentation             |
| Helmet     | 8.x     | Security headers              |
| Morgan     | 1.x     | HTTP request logger           |
| Dotenv     | 17.x    | Environment variables         |
| CORS       | 2.x     | Cross-origin resource sharing |

### Frontend

| Technology   | Version | Purpose             |
| ------------ | ------- | ------------------- |
| React        | 18.x    | UI library          |
| Vite         | 5.x     | Build tool          |
| React Router | 6.x     | Client-side routing |
| Axios        | 1.x     | HTTP client         |

### Development Tools

- **Nodemon**: Auto-restart server khi code thay đổi
- **ESLint**: Code linting
- **Git**: Version control

## 📁 Cấu trúc dự án

```
simple-app/
│
├── BE/                           # Backend Application
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   ├── db.js            # MongoDB connection setup
│   │   │   └── env.js           # Environment variables config
│   │   │
│   │   ├── docs/                # API Documentation
│   │   │   └── swagger.js       # Swagger/OpenAPI configuration
│   │   │
│   │   ├── middlewares/         # Express Middlewares
│   │   │   ├── auth.middleware.js      # JWT authentication
│   │   │   ├── error.middleware.js     # Error handling
│   │   │   ├── notFound.middleware.js  # 404 handler
│   │   │   └── validate.middleware.js  # Request validation
│   │   │
│   │   ├── models/              # Data Models (MVC Pattern)
│   │   │   ├── auth/           # Authentication module
│   │   │   │   ├── auth.controller.js  # Login/Register logic
│   │   │   │   ├── auth.routes.js      # Auth endpoints
│   │   │   │   ├── auth.validation.js  # Zod schemas
│   │   │   │   └── refresh.controller.js # Token refresh
│   │   │   │
│   │   │   ├── tasks/          # Task management module
│   │   │   │   ├── task.controller.js  # CRUD logic
│   │   │   │   ├── task.model.js       # Mongoose schema
│   │   │   │   ├── task.routes.js      # Task endpoints
│   │   │   │   └── task.validation.js  # Zod schemas
│   │   │   │
│   │   │   └── users/          # User management module
│   │   │       ├── user.controller.js  # User logic
│   │   │       ├── user.model.js       # Mongoose schema
│   │   │       └── user.routes.js      # User endpoints
│   │   │
│   │   ├── routes/              # Main route aggregator
│   │   │   └── index.js         # Combines all routes
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   ├── asyncHandler.js  # Async error wrapper
│   │   │   ├── jwt.js           # JWT helpers
│   │   │   └── password.js      # Password hashing
│   │   │
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Server entry point
│   │
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   └── package.json             # Dependencies & scripts
│
├── FE/                          # Frontend Application
│   ├── src/
│   │   ├── config/             # Frontend configuration
│   │   │   └── api.js          # API endpoints config
│   │   ├── App.jsx             # Main App component
│   │   ├── main.jsx            # React entry point
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── index.html
│   ├── vite.config.js           # Vite configuration
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── .gitignore                   # Global gitignore
├── .vscode/                     # VSCode settings
│   ├── settings.json
│   └── extensions.json
│
└── README.md                    # Project documentation
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống

- **Node.js**: v18 hoặc cao hơn
- **MongoDB**: v5 hoặc cao hơn (local hoặc MongoDB Atlas)
- **npm** hoặc **yarn**: Package manager

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd simple-app
```

### Bước 2: Cài đặt Backend

```bash
# Di chuyển vào thư mục BE
cd BE

# Cài đặt dependencies
npm install

# Tạo file .env từ template
cp .env.example .env

# Chỉnh sửa file .env với thông tin của bạn
# - Thay đổi MongoDB connection string
# - Tạo JWT secrets mạnh (dùng: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
# - Cấu hình CORS origin cho frontend
```

**Cấu hình file .env:**

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_manager  # Hoặc MongoDB Atlas URI

# QUAN TRỌNG: Thay đổi JWT secrets bằng chuỗi ngẫu nhiên mạnh
JWT_ACCESS_SECRET=your_super_secret_access_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:5173
```

**Tạo JWT secret mạnh:**

```bash
# Chạy lệnh này để tạo secret ngẫu nhiên
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Bước 3: Khởi chạy MongoDB

**Option 1: MongoDB Local**

```bash
# Khởi động MongoDB service
mongod

# Hoặc trên Windows
net start MongoDB
```

**Option 2: MongoDB Atlas** (Cloud)

1. Tạo tài khoản tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster miễn phí
3. Lấy connection string và cập nhật vào `MONGODB_URI` trong `.env`

### Bước 4: Chạy Backend Server

```bash
# Development mode với auto-reload
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

### Bước 5: Kiểm tra API Documentation

Mở trình duyệt và truy cập:

```
http://localhost:5000/api-docs
```

Bạn sẽ thấy Swagger UI với đầy đủ API documentation và có thể test các endpoints ngay trên đó.

### Bước 6: Cài đặt Frontend (Tùy chọn)

```bash
# Di chuyển vào thư mục FE
cd FE

# Cài đặt dependencies
npm install

# Tạo file .env từ template
cp .env.example .env

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api
```

### Endpoints Overview

#### Authentication & Authorization

| Method | Endpoint             | Description           | Auth Required |
| ------ | -------------------- | --------------------- | ------------- |
| POST   | `/api/auth/register` | Đăng ký tài khoản mới | ❌            |
| POST   | `/api/auth/login`    | Đăng nhập             | ❌            |
| POST   | `/api/auth/refresh`  | Refresh access token  | ❌            |

#### Tasks Management

| Method | Endpoint         | Description                                 | Auth Required |
| ------ | ---------------- | ------------------------------------------- | ------------- |
| GET    | `/api/tasks`     | Lấy danh sách tasks (có phân trang, filter) | ✅            |
| GET    | `/api/tasks/:id` | Lấy chi tiết một task                       | ✅            |
| POST   | `/api/tasks`     | Tạo task mới                                | ✅            |
| PUT    | `/api/tasks/:id` | Cập nhật task                               | ✅            |
| DELETE | `/api/tasks/:id` | Xóa task (soft delete)                      | ✅            |

#### User Profile

| Method | Endpoint             | Description                                   | Auth Required |
| ------ | -------------------- | --------------------------------------------- | ------------- |
| GET    | `/api/users/profile` | Lấy thông tin profile của user đang đăng nhập | ✅            |

#### Health Check

| Method | Endpoint      | Description            | Auth Required |
| ------ | ------------- | ---------------------- | ------------- |
| GET    | `/api/health` | Kiểm tra server status | ❌            |

### API Examples

#### 1. Đăng ký tài khoản

```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "password": "Password123!"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "65abc123...",
    "fullName": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "USER",
    "status": "ACTIVE"
  }
}
```

#### 2. Đăng nhập

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "nguyenvana@example.com",
  "password": "Password123!"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "65abc123...",
    "fullName": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "USER"
  }
}
```

#### 3. Tạo task mới

```bash
POST /api/tasks
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Học Express.js middleware",
  "description": "Tìm hiểu về authentication và validation middleware",
  "status": "TODO"
}
```

**Response:**

```json
{
  "task": {
    "_id": "65abc456...",
    "title": "Học Express.js middleware",
    "description": "Tìm hiểu về authentication và validation middleware",
    "status": "TODO",
    "ownerId": "65abc123...",
    "createdAt": "2026-02-08T10:30:00.000Z",
    "updatedAt": "2026-02-08T10:30:00.000Z"
  }
}
```

#### 4. Lấy danh sách tasks

```bash
GET /api/tasks?status=TODO&page=1&limit=10
Authorization: Bearer {accessToken}
```

**Response:**

```json
{
  "tasks": [
    {
      "_id": "65abc456...",
      "title": "Học Express.js middleware",
      "status": "TODO",
      "createdAt": "2026-02-08T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

#### 5. Cập nhật task

```bash
PUT /api/tasks/65abc456...
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

#### 6. Xóa task

```bash
DELETE /api/tasks/65abc456...
Authorization: Bearer {accessToken}
```

### Query Parameters (Tasks)

| Parameter | Type   | Description                                        | Default |
| --------- | ------ | -------------------------------------------------- | ------- |
| `status`  | string | Filter theo status (`TODO`, `IN_PROGRESS`, `DONE`) | Tất cả  |
| `page`    | number | Số trang (pagination)                              | 1       |
| `limit`   | number | Số lượng items mỗi trang                           | 10      |

### Task Status Values

- `TODO`: Task chưa bắt đầu
- `IN_PROGRESS`: Task đang thực hiện
- `DONE`: Task đã hoàn thành

## 🗄️ Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  fullName: String,           // Required
  email: String,              // Required, unique, indexed
  passwordHash: String,       // Required, select: false
  role: String,               // Enum: ["ADMIN", "USER"], default: "USER"
  status: String,             // Enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE"
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}
```

**Indexes:**

- `email`: Unique index để tăng tốc độ query và đảm bảo uniqueness

**Security:**

- `passwordHash` có `select: false` - không được trả về trong queries thông thường
- Phải dùng `.select('+passwordHash')` để lấy field này

### Task Collection

```javascript
{
  _id: ObjectId,
  title: String,              // Required
  description: String,        // Default: ""
  status: String,             // Enum: ["TODO", "IN_PROGRESS", "DONE"], default: "TODO"
  ownerId: ObjectId,          // Reference to User, required, indexed
  deletedAt: Date,            // Soft delete timestamp, default: null
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}
```

**Indexes:**

- `status`: Index để filter nhanh
- `ownerId`: Index để query tasks của user
- `deletedAt`: Index để filter soft-deleted items
- **Compound Index**: `{ ownerId: 1, status: 1, createdAt: -1 }` - Tối ưu query tasks của user theo status và sắp xếp theo thời gian

**Soft Delete:**

- Tasks không bị xóa vĩnh viễn khỏi database
- `deletedAt = null`: Task active
- `deletedAt = Date`: Task đã bị xóa (có thể restore sau này)

## 🔐 Authentication Flow

### JWT Token Strategy

Ứng dụng sử dụng **Dual Token Authentication** với access token và refresh token:

#### Access Token

- **Mục đích**: Xác thực các API requests
- **Thời gian sống**: 15 phút (ngắn để bảo mật)
- **Payload**: `{ userId, email, role }`
- **Gửi qua**: Header `Authorization: Bearer {token}`

#### Refresh Token

- **Mục đích**: Làm mới access token khi hết hạn
- **Thời gian sống**: 7 ngày (dài hơn access token)
- **Payload**: `{ userId }`
- **Lưu trữ**: Client-side (localStorage hoặc httpOnly cookie)

### Authentication Flow Diagram

```
┌─────────┐                    ┌─────────┐                   ┌──────────┐
│ Client  │                    │ Backend │                   │ Database │
└────┬────┘                    └────┬────┘                   └────┬─────┘
     │                              │                              │
     │ 1. POST /api/auth/register   │                              │
     ├─────────────────────────────>│                              │
     │    { email, password }        │  2. Hash password           │
     │                              │─────────┐                    │
     │                              │<────────┘                    │
     │                              │  3. Create user              │
     │                              ├─────────────────────────────>│
     │                              │<─────────────────────────────┤
     │  4. Return user info         │                              │
     │<─────────────────────────────┤                              │
     │                              │                              │
     │ 5. POST /api/auth/login      │                              │
     ├─────────────────────────────>│                              │
     │    { email, password }        │  6. Find user + verify pwd  │
     │                              ├─────────────────────────────>│
     │                              │<─────────────────────────────┤
     │                              │  7. Generate tokens          │
     │                              │─────────┐                    │
     │                              │<────────┘                    │
     │  8. Return tokens + user     │                              │
     │<─────────────────────────────┤                              │
     │   { accessToken,             │                              │
     │     refreshToken, user }     │                              │
     │                              │                              │
     │ 9. GET /api/tasks            │                              │
     │    Authorization: Bearer {AT}│                              │
     ├─────────────────────────────>│                              │
     │                              │ 10. Verify access token      │
     │                              │─────────┐                    │
     │                              │<────────┘                    │
     │                              │ 11. Query tasks              │
     │                              ├─────────────────────────────>│
     │                              │<─────────────────────────────┤
     │  12. Return tasks            │                              │
     │<─────────────────────────────┤                              │
     │                              │                              │
     │ 13. Access token expired!    │                              │
     │ POST /api/auth/refresh       │                              │
     │    { refreshToken }          │                              │
     ├─────────────────────────────>│                              │
     │                              │ 14. Verify refresh token     │
     │                              │─────────┐                    │
     │                              │<────────┘                    │
     │                              │ 15. Generate new access token│
     │                              │─────────┐                    │
     │                              │<────────┘                    │
     │  16. Return new access token │                              │
     │<─────────────────────────────┤                              │
     │   { accessToken }            │                              │
     │                              │                              │
```

### Protected Routes

Các endpoints yêu cầu authentication sử dụng middleware `requireAuth`:

```javascript
// Trong task.routes.js
router.use(requireAuth); // Bảo vệ toàn bộ /tasks routes

// Middleware sẽ:
// 1. Kiểm tra Authorization header
// 2. Verify access token
// 3. Decode userId từ token
// 4. Gắn req.userId để controller sử dụng
// 5. Nếu token không hợp lệ -> 401 Unauthorized
```

## 📝 Biến môi trường

### Backend (.env)

| Variable                 | Description                     | Default                 | Required |
| ------------------------ | ------------------------------- | ----------------------- | -------- |
| `NODE_ENV`               | Môi trường chạy                 | `development`           | ❌       |
| `PORT`                   | Port của server                 | `5000`                  | ❌       |
| `MONGODB_URI`            | MongoDB connection string       | -                       | ✅       |
| `CORS_ORIGIN`            | URL của frontend (CORS)         | `http://localhost:5173` | ❌       |
| `JWT_ACCESS_SECRET`      | Secret key cho access token     | -                       | ✅       |
| `JWT_REFRESH_SECRET`     | Secret key cho refresh token    | -                       | ✅       |
| `JWT_ACCESS_EXPIRES_IN`  | Thời gian hết hạn access token  | `15m`                   | ❌       |
| `JWT_REFRESH_EXPIRES_IN` | Thời gian hết hạn refresh token | `7d`                    | ❌       |

### Frontend (.env)

| Variable        | Description         | Default                 | Required |
| --------------- | ------------------- | ----------------------- | -------- |
| `VITE_API_URL`  | URL của backend API | `http://localhost:5000` | ✅       |
| `VITE_APP_NAME` | Tên ứng dụng        | `Task Manager`          | ❌       |

### Ví dụ file .env

**Backend:**

```env
# Application
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/task_manager
# Hoặc MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_manager

# Security - JWT (Thay đổi bằng secret keys thực)
JWT_ACCESS_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_REFRESH_SECRET=z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

**Frontend:**

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=Task Manager
```

## 🛠️ Scripts

### Backend

```bash
# Development mode - auto restart khi code thay đổi
npm run dev

# Production mode
npm start

# Install dependencies
npm install
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 💡 Best Practices

### 1. Bảo mật

- ✅ **Không bao giờ** commit file `.env` lên Git
- ✅ Sử dụng **JWT secrets mạnh** (ít nhất 32 ký tự ngẫu nhiên)
- ✅ **Hash passwords** với bcrypt (đã implement)
- ✅ Sử dụng **Helmet.js** cho security headers
- ✅ Validate tất cả **input** với Zod schemas
- ✅ Implement **rate limiting** (TODO - nên thêm)
- ✅ Sử dụng **HTTPS** trong production

### 2. Code Organization

- ✅ **Separation of Concerns**: Routes → Controllers → Models
- ✅ **DRY Principle**: Sử dụng middleware để reuse logic
- ✅ **Error Handling**: Centralized error middleware
- ✅ **Async/Await**: Handle async operations properly với `asyncHandler`
- ✅ **Validation**: Validate ở middleware layer trước khi vào controller

### 3. Database

- ✅ **Indexes**: Tối ưu queries với đúng indexes
- ✅ **Soft Delete**: Giữ lại data thay vì xóa vĩnh viễn
- ✅ **Schemas**: Defined strict schemas với validation
- ✅ **References**: Sử dụng ObjectId references cho relationships

### 4. API Design

- ✅ **RESTful**: Follow REST conventions
- ✅ **Consistent Responses**: Cấu trúc response giống nhau
- ✅ **HTTP Status Codes**: Sử dụng đúng status codes
- ✅ **Pagination**: Implement pagination cho list endpoints
- ✅ **Filtering**: Cho phép filter data (status, date, etc.)
- ✅ **Documentation**: Swagger docs cho tất cả endpoints

### 5. Git Workflow

```bash
# Commit messages có ý nghĩa
git commit -m "feat: Add user authentication with JWT"
git commit -m "fix: Resolve task deletion bug"
git commit -m "docs: Update API documentation"

# Conventions:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# refactor: Code refactoring
# test: Tests
# chore: Maintenance
```

## 🚧 Roadmap

### Phase 1: Backend API ✅ (Đang hoàn thiện)

- [x] Setup project structure
- [x] Database connection
- [x] User authentication (register, login)
- [x] JWT token generation & validation
- [x] Task CRUD operations
- [x] Request validation với Zod
- [x] Error handling middleware
- [x] Swagger documentation
- [x] Security với Helmet
- [ ] Unit tests với Jest
- [ ] Rate limiting
- [ ] Email verification (optional)
- [ ] Password reset (optional)

### Phase 2: Frontend Development 🔄 (Đang chuẩn bị)

- [x] React + Vite setup
- [ ] Authentication UI (Login, Register)
- [ ] Protected routes
- [ ] Task management interface
  - [ ] Task list với filters
  - [ ] Task creation form
  - [ ] Task edit modal
  - [ ] Task delete confirmation
- [ ] User profile page
- [ ] Responsive design
- [ ] Loading states & error handling
- [ ] Toast notifications
- [ ] Dark mode (optional)

### Phase 3: Advanced Features 🔮 (Tương lai)

- [ ] Task categories/tags
- [ ] Task priority levels
- [ ] Due dates & reminders
- [ ] File attachments
- [ ] Task comments
- [ ] Search functionality
- [ ] Task statistics & analytics
- [ ] Export tasks (CSV, PDF)
- [ ] Collaborative features
- [ ] Real-time updates với WebSocket
- [ ] Email notifications
- [ ] Mobile app (React Native)

### Phase 4: DevOps & Deployment 🚀 (Sau này)

- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Deployment to cloud (Heroku, AWS, etc.)
- [ ] Database backup strategy
- [ ] Monitoring & logging
- [ ] Performance optimization

## 🔒 Security Checklist

- [x] Password hashing với bcrypt
- [x] JWT token authentication
- [x] Input validation với Zod
- [x] CORS configuration
- [x] Helmet security headers
- [x] Environment variables cho sensitive data
- [ ] Rate limiting (TODO)
- [ ] SQL injection prevention (N/A - dùng Mongoose)
- [ ] XSS protection
- [ ] CSRF protection (nếu dùng cookies)
- [ ] HTTPS trong production
- [ ] Regular security audits

## 📄 License

ISC - Dự án này được tạo ra cho mục đích học tập và không có giấy phép thương mại.
