import api from "./api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const studentService = {
  getAll: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.STUDENTS.GET_ALL, { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(API_ENDPOINTS.STUDENTS.GET_BY_ID(id));
    return response.data;
  },

  create: async (data) => {
    const response = await api.post(API_ENDPOINTS.STUDENTS.CREATE, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(API_ENDPOINTS.STUDENTS.UPDATE(id), data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(API_ENDPOINTS.STUDENTS.DELETE(id));
    return response.data;
  },

  bulkUpload: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
      API_ENDPOINTS.STUDENTS.BULK_UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};
