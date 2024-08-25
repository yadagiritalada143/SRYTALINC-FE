import axios from "axios";
import { AddEmployeeForm, LoginForm } from "../types/form-schema";

const BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginAdmin = async (Credentials: LoginForm) => {
  try {
    const response = await apiClient.post("/admin/login", Credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerEmployee = async (employeeDetails: AddEmployeeForm) => {
  try {
    const response = await apiClient.post("/admin/register", employeeDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};
