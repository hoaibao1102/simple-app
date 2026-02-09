import axios from "axios";
import { useAuthStore } from "../stores/authStore";

/**
 * API Client - Cấu hình axios instance dùng chung cho toàn bộ ứng dụng
 *
 * Features:
 * - Auto add Bearer token to requests
 * - Auto refresh token on 401 errors
 * - Centralized error handling
 */

const API_URL = import.meta.env.VITE_API_URL;

// Tạo axios instance với base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request Interceptor
 * Tự động thêm access token vào header của mỗi request
 */
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * Xử lý tự động refresh token khi nhận 401 Unauthorized
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Không retry cho các auth endpoints (login, register) để tránh infinite loop
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh");

    // Xử lý lỗi 401 (Unauthorized) - Token hết hạn
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = useAuthStore.getState();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // BE yêu cầu refresh token trong Authorization header
        const response = await axios.post(
          `${API_URL}/api/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const { access_token } = response.data;

        // Update token mới vào store
        useAuthStore.getState().updateAccessToken(access_token);

        // Retry request gốc với token mới
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh thất bại, chỉ logout (không reload trang)
        // React Router sẽ tự động redirect thông qua ProtectedRoute
        console.error("Token refresh failed:", refreshError);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    // Log error cho debugging
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        message: error.response.data?.message,
        endpoint: error.config?.url,
      });
    }

    return Promise.reject(error);
  },
);

export default apiClient;
