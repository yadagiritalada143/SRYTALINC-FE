import axios from "axios";
import { RegisterAdminBySuperAdminForm } from "../forms/register-admin-superadmin";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getOrganizations = async () => {
  try {
    const response = await apiClient.get(
      "/superadmin/getAllOrganizationsBySuperadmin"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAdmin = async (
  adminDetails: RegisterAdminBySuperAdminForm
) => {
  try {
    const response = await apiClient.post(
      "/superadmin/registerAdminBySuperAdmin",
      adminDetails
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEmployeeDetailsBySuperAdmin = async (
  organizationId: string
) => {
  try {
    const response = await apiClient.get(
      `/superadmin/getAllEmployeesBySuperAdmin/${organizationId}`
    );
    return response.data.superadminEmployeeList;
  } catch (error) {
    throw error;
  }
};
