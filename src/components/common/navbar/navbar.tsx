import { Icon, IconBackpack, IconBuildings, IconX } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { OrganizationConfig } from "../../../interfaces/organization";
import { memo } from "react";
import { useMantineTheme } from "@mantine/core";

const Navbar = ({
  organizationConfig,
  navLinks,
  isDrawerOpen,
  toggleDrawer,
}: {
  navLinks: {
    role: string;
    url: string;
    icon: Icon;
    name: string;
  }[];
  organizationConfig: OrganizationConfig;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}) => {
  const theme = useMantineTheme();
  return (
    <nav
      className="h-full flex flex-col shadow-lg"
      style={{
        backgroundColor: theme.colors.primary[1],
        color: organizationConfig.organization_theme.theme.button.textColor,
      }}
    >
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="lg:hidden  z-50">
          <button onClick={toggleDrawer} className="p-2 rounded-md">
            {isDrawerOpen && (
              <IconX
                size={24}
                color={
                  organizationConfig.organization_theme.theme.button.textColor
                }
              />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6  px-2">
        {localStorage.getItem("userRole") === "recruiter" && (
          <>
            <NavLink
              to={`/employee/${organizationConfig.organization_name}/dashboard`}
              end
              className={({ isActive }) =>
                `flex items-center  p-4 py-6 hover:shadow-xl ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? organizationConfig.organization_theme.theme.backgroundColor
                  : "transparent",
                color: isActive
                  ? theme.colors.primary[5]
                  : organizationConfig.organization_theme.theme.button
                      .textColor,
              })}
            >
              <IconBuildings size={24} className="mr-2" />
              <span>Manage Companies</span>
            </NavLink>
            <NavLink
              to={`/employee/${organizationConfig.organization_name}/dashboard/poolEmployees`}
              end
              className={({ isActive }) =>
                `flex items-center  p-4 py-6 hover:shadow-xl ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? organizationConfig.organization_theme.theme.backgroundColor
                  : "transparent",
                color: isActive
                  ? theme.colors.primary[5]
                  : organizationConfig.organization_theme.theme.button
                      .textColor,
              })}
            >
              <IconBackpack size={24} className="mr-2" />
              <span>Pool Employees</span>
            </NavLink>
          </>
        )}
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.url}
              to={`/${link.role}/${organizationConfig.organization_name}/${link.url}`}
              end
              className={({ isActive }) =>
                `flex items-center p-4 py-6 shadow-md hover:shadow-xl ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? organizationConfig.organization_theme.theme.backgroundColor
                  : "transparent",
                color: isActive
                  ? theme.colors.primary[5]
                  : organizationConfig.organization_theme.theme.button
                      .textColor,
              })}
            >
              <Icon size={24} className="mr-2" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default memo(Navbar);
