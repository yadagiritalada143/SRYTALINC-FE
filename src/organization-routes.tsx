import { OrganizationConfig } from "./interfaces/organization";

import AdminNavbarRoutes from "./routes/admin-navbar";
import React from "react";
import EmployeeNavbarRoutes from "./routes/user-navbar";

const OrganizationRoutes: React.FC<{
  organizationConfig: OrganizationConfig;
}> = ({ organizationConfig }) => {
  return (
    <React.Fragment>
      <AdminNavbarRoutes organizationConfig={organizationConfig} />
      <EmployeeNavbarRoutes organizationConfig={organizationConfig} />
    </React.Fragment>
  );
};

export default OrganizationRoutes;
