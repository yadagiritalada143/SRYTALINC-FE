import axios from "axios";
import { LoginForm } from "../forms/login";
import { AddEmployeeForm } from "../forms/add-employee";

const BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const login = async (Credentials: LoginForm) => {
  try {
    const response = await apiClient.post("/admin/login", Credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
