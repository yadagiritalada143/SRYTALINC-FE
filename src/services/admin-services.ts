import axios from "axios";
import { AddEmployeeForm } from "../forms/add-employee";

const BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const registerEmployee = async (employeeDetails: AddEmployeeForm) => {
  try {
    const response = await apiClient.post("/admin/register", employeeDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};
