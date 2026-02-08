# Frontend - Task Manager

React + Vite frontend cho ứng dụng quản lý task.

## 🚀 Cài đặt

```bash
# Cài dependencies
npm install

# Tạo file .env từ template
cp .env.example .env

# Chạy development server
npm run dev
```

## 📝 Cấu hình Environment

Tạo file `.env` từ `.env.example` và cấu hình:

```env
VITE_API_URL=http://localhost:5000
```

## 🛠️ Scripts

- `npm run dev` - Chạy development server (port 5173)
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Check linting

## 📦 Dependencies

- React 18
- React Router DOM
- Axios
- Vite

## ⚠️ Lưu ý

- File `.env` sẽ không được commit (đã có trong .gitignore)
- Chỉ commit file `.env.example` làm template
