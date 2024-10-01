import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import { OrganizationConfig } from "../interfaces/organization";
import EmployeeLogin from "../pages/user/login/login";
import EmployeeDashboard from "../pages/user/dashboard/dashboard";
import Companies from "../components/user/dashboard/companies/companies";
import AddCompany from "../components/user/dashboard/add-company/add-company";
import UpdateCompany from "../components/user/dashboard/update-company/update-company";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getOrganizationConfig } from "../services/common-services";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { LoadingOverlay } from "@mantine/core";
import Loader from "../components/common/loader/loader";

const EmployeeRoutes = () => {
  const { organization } = useParams<{ organization: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [organizationConfig, setOrganizationConfig] =
    useState<OrganizationConfig>({
      organization_name: "",
      organization_theme: {
        logo: "/data-store.png",
        organization: "",
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
        bg="cyan"
        loaderProps={{ children: <Loader /> }}
      />
      <Routes>
        <Route
          path="/login"
          element={<EmployeeLogin organizationConfig={organizationConfig} />}
        />
        <Route
          element={
            <EmployeeProtectedRoutes organizationConfig={organizationConfig} />
          }
        >
          <Route
            path="/dashboard"
            element={
              <EmployeeDashboard organizationConfig={organizationConfig} />
            }
          >
            <Route
              element={
                <RecruiterProtectedRoutes
                  organizationConfig={organizationConfig}
                />
              }
            >
              <Route
                path=""
                element={<Companies organizationConfig={organizationConfig} />}
              />
              <Route
                path="addcompany"
                element={<AddCompany organizationConfig={organizationConfig} />}
              />
              <Route
                path="update/:companyId"
                element={
                  <UpdateCompany organizationConfig={organizationConfig} />
                }
              />
            </Route>
            <Route path="profile" element={<h1>Welcome to your profile</h1>} />
          </Route>
        </Route>
      </Routes>
    </MantineProvider>
  );
};

const RecruiterProtectedRoutes = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const token = localStorage.getItem("employeeToken");
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token || userRole !== "recruiter") {
      toast.error("Not authorized to access");
      setTimeout(() => {
        navigate(`/employee/${organizationConfig.organization_name}/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization_name]);

  if (!userRole || !token || userRole !== "recruiter") {
    return null;
  }

  return <Outlet />;
};

const EmployeeProtectedRoutes = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const token = localStorage.getItem("employeeToken");
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token) {
      setTimeout(() => {
        toast.error("Not authorized to access");
        navigate(`/employee/${organizationConfig.organization_name}/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization_name]);

  if (!userRole || !token) {
    return null;
  }

  return <Outlet />;
};

export default EmployeeRoutes;
