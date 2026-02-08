// Cấu hình API endpoint
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const config = {
  apiUrl: API_URL,
  endpoints: {
    auth: {
      login: `${API_URL}/api/auth/login`,
      register: `${API_URL}/api/auth/register`,
      refresh: `${API_URL}/api/auth/refresh`,
      logout: `${API_URL}/api/auth/logout`,
    },
    tasks: {
      list: `${API_URL}/api/tasks`,
      detail: (id) => `${API_URL}/api/tasks/${id}`,
      create: `${API_URL}/api/tasks`,
      update: (id) => `${API_URL}/api/tasks/${id}`,
      delete: (id) => `${API_URL}/api/tasks/${id}`,
    },
    users: {
      profile: `${API_URL}/api/users/profile`,
    },
  },
};

export default config;
