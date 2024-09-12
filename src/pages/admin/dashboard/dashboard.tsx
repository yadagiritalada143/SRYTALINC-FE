import { useRef, useState } from "react";
import { OrganizationConfig } from "../../../interfaces/organization";
import { Outlet } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import AdminNavbar from "../../../components/common/navbar/navbar";
import { adminNavLinks } from "../../../utils/admin/nav-links/admin-nav-links";
import { useMantineTheme } from "@mantine/core";
import Header from "../../../components/common/header/header";

const AdminDashboard = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const theme = useMantineTheme();
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <div
      className="flex min-h-screen relative"
      style={{
        color: organizationConfig.theme.color,
      }}
    >
      <div className="lg:hidden fixed top-4  z-50">
        <button onClick={toggleDrawer} className="p-2 rounded-md">
          {!isDrawerOpen && (
            <IconMenu2
              size={24}
              color={organizationConfig.theme.button.textColor}
            />
          )}
        </button>
      </div>

      <div
        ref={drawerRef}
        className={`fixed inset-y-0 left-0 w-64 min-w-64 shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminNavbar
          navLinks={adminNavLinks}
          organizationConfig={organizationConfig}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        style={{
          color: theme.colors.primary[8],
          backgroundImage: `linear-gradient(to right, ${theme.colors.primary[0]}, ${theme.colors.primary[9]})`,
          fontFamily: theme.fontFamily,
        }}
        className="flex-grow p-6 transition-all duration-300 z-20 overflow-hidden"
      >
        <div className="my-2">
          <Header
            color={organizationConfig.theme.button.textColor}
            organization={organizationConfig.organization}
          />
        </div>
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
