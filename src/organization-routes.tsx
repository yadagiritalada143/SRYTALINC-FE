import { OrganizationConfig } from "./interfaces/organization";

import AdminNavbarRoutes from "./routes/admin";
import React from "react";
import EmployeeNavbarRoutes from "./routes/user";

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
