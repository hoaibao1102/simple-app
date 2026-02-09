import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

/**
 * RoleProtectedRoute component - Bảo vệ các route chỉ cho phép role cụ thể truy cập
 * @param {Array<string>} allowedRoles - Danh sách các role được phép truy cập (VD: ["ADMIN"])
 */
export default function RoleProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuthStore();

  // Chưa đăng nhập -> redirect login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập nhưng không có role phù hợp -> redirect home với thông báo
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/home" replace />;
  }

  // Có quyền truy cập -> render route
  return <Outlet />;
}
