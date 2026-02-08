# 🚀 Hướng dẫn Deploy lên Vercel

Hướng dẫn chi tiết từng bước để deploy ứng dụng Task Manager lên Vercel.

## 📋 Yêu cầu trước khi bắt đầu

- ✅ Tài khoản GitHub
- ✅ Tài khoản Vercel (đăng ký miễn phí tại [vercel.com](https://vercel.com))
- ✅ MongoDB Atlas account (miễn phí tại [mongodb.com](https://www.mongodb.com/cloud/atlas))
- ✅ Code đã được push lên GitHub

## 🎯 Tổng quan kiến trúc

```
GitHub Repository
    ↓
    ├── Backend (BE/)  → Vercel Serverless Functions
    │   └── API URL: https://your-api.vercel.app
    │
    └── Frontend (FE/) → Vercel Static Hosting
        └── Web URL: https://your-app.vercel.app
                ↓
        MongoDB Atlas (Cloud Database)
```

## 📝 BƯỚC 1: Chuẩn bị MongoDB Atlas

### 1.1. Tạo Database trên MongoDB Atlas

1. Truy cập [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Đăng ký/Đăng nhập
3. Tạo **New Project**: `task-manager-project`
4. Tạo **Database** (chọn FREE tier - M0)
   - Cloud Provider: AWS
   - Region: Chọn gần nhất (ví dụ: Singapore)
   - Cluster Name: `TaskManagerCluster`

### 1.2. Cấu hình Database Access

1. Vào **Database Access** (menu bên trái)
2. Click **Add New Database User**
   - Authentication Method: Password
   - Username: `taskmanager_user`
   - Password: Tạo password mạnh (lưu lại để dùng sau)
   - Database User Privileges: **Read and write to any database**
3. Click **Add User**

### 1.3. Cấu hình Network Access

1. Vào **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (cho phép 0.0.0.0/0)
   - ⚠️ Trong production thực tế, nên giới hạn IP cụ thể
4. Click **Confirm**

### 1.4. Lấy Connection String

1. Vào **Database** → Click **Connect** trên cluster của bạn
2. Chọn **Connect your application**
3. Driver: **Node.js**
4. Copy connection string, nó sẽ có dạng:
   ```
   mongodb+srv://taskmanager_user:<password>@taskmanagercluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Thay `<password>`** bằng password thật của user
6. **Thêm database name** vào cuối: `...mongodb.net/task_manager?retryWrites=true&w=majority`

**Connection string hoàn chỉnh:**

```
mongodb+srv://taskmanager_user:YourPassword123@taskmanagercluster.xxxxx.mongodb.net/task_manager?retryWrites=true&w=majority
```

## 📝 BƯỚC 2: Deploy Backend lên Vercel

### 2.1. Import Project từ GitHub

1. Đăng nhập [Vercel](https://vercel.com)
2. Click **Add New...** → **Project**
3. **Import Git Repository** → Chọn repository `simple-app`
4. Vercel sẽ phát hiện monorepo

### 2.2. Cấu hình Backend Project

**Project Settings:**

- **Project Name**: `task-manager-api` (hoặc tên bạn muốn)
- **Framework Preset**: Other
- **Root Directory**: Click **Edit** → Chọn `BE`
- **Build Command**: `npm run vercel-build` (hoặc để trống)
- **Output Directory**: Để trống
- **Install Command**: `npm install`

### 2.3. Thêm Environment Variables

Click **Environment Variables**, thêm các biến sau:

| Name                     | Value               | Note                                                                                 |
| ------------------------ | ------------------- | ------------------------------------------------------------------------------------ |
| `NODE_ENV`               | `production`        |                                                                                      |
| `MONGODB_URI`            | `mongodb+srv://...` | Connection string từ MongoDB Atlas                                                   |
| `JWT_ACCESS_SECRET`      | `your_secret_here`  | Tạo bằng: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `JWT_REFRESH_SECRET`     | `your_secret_here`  | Tạo secret khác                                                                      |
| `JWT_ACCESS_EXPIRES_IN`  | `15m`               |                                                                                      |
| `JWT_REFRESH_EXPIRES_IN` | `7d`                |                                                                                      |
| `CORS_ORIGIN`            | `*`                 | Sau này thay bằng URL frontend thật                                                  |

**Tạo JWT Secrets mạnh:**

```bash
# Chạy lệnh này 2 lần để có 2 secrets khác nhau
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.4. Deploy Backend

1. Click **Deploy**
2. Đợi 2-3 phút để Vercel build và deploy
3. Sau khi deploy xong, bạn sẽ có URL: `https://task-manager-api.vercel.app`

### 2.5. Test Backend API

Mở trình duyệt hoặc Postman test:

```
https://task-manager-api.vercel.app/api/health
```

Bạn sẽ thấy response:

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

**Test Swagger Documentation:**

```
https://task-manager-api.vercel.app/api-docs
```

## 📝 BƯỚC 3: Deploy Frontend lên Vercel

### 3.1. Import Frontend Project

1. Trên Vercel Dashboard, click **Add New...** → **Project**
2. Chọn lại repository `simple-app`
3. Lần này chọn root directory khác

### 3.2. Cấu hình Frontend Project

**Project Settings:**

- **Project Name**: `task-manager-app`
- **Framework Preset**: Vite
- **Root Directory**: Click **Edit** → Chọn `FE`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.3. Thêm Environment Variables

| Name           | Value                                 | Note                   |
| -------------- | ------------------------------------- | ---------------------- |
| `VITE_API_URL` | `https://task-manager-api.vercel.app` | URL backend vừa deploy |

### 3.4. Deploy Frontend

1. Click **Deploy**
2. Đợi 2-3 phút
3. Sau khi deploy xong, bạn sẽ có URL: `https://task-manager-app.vercel.app`

## 📝 BƯỚC 4: Cập nhật CORS Backend

Backend cần cho phép frontend truy cập:

### 4.1. Cập nhật Environment Variable

1. Vào project **task-manager-api** trên Vercel
2. **Settings** → **Environment Variables**
3. Sửa `CORS_ORIGIN`:
   - Xóa giá trị `*`
   - Thêm: `https://task-manager-app.vercel.app`
4. **Save**

### 4.2. Redeploy Backend

1. Vào **Deployments** tab
2. Click **...** ở deployment mới nhất
3. Click **Redeploy**
4. Chọn **Use existing Build Cache**: No
5. Click **Redeploy**

## 📝 BƯỚC 5: Test toàn bộ ứng dụng

### 5.1. Test Frontend

Mở: `https://task-manager-app.vercel.app`

### 5.2. Test API từ Frontend

1. Mở browser DevTools (F12)
2. Vào tab **Network**
3. Thử đăng ký/đăng nhập
4. Kiểm tra requests gọi đến backend URL

### 5.3. Test End-to-End

- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập
- ✅ Tạo task mới
- ✅ Xem danh sách tasks
- ✅ Cập nhật task
- ✅ Xóa task

## 🔧 Troubleshooting

### Lỗi: "Cannot connect to database"

**Nguyên nhân:** Connection string MongoDB không đúng hoặc Network Access chưa cho phép.

**Giải pháp:**

1. Kiểm tra `MONGODB_URI` trên Vercel có đúng không
2. Xác nhận password đã replace `<password>` trong connection string
3. Kiểm tra MongoDB Atlas Network Access có cho phép 0.0.0.0/0

### Lỗi: "CORS policy block"

**Nguyên nhân:** Backend chưa cho phép frontend origin.

**Giải pháp:**

1. Cập nhật `CORS_ORIGIN` trên backend project
2. Redeploy backend

### Lỗi: "Module not found"

**Nguyên nhân:** Dependencies chưa được install đúng.

**Giải pháp:**

1. Kiểm tra `package.json` có đầy đủ dependencies
2. Xóa cache và redeploy:
   - Deployments → ... → Redeploy
   - Bỏ tick "Use existing Build Cache"

### Lỗi 500 Internal Server Error

**Giải pháp:**

1. Vào Vercel project → **Deployments**
2. Click vào deployment mới nhất
3. Xem **Function Logs** để debug
4. Kiểm tra environment variables

## 📊 URLs quan trọng sau khi deploy

| Service      | URL                                              | Purpose           |
| ------------ | ------------------------------------------------ | ----------------- |
| Frontend     | `https://task-manager-app.vercel.app`            | Web UI            |
| Backend API  | `https://task-manager-api.vercel.app/api`        | API endpoints     |
| Swagger Docs | `https://task-manager-api.vercel.app/api-docs`   | API documentation |
| Health Check | `https://task-manager-api.vercel.app/api/health` | Server status     |

## 🎨 Custom Domain (Tùy chọn)

### Thêm domain riêng cho Frontend

1. Vào project frontend → **Settings** → **Domains**
2. Click **Add Domain**
3. Nhập domain của bạn: `taskmanager.yourdomain.com`
4. Follow hướng dẫn cấu hình DNS

### Thêm domain riêng cho Backend

1. Vào project backend → **Settings** → **Domains**
2. Thêm: `api.yourdomain.com`
3. Cập nhật `VITE_API_URL` ở frontend
4. Cập nhật `CORS_ORIGIN` ở backend

## 🔄 Tự động deploy khi push code

Vercel đã tự động setup CI/CD:

- ✅ **Push lên branch `main`** → Deploy production
- ✅ **Push lên branch khác** → Deploy preview
- ✅ **Pull Request** → Deploy preview URL

### Workflow:

```bash
# Làm việc trên nhánh develop
git checkout -b develop
# ... code changes ...
git add .
git commit -m "feat: Add new feature"
git push origin develop

# Vercel sẽ tự động deploy preview URL để test
# Sau khi test OK, merge vào main
git checkout main
git merge develop
git push origin main

# Vercel tự động deploy production
```

## 📈 Monitor & Analytics

### Xem logs

1. Vào Vercel Dashboard
2. Chọn project
3. **Deployments** → Click deployment mới nhất
4. Xem **Function Logs** (Backend) hoặc **Build Logs**

### View Analytics

1. Vào project → **Analytics** tab
2. Xem:
   - Page views
   - Visitors
   - Top pages
   - Countries

## 🎯 Checklist hoàn chỉnh

### Pre-deployment

- [ ] Code đã được test kỹ local
- [ ] File `.env` không được commit (chỉ `.env.example`)
- [ ] MongoDB Atlas đã setup và có connection string
- [ ] JWT secrets đã tạo random mạnh
- [ ] Code đã push lên GitHub

### MongoDB Atlas

- [ ] Database cluster đã tạo
- [ ] Database user đã tạo với password mạnh
- [ ] Network access cho phép 0.0.0.0/0
- [ ] Connection string đã copy và test

### Backend Deployment

- [ ] Project đã import từ GitHub
- [ ] Root directory = `BE`
- [ ] Environment variables đã thêm đầy đủ
- [ ] Deploy thành công
- [ ] Test `/api/health` endpoint
- [ ] Test `/api-docs` Swagger UI

### Frontend Deployment

- [ ] Project đã import từ GitHub
- [ ] Root directory = `FE`
- [ ] `VITE_API_URL` đã set đúng backend URL
- [ ] Deploy thành công
- [ ] Website mở được

### Post-deployment

- [ ] CORS_ORIGIN đã cập nhật với frontend URL
- [ ] Backend đã redeploy sau khi cập nhật CORS
- [ ] Test đăng ký tài khoản
- [ ] Test đăng nhập
- [ ] Test CRUD tasks
- [ ] Check browser console không có lỗi
- [ ] Test các API endpoint quan trọng

## 💡 Tips & Best Practices

### 1. Environment Variables

- ✅ **Không bao giờ** hardcode secrets trong code
- ✅ Sử dụng environment variables cho mọi config
- ✅ Tạo JWT secrets ngẫu nhiên mạnh (32+ characters)

### 2. Security

- ✅ Thay đổi tất cả default secrets
- ✅ Sử dụng HTTPS (Vercel tự động)
- ✅ Giới hạn CORS origin cụ thể (không dùng `*` production)
- ✅ MongoDB user chỉ có quyền cần thiết

### 3. Performance

- ✅ Enable Vercel Analytics
- ✅ Monitor function execution time
- ✅ Optimize database queries với indexes
- ✅ Use connection pooling (Mongoose default)

### 4. Git Workflow

```bash
# Development
git checkout -b feature/new-feature
# ... code ...
git push origin feature/new-feature
# Test ở preview URL

# Production
git checkout main
git merge feature/new-feature
git push origin main
# Auto deploy production
```

## 🆘 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Express on Vercel**: https://vercel.com/guides/using-express-with-vercel
- **Vite on Vercel**: https://vercel.com/docs/frameworks/vite

## 🎉 Hoàn thành!

Chúc mừng! Bạn đã deploy thành công ứng dụng Task Manager lên Vercel.

URLs của bạn:

- 🌐 **Frontend**: https://task-manager-app.vercel.app
- 🔧 **Backend API**: https://task-manager-api.vercel.app
- 📚 **API Docs**: https://task-manager-api.vercel.app/api-docs

Giờ bạn có thể chia sẻ links này trong CV, portfolio hoặc với bạn bè! 🚀
