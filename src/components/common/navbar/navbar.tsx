import { Icon, IconBuildings } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { OrganizationConfig } from "../../../interfaces/organization";
import { memo } from "react";

const Navbar = ({
  organizationConfig,
  navLinks,
}: {
  navLinks: { url: string; icon: Icon; name: string }[];
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
        {localStorage.getItem("userRole") === "recruiter" && (
          <NavLink
            to={`/${organizationConfig.organization}/employee/dashboard}`}
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
                backgroundColor: isActive
                  ? organizationConfig.theme.color
                  : "transparent",
                color: isActive
                  ? organizationConfig.theme.backgroundColor
                  : organizationConfig.theme.color,
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
