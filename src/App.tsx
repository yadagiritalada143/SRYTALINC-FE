import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import AdminLogin from "./pages/admin/login/login";
import { getOrganizationConfig } from "./resources/resources";
import { OrganizationConfig } from "./types/interfaces";
import "@mantine/core/styles.css";

const OrganizationRoutes: React.FC<{
  organizationConfig: OrganizationConfig;
}> = ({ organizationConfig }) => {
  return (
    <Routes>
      <Route
        path="/admin/login"
        element={<AdminLogin organizationConfig={organizationConfig} />}
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Landing</h1>} />
        <Route path="/:organization/*" element={<OrganizationWrapper />} />
      </Routes>
    </Router>
  );
};

const OrganizationWrapper: React.FC = () => {
  const { organization } = useParams<{ organization: string }>();
  //should be fetched this details from backend
  const organizationConfig = getOrganizationConfig(organization || "");

  const theme = {
    colorScheme: organizationConfig.theme.colorScheme,
    primaryColor: organizationConfig.theme.primaryColor as any,
    fontFamily: organizationConfig.theme.fontFamily,
    colors: {
      primary: organizationConfig.theme.colors.primary as any,
      secondary: organizationConfig.theme.colors.secondary as any,
    },
    components: {
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
      <OrganizationRoutes organizationConfig={organizationConfig} />
    </MantineProvider>
  );
};

export default App;
