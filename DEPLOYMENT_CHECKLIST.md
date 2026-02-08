# ✅ Deployment Checklist - Task Manager

Checklist nhanh để deploy lên Vercel. Follow từng bước theo thứ tự.

## 📋 Pre-Deployment Checklist

### Local Development

- [ ] Code đã test kỹ trên local
- [ ] `.env` không bị commit (check `.gitignore`)
- [ ] `package.json` có đầy đủ dependencies
- [ ] Code đã được push lên GitHub repository

### Tools Ready

- [ ] Tài khoản GitHub (đã có repository)
- [ ] Tài khoản Vercel (đăng ký tại vercel.com)
- [ ] Tài khoản MongoDB Atlas (đăng ký tại mongodb.com)

---

## 🗄️ STEP 1: MongoDB Atlas Setup

### 1.1 Create Database

- [ ] Login to MongoDB Atlas
- [ ] Create new Project: `task-manager-project`
- [ ] Create Cluster (FREE M0 tier)
  - Provider: AWS
  - Region: Singapore hoặc gần nhất
  - Name: `TaskManagerCluster`

### 1.2 Database Access

- [ ] Navigate to: Database Access
- [ ] Add New Database User
  - Username: `taskmanager_user`
  - Password: ********\_\_******** (tạo password mạnh, ghi lại)
  - Role: Read and write to any database
- [ ] Click Add User

### 1.3 Network Access

- [ ] Navigate to: Network Access
- [ ] Add IP Address
- [ ] Allow Access from Anywhere (0.0.0.0/0)
- [ ] Click Confirm

### 1.4 Get Connection String

- [ ] Database → Connect → Connect your application
- [ ] Driver: Node.js
- [ ] Copy connection string
- [ ] Replace `<password>` với password thật
- [ ] Add database name: `task_manager`

**Connection String:**

```
mongodb+srv://taskmanager_user:YOUR_PASSWORD@taskmanagercluster.xxxxx.mongodb.net/task_manager?retryWrites=true&w=majority
```

Save this: **************************************\_\_\_**************************************

---

## 🔐 STEP 2: Generate JWT Secrets

Run this command **2 times** to get 2 different secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**JWT_ACCESS_SECRET:**

```
_________________________________________________________________
```

**JWT_REFRESH_SECRET:**

```
_________________________________________________________________
```

---

## 🚀 STEP 3: Deploy Backend to Vercel

### 3.1 Import Project

- [ ] Login to Vercel Dashboard
- [ ] Click: Add New... → Project
- [ ] Import Git Repository: `simple-app`

### 3.2 Configure Backend

- [ ] Project Name: `task-manager-api`
- [ ] Framework Preset: Other
- [ ] Root Directory: Click Edit → Select `BE`
- [ ] Build Command: Leave empty or `npm run vercel-build`
- [ ] Output Directory: Leave empty
- [ ] Install Command: `npm install`

### 3.3 Add Environment Variables

Click "Environment Variables" and add:

| Variable Name            | Value                                   | Status |
| ------------------------ | --------------------------------------- | ------ |
| `NODE_ENV`               | `production`                            | [ ]    |
| `MONGODB_URI`            | (paste connection string from Step 1.4) | [ ]    |
| `JWT_ACCESS_SECRET`      | (paste from Step 2)                     | [ ]    |
| `JWT_REFRESH_SECRET`     | (paste from Step 2)                     | [ ]    |
| `JWT_ACCESS_EXPIRES_IN`  | `15m`                                   | [ ]    |
| `JWT_REFRESH_EXPIRES_IN` | `7d`                                    | [ ]    |
| `CORS_ORIGIN`            | `*` (will update later)                 | [ ]    |

### 3.4 Deploy

- [ ] Click: Deploy
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy Backend URL: **********************\_\_\_**********************

### 3.5 Test Backend

- [ ] Open: `https://YOUR-BACKEND-URL.vercel.app/api/health`
- [ ] Should see: `{"status":"ok","message":"Server is running"}`
- [ ] Open: `https://YOUR-BACKEND-URL.vercel.app/api-docs`
- [ ] Should see: Swagger UI documentation

---

## 🎨 STEP 4: Deploy Frontend to Vercel

### 4.1 Import Frontend Project

- [ ] Vercel Dashboard → Add New... → Project
- [ ] Select same repository: `simple-app`

### 4.2 Configure Frontend

- [ ] Project Name: `task-manager-app`
- [ ] Framework Preset: Vite
- [ ] Root Directory: Click Edit → Select `FE`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### 4.3 Add Environment Variables

| Variable Name  | Value                       | Status |
| -------------- | --------------------------- | ------ |
| `VITE_API_URL` | (backend URL from Step 3.4) | [ ]    |

Example: `https://task-manager-api.vercel.app`

### 4.4 Deploy

- [ ] Click: Deploy
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy Frontend URL: **********************\_\_\_**********************

### 4.5 Test Frontend

- [ ] Open Frontend URL in browser
- [ ] Should see the app interface

---

## 🔄 STEP 5: Update CORS Configuration

### 5.1 Update Backend CORS

- [ ] Go to Backend project on Vercel
- [ ] Settings → Environment Variables
- [ ] Find `CORS_ORIGIN`
- [ ] Edit value: Replace `*` with Frontend URL from Step 4.4
- [ ] Save

### 5.2 Redeploy Backend

- [ ] Go to: Deployments tab
- [ ] Click: ... on latest deployment
- [ ] Click: Redeploy
- [ ] Uncheck: "Use existing Build Cache"
- [ ] Click: Redeploy
- [ ] Wait for redeployment

---

## ✅ STEP 6: End-to-End Testing

### 6.1 Test Health Check

- [ ] `https://YOUR-BACKEND-URL.vercel.app/api/health`
- [ ] Returns status ok

### 6.2 Test Frontend Connection

- [ ] Open Frontend URL
- [ ] Open Browser DevTools (F12) → Network tab
- [ ] Try to register/login
- [ ] Check API calls go to backend URL

### 6.3 Test Full Flow

- [ ] Register new account
- [ ] Login successfully
- [ ] Create a new task
- [ ] View task list
- [ ] Update task status
- [ ] Delete task

---

## 🎯 Final URLs

Fill in your deployed URLs:

| Service                | URL                                                             |
| ---------------------- | --------------------------------------------------------------- |
| **Frontend (Web App)** | https://_________________________________.vercel.app            |
| **Backend API**        | https://_________________________________.vercel.app            |
| **API Documentation**  | https://_________________________________.vercel.app/api-docs   |
| **Health Check**       | https://_________________________________.vercel.app/api/health |

---

## 🐛 Troubleshooting

### If Backend fails:

- [ ] Check MongoDB connection string is correct
- [ ] Check all environment variables are set
- [ ] View Function Logs in Vercel (Deployments → click deployment → Function Logs)

### If Frontend can't connect to Backend:

- [ ] Check `VITE_API_URL` is correct (no trailing slash)
- [ ] Check CORS_ORIGIN in backend matches frontend URL
- [ ] Redeploy backend after CORS change

### If CORS errors:

- [ ] Update `CORS_ORIGIN` in backend
- [ ] Redeploy backend (without cache)
- [ ] Clear browser cache and refresh frontend

### If 500 errors:

- [ ] Check Vercel Function Logs
- [ ] Verify MongoDB Atlas Network Access
- [ ] Test MongoDB connection string locally

---

## 📝 Post-Deployment Tasks

- [ ] Add URLs to README.md
- [ ] Test all API endpoints
- [ ] Add URLs to your portfolio/CV
- [ ] Share with friends/recruiters
- [ ] Monitor Vercel Analytics
- [ ] Set up custom domain (optional)

---

## 🎉 Success!

Congratulations! Your Task Manager is now live on Vercel! 🚀

Save this checklist for future reference or redeployment.
