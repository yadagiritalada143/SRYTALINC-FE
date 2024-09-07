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

export const getVisitorCount = async () => {
  try {
    const response = await apiClient("/getVisitorCount");
    if (typeof response.data.count === "number") {
      return response.data.visitorCount;
    } else {
      return String(response.data.visitorCount);
    }
  } catch (error) {
    throw error;
  }
};
