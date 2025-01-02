import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import RegisterAdminBySuperAdmin from "../components/super-admin/regsiter-admin/register-admin";
import SuperadminDashboard from "../pages/super-admin/dashboard/dashboard";
import EmployeesForSuperadmin from "../components/super-admin/employees/employee";
import DocumentsMenuForSuperadmin from "../components/super-admin/documents/documents";

const SuperAdminRoutes = () => {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/dashboard" element={<SuperadminDashboard />}>
          <Route
            path="register-admin"
            element={<RegisterAdminBySuperAdmin />}
          />
          <Route path="employees" element={<EmployeesForSuperadmin />} />
          <Route path="documents" element={<DocumentsMenuForSuperadmin />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
};

export default SuperAdminRoutes;
