import { MantineProvider } from "@mantine/core";
import OrganizationRoutes from "./organization-routes";
import { getOrganizationConfig } from "./resources/resources";
import { useParams } from "react-router-dom";
import "@mantine/core/styles.css";

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

export default OrganizationWrapper;
