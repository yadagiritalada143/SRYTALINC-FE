import axios from "axios";
import { AddEmployeeForm } from "../forms/add-employee";
import { EmployeeUpdateForm } from "../forms/update-employee";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const registerEmployee = async (employeeDetails: AddEmployeeForm) => {
  const adminToken = localStorage.getItem("adminToken");

  try {
    if (!adminToken) {
      throw "Not authorized to access";
    }
    const response = await apiClient.post(
      "/admin/registerEmployeeByAdmin",
      employeeDetails,
      { headers: { auth_token: adminToken } }
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

export const deleteEmployeeByAdmin = async (data: {
  id: string;
  confirmDelete: boolean;
}) => {
  const adminToken = localStorage.getItem("adminToken");
  console.log(data);
  try {
    const response = await apiClient.post(
      "/admin/deleteEmployeeByAdmin",
      data,
      {
        headers: { auth_token: adminToken },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployeeDetailsByAdmin = async (id: string) => {
  try {
    const response = await apiClient.get(
      `/admin/getEmployeeDetailsByAdmin/${id}`
    );
    return response.data.userDetails;
  } catch (error) {
    throw error;
  }
};

export const getAllEmployeeDetailsByAdmin = async () => {
  const adminToken = localStorage.getItem("adminToken");
  try {
    if (!adminToken) {
      throw "Not authorized to access";
    }
    const response = await apiClient("/admin/getAllEmployeeDetailsByAdmin", {
      headers: { auth_token: adminToken },
    });
    return response.data.usersList;
  } catch (error) {
    throw error;
  }
};

export const getAllBloodGroupByAdmin = async () => {
  const adminToken = localStorage.getItem("adminToken");
  try {
    if (!adminToken) {
      throw "Not authorized to access";
    }
    const response = await apiClient("/admin/getAllBloodGroupsByAdmin", {
      headers: { auth_token: adminToken },
    });
    return response.data.bloodGroupList;
  } catch (error) {
    throw error;
  }
};

export const addBloodGroupByAdmin = async (data: { type: string }) => {
  const adminToken = localStorage.getItem("adminToken");
  try {
    const response = await apiClient.post("/admin/addBloodGroupByAdmin", data, {
      headers: { auth_token: adminToken },
    });

    return response.data.bloodGroupList;
  } catch (error) {
    throw error;
  }
};

export const updateBloodGroupByAdmin = () => {};

export const deleteBloodGroupByAdmin = async (id: string) => {
  const adminToken = localStorage.getItem("adminToken");
  try {
    const response = await apiClient.delete(
      `/admin/deleteBloodGroupByAdmin/${id}`,
      {
        headers: { auth_token: adminToken },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
