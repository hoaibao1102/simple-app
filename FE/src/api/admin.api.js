import apiClient from "./apiClient";

/**
 * Admin API - Quản lý các API dành cho Admin
 * CHÚ Ý: Tất cả API admin yêu cầu role ADMIN
 */

/**
 * Lấy danh sách tất cả users (Admin only)
 * GET /api/admin/users
 * @param {Object} [params] - Query parameters
 * @param {number} [params.page] - Số trang (default: 1)
 * @param {number} [params.limit] - Số items per page (default: 20, max: 100)
 * @param {string} [params.role] - Filter by role (ADMIN, USER)
 * @param {string} [params.status] - Filter by status (ACTIVE, INACTIVE)
 * @param {string} [params.search] - Tìm kiếm theo email hoặc fullName
 * @returns {Promise<Object>} { data: [...], pagination: {...} }
 */
export const getAllUsers = async (params = {}) => {
  const response = await apiClient.get("/api/admin/users", { params });
  return response.data;
};

/**
 * Lấy thông tin chi tiết một user (Admin only)
 * GET /api/admin/users/:id
 * @param {string} userId - ID của user
 * @returns {Promise<Object>} User data with timestamps
 */
export const getUserById = async (userId) => {
  const response = await apiClient.get(`/api/admin/users/${userId}`);
  return response.data;
};

/**
 * Cập nhật thông tin user (Admin only)
 * PATCH /api/admin/users/:id
 * @param {string} userId - ID của user
 * @param {Object} userData - Dữ liệu cần update
 * @param {string} [userData.role] - Role mới (ADMIN, USER)
 * @param {string} [userData.status] - Status mới (ACTIVE, INACTIVE)
 * @param {string} [userData.fullName] - Tên mới
 * @returns {Promise<Object>} { message, user }
 */
export const updateUser = async (userId, userData) => {
  const response = await apiClient.patch(
    `/api/admin/users/${userId}`,
    userData,
  );
  return response.data;
};

/**
 * Xóa user (soft delete - set INACTIVE) (Admin only)
 * DELETE /api/admin/users/:id
 * @param {string} userId - ID của user cần xóa
 * @returns {Promise<Object>} { message, user }
 */
export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/api/admin/users/${userId}`);
  return response.data;
};

// Export all admin APIs
export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
