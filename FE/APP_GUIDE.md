# 🚀 Ứng dụng Web hoàn chỉnh với Authentication

Ứng dụng web TaskApp - Hệ thống quản lý công việc với chức năng đăng nhập/đăng xuất đầy đủ.

## ✨ Tính năng

### 1. 🏠 Landing Page

- Trang giới thiệu website với giao diện hiện đại
- Hiển thị tính năng chính của ứng dụng
- Nút "Bắt đầu ngay" để chuyển đến trang đăng nhập

### 2. 🔐 Chức năng Authentication

- **Đăng nhập**: Form đăng nhập với validation (React Hook Form + Zod)
- **API thật**: Kết nối với backend API để xác thực
- **Lưu trạng thái**: Sử dụng Zustand + localStorage để persist session
- **Auto redirect**: Tự động chuyển hướng dựa trên trạng thái đăng nhập
- **Token refresh**: Tự động làm mới token khi hết hạn

### 3. 🏡 Home Page (Trang chính)

- Hiển thị thông tin người dùng đã đăng nhập
- Nút đăng xuất với xử lý logout đầy đủ
- UI đơn giản, dễ mở rộng thêm chức năng

### 4. 🛡️ Protected Routes

- Chỉ cho phép người đã đăng nhập truy cập /home
- Tự động redirect về /login nếu chưa đăng nhập
- Tự động redirect về /home nếu đã đăng nhập (khi truy cập /login)

### 5. 🔄 Navigation Flow

```
Landing (/) → Login (/login) → Home (/home)
                ↑__________________________|
                      (Logout)
```

## 📁 Cấu trúc dự án

```
FE/
├── src/
│   ├── components/
│   │   ├── ui/                    # UI components (Button, Card, Input, Label)
│   │   ├── ProtectedRoute.jsx     # Protected routes guard
│   │   └── PublicRoute.jsx        # Public routes guard
│   ├── pages/
│   │   ├── LandingPage.jsx        # Trang landing
│   │   ├── LoginPage.jsx          # Trang đăng nhập
│   │   └── HomePage.jsx           # Trang chính (sau khi đăng nhập)
│   ├── stores/
│   │   └── authStore.js           # Zustand store quản lý auth
│   ├── lib/
│   │   ├── api.js                 # Axios instance với interceptors
│   │   ├── queryClient.js         # TanStack Query config
│   │   └── utils.js               # Utility functions
│   ├── App.jsx                    # Router configuration
│   └── main.jsx                   # Entry point với providers
├── .env                           # Environment variables
└── package.json
```

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies

```bash
cd FE
npm install
```

### 2. Cấu hình API URL

File `.env` đã được tạo với config mặc định:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## 🎯 Hướng dẫn sử dụng

### 1. Truy cập Landing Page

- Mở trình duyệt: `http://localhost:5173`
- Click "Bắt đầu ngay" hoặc "Đăng nhập"

### 2. Đăng nhập

- Nhập email và password (phải là tài khoản đã đăng ký trong hệ thống)
- Click "Đăng nhập"
- System sẽ gọi API: `POST /auth/login`

### 3. Sau khi đăng nhập thành công

- Tự động chuyển đến `/home`
- Session được lưu trong localStorage
- Token được tự động thêm vào header của các API call
- Refresh page vẫn giữ trạng thái đăng nhập

### 4. Đăng xuất

- Click nút "Đăng xuất" trên HomePage
- Session được xóa khỏi localStorage
- Tự động redirect về `/login`

## 🔧 Tech Stack

### Frontend Framework

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router DOM v6** - Routing

### Styling

- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui pattern** - UI components

### State Management

- **Zustand** - Global state với persist middleware
- **TanStack Query** - Server state management

### Form & Validation

- **React Hook Form** - Form handling
- **Zod** - Schema validation

### HTTP Client

- **Axios** - API calls với interceptors

### Notifications

- **React Toastify** - Toast notifications

## 🔐 Authentication Flow

### Login Process

```
1. User nhập email + password
2. Form validation (Zod schema)
3. POST /auth/login → Backend API
4. Nhận response: { user, accessToken, refreshToken }
5. Lưu vào Zustand store + localStorage
6. Navigate to /home
```

### Protected Route Check

```
1. User truy cập /home
2. ProtectedRoute check isAuthenticated
3. Nếu false → Navigate to /login
4. Nếu true → Render HomePage
```

### Token Refresh (Auto)

```
1. API call nhận 401 Unauthorized
2. Axios interceptor catch error
3. Gọi POST /auth/refresh với refreshToken
4. Nhận accessToken mới
5. Retry request gốc với token mới
6. Nếu refresh fail → Logout + Navigate to /login
```

### Logout Process

```
1. User click "Đăng xuất"
2. authStore.logout() → Clear state
3. localStorage được xóa
4. Navigate to /login
```

## 🛡️ Security Features

1. **JWT Token Management**
   - Access token trong memory (Zustand)
   - Refresh token trong localStorage
   - Auto refresh khi token hết hạn

2. **Protected Routes**
   - Route guards check authentication
   - Auto redirect based on auth state

3. **API Interceptors**
   - Auto add Bearer token to requests
   - Handle 401 errors globally
   - Secure token refresh mechanism

## 📝 API Endpoints (Backend)

Ứng dụng cần backend API với các endpoints:

```
POST /auth/login
Body: { email, password }
Response: { user, accessToken, refreshToken }

POST /auth/refresh
Body: { refreshToken }
Response: { accessToken }
```

## 🎨 UI Components

### Button Variants

```jsx
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm|default|lg">Sizes</Button>
```

### Card Components

```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Form Components

```jsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="email@example.com" />
```

## 🔄 Routing

### Public Routes (Không cần auth)

- `/` - Landing Page

### Semi-Public Routes (Chỉ khi chưa đăng nhập)

- `/login` - Login Page

### Protected Routes (Cần auth)

- `/home` - Home Page

### Fallback

- `*` - Redirect to `/`

## 📱 Responsive Design

- Mobile-first approach với Tailwind CSS
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-friendly buttons

## 🚧 Mở rộng thêm

### Thêm trang mới

1. Tạo component trong `src/pages/`
2. Import vào `App.jsx`
3. Thêm route vào `<Routes>`

### Thêm protected route

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/new-page" element={<NewPage />} />
</Route>
```

### Thêm chức năng mới

- Tasks management
- User profile
- Settings
- Dashboard
- Team collaboration

## 🐛 Troubleshooting

### Không đăng nhập được

1. Kiểm tra backend API đang chạy
2. Check console để xem error message
3. Verify VITE_API_URL trong .env
4. Kiểm tra CORS settings ở backend

### Session bị mất sau refresh

1. Check localStorage có data không
2. Verify Zustand persist config
3. Check browser console cho errors

### Token hết hạn

- Auto refresh đã được implement
- Nếu refresh token hết hạn → phải đăng nhập lại

## 📄 License

MIT

## 👨‍💻 Author

TaskApp Team - 2026
