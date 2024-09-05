import { MantineProvider } from "@mantine/core";
import OrganizationRoutes from "./organization-routes";
import { getOrganizationConfig } from "./resources/resources";
import { useParams } from "react-router-dom";
import "@mantine/core/styles.css";

const OrganizationWrapper: React.FC = () => {
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
            color: organizationConfig.theme.color,
            backgroundColor: organizationConfig.theme.colors.primary[5],
          },
          label: {
            color: organizationConfig.theme.color,
          },
          item: {
            "&:hover": {
              backgroundColor: organizationConfig.theme.colors.primary[5],
              color: organizationConfig.theme.color,
            },
            color: organizationConfig.theme.color,
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
      <OrganizationRoutes organizationConfig={organizationConfig} />
    </MantineProvider>
  );
};

export default OrganizationWrapper;
