import { Routes, Route } from "react-router-dom";
import { OrganizationConfig } from "../interfaces/organization";
import EmployeeLogin from "../pages/user/login/login";
import EmployeeDashboard from "../pages/user/dashboard/dashboard";
import Companies from "../components/user/dashboard/companies/companies";
import AddCompany from "../components/user/dashboard/add-company/add-company";
import UpdateCompany from "../components/user/dashboard/update-company/update-company";

const EmployeeNavbarRoutes = ({
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
        path="/employee/dashboard"
        element={<EmployeeDashboard organizationConfig={organizationConfig} />}
      >
        <Route
          path=""
          element={<Companies organizationConfig={organizationConfig} />}
        />
        <Route path="profile" element={<h1>Welcome to your profile</h1>} />
        <Route
          path="addcompany"
          element={<AddCompany organizationConfig={organizationConfig} />}
        />
        <Route
          path="update/:companyId"
          element={<UpdateCompany organizationConfig={organizationConfig} />}
        />
      </Route>
    </Routes>
  );
};

export default EmployeeNavbarRoutes;
