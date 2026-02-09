/**
 * API Module - Central export point cho tất cả API functions
 *
 * Import example:
 * import { authApi, userApi, taskApi, adminApi } from '@/api'
 * hoặc
 * import { login, register } from '@/api'
 */

// Import API clients
import apiClient from "./apiClient";

// Import API modules
import * as authApi from "./auth.api";
import * as userApi from "./user.api";
import * as taskApi from "./task.api";
import * as adminApi from "./admin.api";

// Export modules
export { authApi, userApi, taskApi, adminApi };

// Export apiClient for direct use if needed
export { apiClient };

// Export individual functions for convenience
// Auth API
export const { login, register, refreshToken, logout } = authApi;

// User API (chỉ có API thực tế)
export const { getProfile } = userApi;

// Task API (chỉ có API thực tế)
export const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = taskApi;

// Admin API (cho role ADMIN)
export const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = adminApi;

// Default export
export default {
  auth: authApi,
  user: userApi,
  task: taskApi,
  admin: adminApi,
  client: apiClient,
};
