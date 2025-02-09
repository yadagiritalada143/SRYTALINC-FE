import {
  Icon,
  IconUsersGroup,
  // IconBackpack, IconBuildings,
  IconX,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { OrganizationConfig } from "../../../interfaces/organization";
import { memo } from "react";
import { useMantineTheme } from "@mantine/core";
import { userDetailsAtom } from "../../../atoms/user";
import { useRecoilValue } from "recoil";
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
  const user = useRecoilValue(userDetailsAtom);
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
        {user.userRole === "recruiter" ||
          (user.userRole === "admin" && (
            <>
              {/* <NavLink
              to={`/${organizationConfig.organization_name}/employee/dashboard`}
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
            </NavLink> */}
              {/* <NavLink
              to={`/${organizationConfig.organization_name}/employee/dashboard/poolEmployees`}
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
            </NavLink> */}
              <NavLink
                to={
                  user.userRole === "admin"
                    ? `/${organizationConfig.organization_name}/admin/dashboard/pool_candidates`
                    : user.userRole === "recruiter"
                    ? `/${organizationConfig.organization_name}/recuiter/dashboard`
                    : ""
                }
                end
                className={({ isActive }) =>
                  `flex items-center  p-4 py-6 hover:shadow-xl ${
                    isActive ? "font-bold" : ""
                  } hover:bg-opacity-75 transition-all`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? organizationConfig.organization_theme.theme
                        .backgroundColor
                    : "transparent",
                  color: isActive
                    ? theme.colors.primary[5]
                    : organizationConfig.organization_theme.theme.button
                        .textColor,
                })}
              >
                <IconUsersGroup size={24} className="mr-2" />
                <span>Pool Candidates</span>
              </NavLink>
            </>
          ))}
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.url}
              to={`/${organizationConfig.organization_name}/${link.role}/${link.url}`}
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
