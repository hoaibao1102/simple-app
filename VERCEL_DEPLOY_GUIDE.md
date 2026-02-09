# Hướng dẫn Deploy lên Vercel

## ✅ Đúng rồi! Vercel sẽ tự động CI/CD khi bạn push code

Dự án của bạn đã được cấu hình sẵn với Vercel. Khi bạn push code lên Git repository (GitHub/GitLab/Bitbucket), Vercel sẽ tự động:

1. **Detect changes** - Phát hiện có commit mới
2. **Build** - Tự động build Frontend và Backend
3. **Deploy** - Deploy lên production/preview
4. **Test** - Chạy health check
5. **Notify** - Thông báo kết quả qua email/Discord/Slack

---

## 🚀 Quy trình Deploy

### Bước 1: Chuẩn bị Repository

```bash
# Khởi tạo Git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "feat: Add Swagger docs and Admin APIs for user management"

# Push lên GitHub/GitLab
git remote add origin YOUR_REPO_URL
git branch -M main
git push -u origin main
```

### Bước 2: Connect với Vercel

#### Option 1: Vercel Dashboard (Recommended)

1. Truy cập https://vercel.com
2. Login với GitHub/GitLab account
3. Click **"Add New Project"**
4. Import repository của bạn
5. Vercel sẽ tự động detect:
   - Frontend: Vite React app
   - Backend: Node.js Serverless API

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Bước 3: Configure Projects

Bạn cần deploy **2 projects riêng biệt**:

#### 🎨 Frontend Project

**Root Directory**: `FE`

**Build Settings**:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Environment Variables**:
```
VITE_API_URL=https://your-backend.vercel.app
```

#### ⚙️ Backend Project

**Root Directory**: `BE`

**Build Settings**:
- **Framework Preset**: Other
- **Build Command**: `echo "No build needed"`
- **Output Directory**: `.`
- **Install Command**: `npm install`

**Environment Variables** (Quan trọng!):
```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=https://your-frontend.vercel.app
JWT_ACCESS_SECRET=your_secure_access_secret
JWT_REFRESH_SECRET=your_secure_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 📝 Cấu hình đã có sẵn

### Backend: BE/vercel.json ✅

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**Giải thích**:
- Sử dụng `api/index.js` làm entry point (Serverless Function)
- Route tất cả requests đến handler
- Set NODE_ENV=production

### Frontend: FE/vercel.json ✅

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Giải thích**:
- SPA routing - mọi route đều trả về index.html
- Client-side routing hoạt động với React Router

### Entry Point: BE/api/index.js ✅

Được tối ưu cho Vercel Serverless:
- Singleton pattern cho app initialization
- Reuse DB connection
- Error handling

---

## 🔄 Auto CI/CD Workflow

Sau khi setup xong, mỗi khi bạn push code:

### Production Deploy (branch `main`/`master`)
```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Vercel sẽ**:
1. ✅ Trigger build tự động
2. ✅ Run `npm install` và `npm run build` (FE)
3. ✅ Deploy lên production URLs
4. ✅ Gửi notification

### Preview Deploy (các branch khác)
```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

**Vercel sẽ**:
1. ✅ Tạo preview deployment riêng
2. ✅ Generate unique URL (vd: `feature-new-feature-hash.vercel.app`)
3. ✅ Comment preview link vào Pull Request
4. ✅ Không ảnh hưởng production

---

## 🌐 URLs sau khi Deploy

### Frontend
```
Production: https://your-app-name.vercel.app
Preview:    https://your-app-name-git-branch-username.vercel.app
```

### Backend
```
Production: https://your-api-name.vercel.app
Health:     https://your-api-name.vercel.app/api/health
Swagger:    https://your-api-name.vercel.app/api-docs
```

---

## ⚙️ Environment Variables Setup

### Trong Vercel Dashboard

1. Vào project settings
2. Navigate to **Environment Variables**
3. Add các variables:

#### Production Environment
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
CORS_ORIGIN=https://your-frontend.vercel.app
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=5000
```

#### Preview/Development Environment (optional)
Có thể dùng MongoDB test database hoặc dùng chung với production

### Generate Strong Secrets

```bash
# Tạo random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔍 Monitoring & Debugging

### View Deployment Logs

1. Vào Vercel Dashboard
2. Click vào deployment
3. Xem tab **"Logs"**

### View Runtime Logs

```bash
# With Vercel CLI
vercel logs YOUR_DEPLOYMENT_URL
```

### Common Issues

#### ❌ Build Failed
```
Error: MONGODB_URI is not defined
```
**Solution**: Add MONGODB_URI trong Environment Variables

#### ❌ CORS Error
```
Access to fetch at 'https://api...' from origin 'https://app...' has been blocked by CORS
```
**Solution**: Update `CORS_ORIGIN` trong Backend env vars

#### ❌ 404 on Refresh
**Already fixed**: Frontend `vercel.json` có rewrites để handle SPA routing

---

## 📊 Deployment Status

```bash
# Check deployment status
vercel ls

# View project info
vercel inspect YOUR_URL
```

---

## 🎯 Checklist trước khi Deploy

### Backend ✅
- [x] `vercel.json` đã có
- [x] `api/index.js` entry point đã có
- [x] Environment variables cần thiết
- [ ] MongoDB URI production-ready
- [ ] CORS origin đúng với Frontend URL
- [ ] JWT secrets đủ mạnh (min 32 chars)

### Frontend ✅
- [x] `vercel.json` với rewrites
- [x] Build command: `npm run build`
- [ ] `VITE_API_URL` trỏ đến Backend URL
- [ ] Test build local: `npm run build && npm run preview`

### Git
- [ ] `.gitignore` không commit `.env`, `node_modules`
- [ ] Code đã commit và push lên repository
- [ ] README.md cập nhật hướng dẫn

---

## 🚀 Deploy Flow Summary

```
1. Push Code
   ↓
2. Vercel Detect Changes
   ↓
3. Auto Build
   ├── Frontend: npm install → npm run build
   └── Backend: npm install → verify
   ↓
4. Deploy to Edge Network
   ├── Frontend: CDN (Global)
   └── Backend: Serverless Functions
   ↓
5. Health Check
   ↓
6. ✅ Live! 🎉
```

---

## 💡 Best Practices

### 1. Branch Strategy
```
main/master     → Production (auto-deploy)
develop         → Staging (preview)
feature/*       → Feature preview
hotfix/*        → Emergency fix preview
```

### 2. Environment-specific Config
```javascript
// FE/src/config/env.js
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### 3. Commit Message Convention
```bash
git commit -m "feat: Add admin user management APIs"
git commit -m "fix: Resolve Swagger documentation path"
git commit -m "docs: Update API endpoints documentation"
```

### 4. Zero-Downtime Deployment
Vercel tự động đảm bảo:
- ✅ Build mới xong mới switch traffic
- ✅ Rollback tức thì nếu có lỗi
- ✅ Keep cả phiên bản cũ

---

## 📞 Next Steps

1. **Push code lên Git**
   ```bash
   git add .
   git commit -m "feat: Complete Swagger and Admin APIs"
   git push origin main
   ```

2. **Connect Vercel**: https://vercel.com/new

3. **Add Environment Variables** trong Vercel Dashboard

4. **Deploy!** - Vercel sẽ tự động build và deploy

5. **Update Frontend API URL** sau khi có Backend URL

6. **Test Production**: Kiểm tra Swagger, test APIs

---

## ✅ Kết luận

**Đúng rồi!** Sau khi setup lần đầu, bạn **CHỈ CẦN PUSH CODE** là Vercel sẽ tự động:

- ✅ Detect changes
- ✅ Build
- ✅ Test
- ✅ Deploy
- ✅ Notify

**Không cần**: Manually build, upload, configure server, restart services

**Vercel lo hết!** 🚀
