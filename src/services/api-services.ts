import axios from "axios";
import { LoginForm } from "../types/form-schema";

const BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginAdmin = async (Credentials: LoginForm) => {
  try {
    const response = await apiClient.post("/auth/login", Credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
