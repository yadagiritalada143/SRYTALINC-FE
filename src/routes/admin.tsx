import { Routes, Route } from "react-router-dom";
import AddEmployee from "../components/admin/dashboard/add-employee/add-employee";
import { OrganizationConfig } from "../interfaces/organization";
import AdminDashboard from "../pages/admin/dashboard/dashboard";
import AdminLogin from "../pages/admin/login/login";
import Employees from "../components/admin/dashboard/employees/employees";
import UpdateEmployee from "../components/admin/dashboard/update-employee/update-employee";

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
        <Route
          path="employees"
          element={<Employees organizationConfig={organizationConfig} />}
        />
        <Route
          path="update/:employeeId"
          element={<UpdateEmployee organizationConfig={organizationConfig} />}
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
