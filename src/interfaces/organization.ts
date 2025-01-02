export interface OrganizationConfig {
  organization_name: string;
  organization_theme: {
    logo: string;
    organization: string;
    theme: {
      backgroundColor: string;
      headerBackgroundColor: string;
      colorScheme: "light" | "dark";

      primaryColor: string;
      fontFamily: string;
      button: {
        color: string;
        textColor: string;
      };
      colors: {
        primary: string[];
        [key: string]: string[];
      };
      color: string;
      borderColor: string;
      linkColor: string;
    };
  };
}
