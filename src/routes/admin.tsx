import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import AddEmployee from "../components/admin/dashboard/add-employee/add-employee";
import { OrganizationConfig } from "../interfaces/organization";
import AdminDashboard from "../pages/admin/dashboard/dashboard";
import AdminLogin from "../pages/admin/login/login";
import Employees from "../components/admin/dashboard/employees/employees";
import UpdateEmployee from "../components/admin/dashboard/update-employee/update-employee";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { getOrganizationConfig } from "../services/common-services";
import { LoadingOverlay } from "@mantine/core";
import Loader from "../components/common/loader/loader";

const AdminRoutes = () => {
  const { organization } = useParams<{ organization: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [organizationConfig, setOrganizationConfig] =
    useState<OrganizationConfig>({
      organization_name: "default",
      organization_theme: {
        logo: "/data-store.png",
        organization: "default",
        theme: {
          primaryColor: "primary",
          colorScheme: "dark",
          fontFamily: "Arial, sans-serif",
          button: {
            color: "#343a40", // Dark gray
            textColor: "#ffffff", // White for contrast
          },
          colors: {
            primary: [
              "#343a40", // Dark gray
              "#2c3136", // Slightly darker gray
              "#23272b", // Darker gray
              "#1d2124", // Even darker gray
              "#16191c", // Almost black gray
              "#0f1214", // Near black
              "#080a0b", // Very dark
              "#030405", // Almost completely black
              "#000000", // Black
              "#000000", // Black
            ],
            secondary: [
              "#adb5bd", // Muted gray
              "#949aa0", // Slightly darker gray
              "#7b8287", // Darker gray
              "#62696f", // Even darker gray
              "#4a5157", // Very dark gray
              "#32383e", // Almost black
              "#1a1f24", // Near black
              "#080a0b", // Very dark
              "#000000", // Black
              "#000000", // Black
            ],
          },
          color: "#ffffff", // White text
          backgroundColor: "#1b1e21", // Dark background
          borderColor: "#4a4e69", // Muted purple for borders
          linkColor: "#ff4d77", // Bright pink for links
          headerBackgroundColor: "#23272b", // Dark header background
        },
      },
    });

  useEffect(() => {
    if (organization) {
      setIsLoading(true);
      getOrganizationConfig(organization).then(
        (response: OrganizationConfig) => {
          setOrganizationConfig(response);
          setIsLoading(false);
        }
      );
    }
  }, []);

  const theme = {
    colorScheme: organizationConfig.organization_theme.theme.colorScheme,
    primaryColor: organizationConfig.organization_theme.theme.primaryColor,
    fontFamily: organizationConfig.organization_theme.theme.fontFamily,
    colors: {
      primary: organizationConfig.organization_theme.theme.colors
        .primary as any,
      secondary: organizationConfig.organization_theme.theme.colors
        .secondary as any,
    },
    headings: {
      fontFamily: organizationConfig.organization_theme.theme.fontFamily,
    },
    components: {
      Avatar: {
        styles: () => ({
          root: {
            color: organizationConfig.organization_theme.theme.color,
          },
        }),
      },
      Menu: {
        styles: () => ({
          dropdown: {
            backgroundColor:
              organizationConfig.organization_theme.theme.colors.primary[5],
          },
          label: {
            color: organizationConfig.organization_theme.theme.button.textColor,
          },
          item: {
            color: organizationConfig.organization_theme.theme.button.textColor,
          },
        }),
      },
      Loader: {
        styles: () => ({
          root: {
            color: organizationConfig.organization_theme.theme.button.textColor,
          },
        }),
      },
      Button: {
        styles: () => ({
          root: {
            backgroundColor:
              organizationConfig.organization_theme.theme.button.color,
            color: organizationConfig.organization_theme.theme.button.textColor,
            borderColor:
              organizationConfig.organization_theme.theme.borderColor,
          },
        }),
      },
    },
  };

  return (
    <MantineProvider theme={theme}>
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ children: <Loader /> }}
      />
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
        navigate(`/admin//${organizationConfig.organization_name}/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization_name]);

  if (!userRole || !token || userRole !== "admin") {
    return null;
  }

  return <Outlet />;
};

export default AdminRoutes;
