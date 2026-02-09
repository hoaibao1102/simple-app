import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

/**
 * PublicRoute component - Chỉ cho phép truy cập khi chưa đăng nhập
 * Nếu đã đăng nhập, tự động redirect về trang home
 */
export default function PublicRoute({ children }) {
  const { isAuthenticated, accessToken } = useAuthStore();

  // Check both isAuthenticated flag and accessToken
  if (isAuthenticated && accessToken) {
    // Redirect về trang home nếu đã đăng nhập
    return <Navigate to="/home" replace />;
  }

  // Render component nếu chưa đăng nhập
  return children;
}
