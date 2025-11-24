const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
  },

  STUDENTS: {
    GET_ALL: `${API_BASE_URL}/students`,
    GET_BY_ID: (id) => `${API_BASE_URL}/students/${id}`,
    CREATE: `${API_BASE_URL}/students`,
    UPDATE: (id) => `${API_BASE_URL}/students/${id}`,
    DELETE: (id) => `${API_BASE_URL}/students/${id}`,
    BULK_UPLOAD: `${API_BASE_URL}/students/bulk-upload`,
  },

  RESULTS: {
    GET_ALL: `${API_BASE_URL}/results`,
    GET_BY_STUDENT: (studentId) =>
      `${API_BASE_URL}/results/student/${studentId}`,
    UPLOAD: `${API_BASE_URL}/results/upload`,
    GET_ANALYTICS: `${API_BASE_URL}/results/analytics`,
    DOWNLOAD_PDF: (resultId) => `${API_BASE_URL}/results/${resultId}/pdf`,
  },
};
