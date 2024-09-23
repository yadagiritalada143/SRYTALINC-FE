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
import { useEffect } from "react";
import { getOrganizationConfig } from "../resources/resources";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const EmployeeRoutes = () => {
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
        navigate(`/employee/${organizationConfig.organization}/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization]);

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
        navigate(`/employee/${organizationConfig.organization}/login`);
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization]);

  if (!userRole || !token) {
    return null;
  }

  return <Outlet />;
};

export default EmployeeRoutes;
