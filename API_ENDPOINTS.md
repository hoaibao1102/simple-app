# API Endpoints - Task Manager Application

> **Last Updated**: February 9, 2026  
> **Backend URL**: http://localhost:5000  
> **Swagger Documentation**: http://localhost:5000/api-docs

## 📋 Tổng quan

Đây là danh sách **TOÀN BỘ** các API endpoints thực tế có trong hệ thống. Frontend chỉ được sử dụng các API có trong danh sách này.

---

## 🔐 Authentication APIs

### 1. Register

**Endpoint**: `POST /api/auth/register`  
**Access**: Public  
**Description**: Đăng ký tài khoản mới

**Request Body**:

```json
{
  "fullName": "Bao Le",
  "email": "bao@example.com",
  "password": "Password123"
}
```

**Response (201)**:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "Bao Le",
    "email": "bao@example.com",
    "role": "USER",
    "status": "ACTIVE"
  }
}
```

---

### 2. Login

**Endpoint**: `POST /api/auth/login`  
**Access**: Public  
**Description**: Đăng nhập và nhận tokens

**Request Body**:

```json
{
  "email": "bao@example.com",
  "password": "Password123"
}
```

**Response (200)**:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "Bao Le",
    "email": "bao@example.com",
    "role": "USER",
    "status": "ACTIVE"
  }
}
```

---

### 3. Refresh Token

**Endpoint**: `POST /api/auth/refresh`  
**Access**: Require refresh token in Authorization header  
**Description**: Làm mới access token

**Headers**:

```
Authorization: Bearer {refresh_token}
```

**Response (200)**:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "role": "USER"
  }
}
```

---

## 👤 User APIs

### 4. Get My Profile

**Endpoint**: `GET /api/users/me`  
**Access**: Authenticated  
**Description**: Lấy thông tin profile của user hiện tại

**Headers**:

```
Authorization: Bearer {access_token}
```

**Response (200)**:

```json
{
  "id": "507f1f77bcf86cd799439011",
  "fullName": "Bao Le",
  "email": "bao@example.com",
  "role": "USER",
  "status": "ACTIVE"
}
```

---

## ✅ Task APIs

### 5. Create Task

**Endpoint**: `POST /api/tasks`  
**Access**: Authenticated  
**Description**: Tạo task mới cho user hiện tại

**Headers**:

```
Authorization: Bearer {access_token}
```

**Request Body**:

```json
{
  "title": "Learn Express middleware",
  "description": "Practice validateBody + requireAuth flow",
  "status": "TODO"
}
```

**Response (201)**:

```json
{
  "id": "507f1f77bcf86cd799439012",
  "title": "Learn Express middleware",
  "description": "Practice validateBody + requireAuth flow",
  "status": "TODO",
  "createdAt": "2026-02-09T10:30:00.000Z",
  "updatedAt": "2026-02-09T10:30:00.000Z"
}
```

**Notes**:

- Status values: `TODO`, `IN_PROGRESS`, `DONE`
- Frontend mapping: `pending` → `TODO`, `in-progress` → `IN_PROGRESS`, `completed` → `DONE`

---

### 6. List Tasks

**Endpoint**: `GET /api/tasks`  
**Access**: Authenticated  
**Description**: Lấy danh sách tasks của user hiện tại (có phân trang)

**Headers**:

```
Authorization: Bearer {access_token}
```

**Query Parameters**:

- `page` (number, optional): Page number, default: 1
- `limit` (number, optional): Items per page, default: 10, max: 50
- `status` (string, optional): Filter by status: `TODO`, `IN_PROGRESS`, `DONE`

**Example**: `GET /api/tasks?page=1&limit=10&status=TODO`

**Response (200)**:

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Learn Express middleware",
      "description": "Practice validateBody + requireAuth flow",
      "status": "TODO",
      "createdAt": "2026-02-09T10:30:00.000Z",
      "updatedAt": "2026-02-09T10:30:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### 7. Get Task by ID

**Endpoint**: `GET /api/tasks/:id`  
**Access**: Authenticated (only owner)  
**Description**: Lấy chi tiết một task

**Headers**:

```
Authorization: Bearer {access_token}
```

**Response (200)**:

```json
{
  "id": "507f1f77bcf86cd799439012",
  "title": "Learn Express middleware",
  "description": "Practice validateBody + requireAuth flow",
  "status": "TODO",
  "createdAt": "2026-02-09T10:30:00.000Z",
  "updatedAt": "2026-02-09T10:30:00.000Z"
}
```

---

### 8. Update Task

**Endpoint**: `PATCH /api/tasks/:id`  
**Access**: Authenticated (only owner)  
**Description**: Cập nhật task (partial update)

**Headers**:

```
Authorization: Bearer {access_token}
```

**Request Body** (all fields optional):

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "IN_PROGRESS"
}
```

**Response (200)**:

```json
{
  "id": "507f1f77bcf86cd799439012",
  "title": "Updated Title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "createdAt": "2026-02-09T10:30:00.000Z",
  "updatedAt": "2026-02-09T11:00:00.000Z"
}
```

---

### 9. Delete Task

**Endpoint**: `DELETE /api/tasks/:id`  
**Access**: Authenticated (only owner)  
**Description**: Xóa task (soft delete)

**Headers**:

```
Authorization: Bearer {access_token}
```

**Response (200)**:

```json
{
  "message": "Task deleted successfully"
}
```

---

## 🛡️ Admin APIs

> **⚠️ Tất cả API admin yêu cầu role ADMIN**

### 10. List All Users

**Endpoint**: `GET /api/admin/users`  
**Access**: Admin only  
**Description**: Lấy danh sách tất cả users (có phân trang và filter)

**Headers**:

```
Authorization: Bearer {access_token}
```

**Query Parameters**:

- `page` (number, optional): Page number, default: 1
- `limit` (number, optional): Items per page, default: 20, max: 100
- `role` (string, optional): Filter by role: `ADMIN`, `USER`
- `status` (string, optional): Filter by status: `ACTIVE`, `INACTIVE`
- `search` (string, optional): Search by email or fullName

**Example**: `GET /api/admin/users?page=1&limit=20&role=USER&status=ACTIVE&search=bao`

**Response (200)**:

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "Bao Le",
      "email": "bao@example.com",
      "role": "USER",
      "status": "ACTIVE",
      "createdAt": "2026-01-15T08:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

---

### 11. Get User by ID

**Endpoint**: `GET /api/admin/users/:id`  
**Access**: Admin only  
**Description**: Lấy chi tiết một user

**Headers**:

```
Authorization: Bearer {access_token}
```

**Response (200)**:

```json
{
  "id": "507f1f77bcf86cd799439011",
  "fullName": "Bao Le",
  "email": "bao@example.com",
  "role": "USER",
  "status": "ACTIVE",
  "createdAt": "2026-01-15T08:00:00.000Z",
  "updatedAt": "2026-02-09T10:00:00.000Z"
}
```

---

### 12. Update User

**Endpoint**: `PATCH /api/admin/users/:id`  
**Access**: Admin only  
**Description**: Cập nhật user (role, status, fullName)

**Headers**:

```
Authorization: Bearer {access_token}
```

**Request Body** (all fields optional):

```json
{
  "role": "ADMIN",
  "status": "INACTIVE",
  "fullName": "New Name"
}
```

**Response (200)**:

```json
{
  "message": "User updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "New Name",
    "email": "bao@example.com",
    "role": "ADMIN",
    "status": "INACTIVE",
    "createdAt": "2026-01-15T08:00:00.000Z",
    "updatedAt": "2026-02-09T11:30:00.000Z"
  }
}
```

**Restrictions**:

- Admin không thể tự thay đổi role của chính mình (403 error)

---

### 13. Delete User

**Endpoint**: `DELETE /api/admin/users/:id`  
**Access**: Admin only  
**Description**: Xóa user (soft delete - set status = INACTIVE)

**Headers**:

```
Authorization: Bearer {access_token}
```

**Response (200)**:

```json
{
  "message": "User deleted successfully (set to INACTIVE)",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "Bao Le",
    "email": "bao@example.com",
    "role": "USER",
    "status": "INACTIVE"
  }
}
```

**Restrictions**:

- Admin không thể tự xóa chính mình (403 error)

---

## 🏥 Health Check

### 14. Health Check

**Endpoint**: `GET /api/health`  
**Access**: Public  
**Description**: Kiểm tra trạng thái server

**Response (200)**:

```json
{
  "status": "OK",
  "service": "Task Manager API"
}
```

---

## 📊 Response Codes

| Code | Meaning               | Description                                       |
| ---- | --------------------- | ------------------------------------------------- |
| 200  | OK                    | Request successful                                |
| 201  | Created               | Resource created successfully                     |
| 400  | Bad Request           | Validation error hoặc invalid input               |
| 401  | Unauthorized          | Missing/invalid/expired access token              |
| 403  | Forbidden             | No permission (e.g., not admin, account inactive) |
| 404  | Not Found             | Resource not found                                |
| 409  | Conflict              | Email already registered                          |
| 500  | Internal Server Error | Server error                                      |

---

## 🔐 Authentication Flow

1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login` → Nhận `access_token` và `refresh_token`
3. **Store tokens** trong localStorage
4. **Use access_token** trong header: `Authorization: Bearer {access_token}`
5. **When expired** (401): Call `POST /api/auth/refresh` với refresh_token → Nhận access_token mới
6. **Retry** request gốc với token mới

---

## 📝 Notes

### Status Values

**User Status**:

- `ACTIVE`: Account đang hoạt động
- `INACTIVE`: Account bị vô hiệu hóa hoặc đã xóa

**User Role**:

- `USER`: Regular user (default)
- `ADMIN`: Administrator with full access

**Task Status** (Backend):

- `TODO`: Task chưa bắt đầu
- `IN_PROGRESS`: Task đang thực hiện
- `DONE`: Task đã hoàn thành

**Task Status** (Frontend mapping):

- `pending` → `TODO`
- `in-progress` → `IN_PROGRESS`
- `completed` → `DONE`

### Token Expiration

- **Access Token**: 15 phút
- **Refresh Token**: 7 ngày

### Pagination

- Default `page`: 1
- Default `limit`: 10 (tasks), 20 (users)
- Max `limit`: 50 (tasks), 100 (users)

---

## ✅ API Implementation Checklist

Khi implement API trong Frontend:

- [ ] API đã tồn tại trong danh sách này
- [ ] Đã kiểm tra Swagger UI (http://localhost:5000/api-docs)
- [ ] Hiểu rõ request/response format
- [ ] Đã handle error codes phù hợp
- [ ] Đã thêm JSDoc comments
- [ ] Đã test với Backend

---

**Tổng số API**: 14 endpoints  
**Public APIs**: 3 (register, login, health)  
**Authenticated APIs**: 6 (user profile, tasks CRUD)  
**Admin APIs**: 4 (user management)  
**Token refresh**: 1 (refresh token)
