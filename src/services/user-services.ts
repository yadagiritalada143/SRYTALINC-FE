import axios from "axios";
import { AddCompanyForm } from "../forms/add-company";

const BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getCompanyDetails = async () => {
  try {
    const response = await apiClient("/recruiter/getCompanyDetails");
    return response.data.poolCompaniesResponse;
  } catch (error) {
    throw error;
  }
};

export const addCompanyByRecruiter = async (data: AddCompanyForm) => {
  try {
    const response = await apiClient.post(
      "/recruiter/addCompanyByRecruiter",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCompanyByRecruiter = async (
  data: AddCompanyForm,
  id: string
) => {
  try {
    const response = await apiClient.post(
      "/recruiter/updateCompanyByRecruiter",
      { ...data, id: id }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyDetailsByIdByRecruiter = async (id: string) => {
  try {
    const response = await apiClient(
      `/recruiter/getCompanyDetailsByIdByRecruiter/${id}`
    );
    return response.data.poolCompanyResponse;
  } catch (error) {
    throw error;
  }
};
