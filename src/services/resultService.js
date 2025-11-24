import api from "./api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const resultService = {
  getAll: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.RESULTS.GET_ALL, { params });
    return response.data;
  },

  getByStudent: async (studentId) => {
    const response = await api.get(
      API_ENDPOINTS.RESULTS.GET_BY_STUDENT(studentId)
    );
    return response.data;
  },

  upload: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(API_ENDPOINTS.RESULTS.UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get(API_ENDPOINTS.RESULTS.GET_ANALYTICS);
    return response.data;
  },

  downloadPDF: async (resultId) => {
    const response = await api.get(
      API_ENDPOINTS.RESULTS.DOWNLOAD_PDF(resultId),
      {
        responseType: "blob",
      }
    );
    return response.data;
  },
};
