import axios from "axios";
import { AddEmployeeForm } from "../forms/add-employee";
import { EmployeeUpdateForm } from "../forms/update-employee";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const registerEmployee = async (employeeDetails: AddEmployeeForm) => {
  try {
    const response = await apiClient.post(
      "/admin/registerEmployeeByAdmin",
      employeeDetails
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployeeDetailsByAdmin = async (
  employeeDetails: EmployeeUpdateForm
) => {
  try {
    const response = await apiClient.put(
      "/admin/updateEmployeeDetailsByAdmin",
      employeeDetails
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployeeDetailsByAdmin = async (email: string) => {
  try {
    const response = await apiClient.get(
      `/admin/getEmployeeDetailsByAdmin/${email}`
    );
    return response.data.userDetails;
  } catch (error) {
    throw error;
  }
};
