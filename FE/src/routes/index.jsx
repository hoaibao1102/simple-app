import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TasksPage";
import ProfilePage from "../pages/ProfilePage";
import AdminUsersPage from "../pages/AdminUsersPage";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - Trang landing, ai cũng truy cập được */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Routes - Chỉ truy cập được khi chưa đăng nhập */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes - Chỉ truy cập được khi đã đăng nhập */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Admin Routes - Chỉ Admin mới truy cập được */}
      <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin/users" element={<AdminUsersPage />} />
      </Route>

      {/* Redirect các route không tồn tại về landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
