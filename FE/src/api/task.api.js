import apiClient from "./apiClient";

/**
 * Task API - Quản lý các API liên quan đến tasks
 * CHÚ Ý: BE sử dụng status: TODO, IN_PROGRESS, DONE
 */

// Map FE status to BE status
const mapStatusToBE = (status) => {
  const statusMap = {
    pending: "TODO",
    "in-progress": "IN_PROGRESS",
    completed: "DONE",
  };
  return statusMap[status] || status;
};

// Map BE status to FE status
const mapStatusToFE = (status) => {
  const statusMap = {
    TODO: "pending",
    IN_PROGRESS: "in-progress",
    DONE: "completed",
  };
  return statusMap[status] || status;
};

// Map BE task to FE task format
const mapTaskToFE = (task) => ({
  ...task,
  status: mapStatusToFE(task.status),
});

/**
 * Lấy danh sách tất cả tasks của user
 * GET /api/tasks
 * @param {Object} [params] - Query parameters
 * @param {string} [params.status] - Filter by status (pending, in-progress, completed)
 * @param {number} [params.page] - Số trang
 * @param {number} [params.limit] - Số lượng items per page
 * @returns {Promise<Array>} List of tasks
 */
export const getAllTasks = async (params = {}) => {
  // Map FE status to BE status if needed
  if (params.status) {
    params.status = mapStatusToBE(params.status);
  }

  const response = await apiClient.get("/api/tasks", { params });
  // BE returns { data: [...], meta: {...} }
  const tasks = response.data.data || response.data;
  return Array.isArray(tasks) ? tasks.map(mapTaskToFE) : [];
};

/**
 * Lấy thông tin chi tiết một task
 * GET /api/tasks/:id
 * @param {string} taskId - ID của task
 * @returns {Promise<Object>} Task data
 */
export const getTaskById = async (taskId) => {
  const response = await apiClient.get(`/api/tasks/${taskId}`);
  return mapTaskToFE(response.data);
};

/**
 * Tạo task mới
 * POST /api/tasks
 * @param {Object} taskData - Dữ liệu task
 * @param {string} taskData.title - Tiêu đề task
 * @param {string} [taskData.description] - Mô tả
 * @param {string} [taskData.status] - Trạng thái (pending, in-progress, completed)
 * @returns {Promise<Object>} Created task
 */
export const createTask = async (taskData) => {
  const dataToSend = { ...taskData };
  if (dataToSend.status) {
    dataToSend.status = mapStatusToBE(dataToSend.status);
  }

  const response = await apiClient.post("/api/tasks", dataToSend);
  return mapTaskToFE(response.data);
};

/**
 * Cập nhật task
 * PATCH /api/tasks/:id
 * @param {string} taskId - ID của task
 * @param {Object} taskData - Dữ liệu cần update
 * @returns {Promise<Object>} Updated task
 */
export const updateTask = async (taskId, taskData) => {
  const dataToSend = { ...taskData };
  if (dataToSend.status) {
    dataToSend.status = mapStatusToBE(dataToSend.status);
  }

  const response = await apiClient.patch(`/api/tasks/${taskId}`, dataToSend);
  return mapTaskToFE(response.data);
};

/**
 * Xóa task
 * DELETE /api/tasks/:id
 * @param {string} taskId - ID của task cần xóa
 * @returns {Promise<Object>}
 */
export const deleteTask = async (taskId) => {
  const response = await apiClient.delete(`/api/tasks/${taskId}`);
  return response.data;
};

// Export all task APIs
export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
