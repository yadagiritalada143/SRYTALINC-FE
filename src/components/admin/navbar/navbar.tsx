import { IconUserEdit, IconUsersPlus } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { OrganizationConfig } from "../../../types/interfaces";
import { memo } from "react";

const AdminNavbar = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  return (
    <nav
      className="h-full flex flex-col shadow-lg"
      style={{
        backgroundColor: organizationConfig.theme.backgroundColor,
        color: organizationConfig.theme.color,
      }}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col mt-6 space-y-4 px-4">
        <NavLink
          to={`/${organizationConfig.organization}/admin/dashboard`}
          end
          className={({ isActive }) =>
            `flex items-center p-4 rounded-lg ${
              isActive ? "font-bold" : ""
            } hover:bg-opacity-75 transition-all`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? organizationConfig.theme.color
              : "transparent",
            color: isActive
              ? organizationConfig.theme.backgroundColor
              : organizationConfig.theme.color,
          })}
        >
          <IconUsersPlus size={24} className="mr-2" />
          <span>Add Employee</span>
        </NavLink>
        <NavLink
          to={`/${organizationConfig.organization}/admin/dashboard/employees`}
          className={({ isActive }) =>
            `flex items-center p-4 rounded-lg ${
              isActive ? "font-bold" : ""
            } hover:bg-opacity-75 transition-all`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? organizationConfig.theme.color
              : "transparent",
            color: isActive
              ? organizationConfig.theme.backgroundColor
              : organizationConfig.theme.color,
          })}
        >
          <IconUserEdit size={24} className="mr-2" />
          <span>Edit Employee</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default memo(AdminNavbar);
