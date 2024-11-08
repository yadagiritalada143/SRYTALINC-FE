import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import RegisterAdminBySuperAdmin from "../components/super-admin/regsiter-admin/register-admin";
import SuperAdminDashboard from "../pages/super-admin/dashboard/dashboard";

const SuperAdminRoutes = () => {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/dashboard" element={<SuperAdminDashboard />}>
          <Route
            path="register-admin"
            element={<RegisterAdminBySuperAdmin />}
          />
        </Route>
      </Routes>
    </MantineProvider>
  );
};

export default SuperAdminRoutes;
