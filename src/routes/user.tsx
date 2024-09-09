import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { OrganizationConfig } from "../interfaces/organization";
import EmployeeLogin from "../pages/user/login/login";
import EmployeeDashboard from "../pages/user/dashboard/dashboard";
import Companies from "../components/user/dashboard/companies/companies";
import AddCompany from "../components/user/dashboard/add-company/add-company";
import UpdateCompany from "../components/user/dashboard/update-company/update-company";
import { toast } from "react-toastify";
import { useEffect } from "react";

const EmployeeRoutes = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  return (
    <Routes>
      <Route
        path="/employee/login"
        element={<EmployeeLogin organizationConfig={organizationConfig} />}
      />
      <Route
        element={
          <EmployeeProtectedRoutes organizationConfig={organizationConfig} />
        }
      >
        <Route
          path="/employee/dashboard"
          element={
            <EmployeeDashboard organizationConfig={organizationConfig} />
          }
        >
          <Route
            element={
              <RecruiterProtectedRoutes
                organizationConfig={organizationConfig}
              />
            }
          >
            <Route
              path=""
              element={<Companies organizationConfig={organizationConfig} />}
            />
            <Route
              path="addcompany"
              element={<AddCompany organizationConfig={organizationConfig} />}
            />
            <Route
              path="update/:companyId"
              element={
                <UpdateCompany organizationConfig={organizationConfig} />
              }
            />
          </Route>
          <Route path="profile" element={<h1>Welcome to your profile</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

const RecruiterProtectedRoutes = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const token = localStorage.getItem("employeeToken");
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token || userRole !== "recruiter") {
      toast.error("Not authorized to access");
      setTimeout(() => {
        navigate(`/${organizationConfig.organization}/employee/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization]);

  if (!userRole || !token || userRole !== "recruiter") {
    return null;
  }

  return <Outlet />;
};

const EmployeeProtectedRoutes = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const token = localStorage.getItem("employeeToken");
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token) {
      setTimeout(() => {
        toast.error("Not authorized to access");
        navigate(`/${organizationConfig.organization}/employee/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization]);

  if (!userRole || !token) {
    return null;
  }

  return <Outlet />;
};

export default EmployeeRoutes;
