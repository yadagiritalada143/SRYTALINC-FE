import { Routes, Route } from "react-router-dom";
import AddEmployee from "../components/admin/dashboard/add-employee/add-employee";
import { OrganizationConfig } from "../interfaces/organization";
import AdminDashboard from "../pages/admin/dashboard/dashboard";
import AdminLogin from "../pages/admin/login/login";

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
        path="/admin/dashboard"
        element={<AdminDashboard organizationConfig={organizationConfig} />}
      >
        <Route
          path=""
          element={<AddEmployee organizationConfig={organizationConfig} />}
        />
        <Route path="employees" element={<h1>Update Employee</h1>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
