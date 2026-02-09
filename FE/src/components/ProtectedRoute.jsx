import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

/**
 * ProtectedRoute component - Bảo vệ các route chỉ cho phép người dùng đã đăng nhập truy cập
 * Nếu chưa đăng nhập, tự động redirect về trang login
 */
export default function ProtectedRoute() {
  const { isAuthenticated, accessToken } = useAuthStore();

  // Check both isAuthenticated flag and accessToken to ensure user is logged in
  if (!isAuthenticated || !accessToken) {
    // Redirect về trang login nếu chưa đăng nhập
    return <Navigate to="/login" replace />;
  }

  // Render các route con nếu đã đăng nhập
  return <Outlet />;
}
