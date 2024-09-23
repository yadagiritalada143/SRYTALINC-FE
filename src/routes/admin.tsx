import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import AddEmployee from "../components/admin/dashboard/add-employee/add-employee";
import { OrganizationConfig } from "../interfaces/organization";
import AdminDashboard from "../pages/admin/dashboard/dashboard";
import AdminLogin from "../pages/admin/login/login";
import Employees from "../components/admin/dashboard/employees/employees";
import UpdateEmployee from "../components/admin/dashboard/update-employee/update-employee";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import { getOrganizationConfig } from "../resources/resources";
import "@mantine/core/styles.css";

const AdminRoutes = () => {
  const { organization } = useParams<{ organization: string }>();

  const organizationConfig = getOrganizationConfig(organization || "");

  const theme = {
    colorScheme: organizationConfig.theme.colorScheme,
    primaryColor: organizationConfig.theme.primaryColor,
    fontFamily: organizationConfig.theme.fontFamily,
    colors: {
      primary: organizationConfig.theme.colors.primary as any,
      secondary: organizationConfig.theme.colors.secondary as any,
    },
    headings: {
      fontFamily: organizationConfig.theme.fontFamily,
    },
    components: {
      Avatar: {
        styles: () => ({
          root: {
            color: organizationConfig.theme.color,
          },
        }),
      },
      Menu: {
        styles: () => ({
          dropdown: {
            backgroundColor: organizationConfig.theme.colors.primary[5],
          },
          label: {
            color: organizationConfig.theme.button.textColor,
          },
          item: {
            color: organizationConfig.theme.button.textColor,
          },
        }),
      },
      Loader: {
        styles: () => ({
          root: {
            color: organizationConfig.theme.button.textColor,
          },
        }),
      },
      Button: {
        styles: () => ({
          root: {
            backgroundColor: organizationConfig.theme.button.color,
            color: organizationConfig.theme.button.textColor,
            borderColor: organizationConfig.theme.borderColor,
          },
        }),
      },
    },
  };
  return (
    <MantineProvider theme={theme}>
      <Routes>
        <Route
          path="/login"
          element={<AdminLogin organizationConfig={organizationConfig} />}
        />
        <Route
          element={
            <AdminProtectedRoutes organizationConfig={organizationConfig} />
          }
        >
          <Route
            path="/dashboard"
            element={<AdminDashboard organizationConfig={organizationConfig} />}
          >
            <Route
              path="addemployee"
              element={<AddEmployee organizationConfig={organizationConfig} />}
            />
            <Route
              path=""
              element={<Employees organizationConfig={organizationConfig} />}
            />
            <Route
              path="update/:employeeId"
              element={
                <UpdateEmployee organizationConfig={organizationConfig} />
              }
            />
          </Route>
        </Route>
      </Routes>
    </MantineProvider>
  );
};

const AdminProtectedRoutes = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const token = localStorage.getItem("adminToken");
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token || userRole !== "admin") {
      setTimeout(() => {
        toast.error("Not authorized to access");
        navigate(`/admin//${organizationConfig.organization}/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization]);

  if (!userRole || !token || userRole !== "admin") {
    return null;
  }

  return <Outlet />;
};

export default AdminRoutes;
