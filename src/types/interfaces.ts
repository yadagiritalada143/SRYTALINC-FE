export interface OrganizationConfig {
  organization?: string;
  logo: string;
  theme: {
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
    backgroundColor: string;
    borderColor: string;
    linkColor: string;
    headerBackgroundColor: string;
  };
}
