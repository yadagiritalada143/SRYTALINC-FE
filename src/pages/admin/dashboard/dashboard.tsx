import { useRef, useState } from "react";
import { OrganizationConfig } from "../../../types/interfaces";
import { Outlet } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import AdminNavbar from "../../../components/admin/navbar/navbar";

const AdminDashboard = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <div
      className="flex min-h-screen relative"
      style={{
        backgroundColor: organizationConfig.theme.backgroundColor,
        color: organizationConfig.theme.color,
      }}
    >
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button onClick={toggleDrawer} className="p-2 rounded-md">
          {isDrawerOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      <div
        ref={drawerRef}
        className={`fixed inset-y-0 left-0 w-64 shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminNavbar organizationConfig={organizationConfig} />
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
          onClick={toggleDrawer}
        ></div>
      )}

      <div className="flex-grow p-6 transition-all duration-300 z-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
