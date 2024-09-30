import axios from "axios";
import { LoginForm } from "../forms/login";
import { AddEmployeeForm } from "../forms/add-employee";
import { ContactForm } from "../forms/contact";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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

export const sendContactUsMail = async (data: ContactForm) => {
  try {
    const response = await apiClient.post("/sendContactUsMail", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrganizationConfig = async (organizationName: string) => {
  try {
    const response = await apiClient(
      `/getOrganizationThemes/${organizationName}`
    );
    return response.data.themesResponse;
  } catch (error) {
    throw error;
  }
};
