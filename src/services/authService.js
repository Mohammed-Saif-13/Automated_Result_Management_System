import api from "./api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  verify: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.VERIFY);
    return response.data;
  },
};
