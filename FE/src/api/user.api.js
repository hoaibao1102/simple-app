import apiClient from "./apiClient";

/**
 * User API - Quản lý các API liên quan đến thông tin người dùng
 * CHÚ Ý: Chỉ giữ lại các API thực sự tồn tại trong BE
 */

/**
 * Lấy thông tin profile của user đang đăng nhập
 * GET /api/users/me
 * @returns {Promise<Object>} User profile data
 */
export const getProfile = async () => {
  const response = await apiClient.get("/api/users/me");
  return response.data;
};

// Export all user APIs
export default {
  getProfile,
};
