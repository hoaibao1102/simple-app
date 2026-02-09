import apiClient from "./apiClient";

/**
 * Auth API - Quản lý các API liên quan đến xác thực người dùng
 */

/**
 * Đăng nhập với email và password
 * @param {Object} credentials - Thông tin đăng nhập
 * @param {string} credentials.email - Email người dùng
 * @param {string} credentials.password - Mật khẩu
 * @returns {Promise<{user: Object, access_token: string, refresh_token: string}>}
 */
export const login = async (credentials) => {
  const response = await apiClient.post("/api/auth/login", credentials);
  const data = response.data;
  // Map BE response format to FE format
  return {
    user: data.user,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
};

/**
 * Đăng ký tài khoản mới
 * @param {Object} userData - Thông tin đăng ký
 * @param {string} userData.fullName - Họ tên đầy đủ
 * @param {string} userData.email - Email
 * @param {string} userData.password - Mật khẩu
 * @returns {Promise<{message: string, user: Object}>}
 */
export const register = async (userData) => {
  const response = await apiClient.post("/api/auth/register", userData);
  return response.data;
};

/**
 * Làm mới access token bằng refresh token
 * Lưu ý: BE yêu cầu refresh token trong Authorization header, không phải body
 * @returns {Promise<{access_token: string}>}
 */
export const refreshToken = async () => {
  const response = await apiClient.post("/api/auth/refresh");
  const data = response.data;
  return {
    accessToken: data.access_token,
  };
};

/**
 * Đăng xuất (optional - nếu backend có endpoint logout)
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await apiClient.post("/api/auth/logout");
  } catch (error) {
    // Ignore error, logout locally anyway
    console.warn("Logout API failed:", error);
  }
};

// Export all auth APIs
export default {
  login,
  register,
  refreshToken,
  logout,
};
