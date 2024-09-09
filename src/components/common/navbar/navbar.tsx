import { Icon, IconBuildings } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { OrganizationConfig } from "../../../interfaces/organization";
import { memo } from "react";
import { useMantineTheme } from "@mantine/core";

const Navbar = ({
  organizationConfig,
  navLinks,
}: {
  navLinks: { url: string; icon: Icon; name: string }[];
  organizationConfig: OrganizationConfig;
}) => {
  const theme = useMantineTheme();
  return (
    <nav
      className="h-full flex flex-col shadow-lg"
      style={{
        backgroundColor: theme.colors.primary[1],
        color: organizationConfig.theme.button.textColor,
      }}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col mt-6 space-y-4 px-4">
        {localStorage.getItem("userRole") === "recruiter" && (
          <NavLink
            to={`/${organizationConfig.organization}/employee/dashboard`}
            end
            className={({ isActive }) =>
              `flex items-center  p-4 rounded-lg ${
                isActive ? "font-bold" : ""
              } hover:bg-opacity-75 transition-all`
            }
            style={({ isActive }) => ({
              boxShadow: `2px 2px 2px ${organizationConfig.theme.borderColor}`,
              backgroundColor: isActive
                ? organizationConfig.theme.backgroundColor
                : "transparent",
              color: isActive
                ? theme.colors.primary[5]
                : organizationConfig.theme.color,
            })}
          >
            <IconBuildings size={24} className="mr-2" />
            <span>Manage Companies</span>
          </NavLink>
        )}
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.url}
              to={`/${organizationConfig.organization}/${link.url}`}
              end
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
              style={({ isActive }) => ({
                boxShadow: `1px 1px 2px ${organizationConfig.theme.color}`,
                backgroundColor: isActive
                  ? organizationConfig.theme.backgroundColor
                  : "transparent",
                color: isActive
                  ? theme.colors.primary[5]
                  : organizationConfig.theme.button.textColor,
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
