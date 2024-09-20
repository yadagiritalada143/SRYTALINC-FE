import { Routes, Route, useNavigate } from "react-router-dom";
import AddEmployee from "../components/admin/dashboard/add-employee/add-employee";
import { OrganizationConfig } from "../interfaces/organization";
import AdminDashboard from "../pages/admin/dashboard/dashboard";
import AdminLogin from "../pages/admin/login/login";
import Employees from "../components/admin/dashboard/employees/employees";
import UpdateEmployee from "../components/admin/dashboard/update-employee/update-employee";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AdminRoutes = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  return (
    <Routes>
      <Route
        path="/admin/login"
        element={<AdminLogin organizationConfig={organizationConfig} />}
      />
      <Route
        element={
          <AdminProtectedRoutes organizationConfig={organizationConfig} />
        }
      >
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard organizationConfig={organizationConfig} />}
        >
          <Route
            path="addemployee"
            element={<AddEmployee organizationConfig={organizationConfig} />}
          />
          <Route
            path=""
            element={<Employees organizationConfig={organizationConfig} />}
          />
          <Route
            path="update/:employeeId"
            element={<UpdateEmployee organizationConfig={organizationConfig} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

const AdminProtectedRoutes = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const token = localStorage.getItem("adminToken");
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token || userRole !== "admin") {
      setTimeout(() => {
        toast.error("Not authorized to access");
        navigate(`/${organizationConfig.organization}/admin/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization]);

  if (!userRole || !token || userRole !== "admin") {
    return null;
  }

  return <Outlet />;
};

export default AdminRoutes;
