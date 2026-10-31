import apiClient from "../api/apiClient.js";
import { AUTH_API } from "../config/apiConfig.js";

export const login = async (credentials) => {
  const response = await apiClient.post(AUTH_API.LOGIN, credentials);
  return response.data.data;
};

export const register = async (formData) => {
  const response = await apiClient.post(AUTH_API.REGISTER, formData);
  return response.data.data;
};
