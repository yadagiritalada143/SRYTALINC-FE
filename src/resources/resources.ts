import { OrganizationConfig } from "../interfaces/organization";

const defaultConfig: OrganizationConfig = {
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
        "#adb5bd", // Muted gray for contrast
        "#949aa0", // Slightly darker muted gray
        "#7b8287", // Darker muted gray
        "#62696f", // Even darker muted gray
        "#4a5157", // Very dark muted gray
        "#32383e", // Almost black muted gray
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
};

const organizationConfigs: Record<string, OrganizationConfig> = {
  data: {
    organization: "data",
    logo: "/data-store.png",
    theme: {
      colors: {
        primary: [
          "#4a4e69", // Soft, muted purple
          "#3c415c", // Darker shade for contrast
          "#333748", // Deep, almost black purple
          "#2e2f44", // Similar deep tone with subtle difference
          "#232137", // Dark, rich purple
          "#1d1a2b", // Dark, muted background color
          "#17151e", // Even darker shade
          "#111013", // Near black
          "#0b0b0d", // Almost complete black
          "#050506", // Black
        ],
        secondary: [
          "#ffb3c1", // Soft pink for contrast
          "#ff99aa", // Slightly deeper pink
          "#ff8099", // Moderate pink
          "#ff6688", // Bright, vivid pink
          "#ff4d77", // Strong, bold pink
          "#cc3e61", // Darker, more subtle pink
          "#99304a", // Muted, dark pink
          "#662333", // Even darker, almost maroon
          "#33111a", // Very dark, almost black maroon
          "#1a090d", // Near black maroon
        ],
      },
      primaryColor: "primary",
      colorScheme: "dark",
      fontFamily: "Roboto, sans-serif",
      button: {
        color: "#4a4e69", // Dark muted purple
        textColor: "#ffffff", // White for contrast
      },
      color: "#ffffff", // White text on dark background
      backgroundColor: "#787878", // Dark background with a slight tint
      borderColor: "#4a4e69", // Darker border to match theme
      linkColor: "#ff4d77", // Bright pink for links
      headerBackgroundColor: "#1d1a2b", // Dark header background
    },
  },

  srytalinc: {
    organization: "srytalinc",
    logo: "/srytalinc.png",
    theme: {
      colors: {
        primary: [
          "#a3c3f6", // Light blue
          "#94b9f5", // Slightly deeper light blue
          "#85aff3", // Moderate blue
          "#75a5f2", // Slightly darker blue
          "#669bf0", // Darker blue
          "#5c8cd8", // Even darker blue
          "#527cc0", // Deep blue
          "#476da8", // Very deep blue
          "#334e78", // Dark blue, near black
          "#293e60", // Very dark blue, near black
        ],
        secondary: [
          "#f0d8ff", // Light purple
          "#ebcdff", // Slightly darker light purple
          "#e9c7ff", // Moderate purple
          "#d2b3e6", // Slightly darker moderate purple
          "#ba9fcc", // Darker purple
          "#a38bb3", // Even darker purple
          "#756480", // Deep purple
          "#5d5066", // Very deep purple
          "#463c4d", // Dark purple, near black
          "#2b1a3d", // Very dark purple, near black
        ],
      },
      primaryColor: "primary",
      colorScheme: "light",
      fontFamily: "Greycliff CF, sans-serif",
      button: {
        color: "#2f2833", // Dark gray
        textColor: "#000000", // Black
      },
      color: "#171419", // Dark text
      backgroundColor: "#f6e9ff", // Light background with a slight purple tint
      borderColor: "#ced4da", // Light gray for borders
      linkColor: "#8e2de2", // Vivid purple for links
      headerBackgroundColor: "#f1f3f5", // Light header background
    },
  },
  techcorp: {
    organization: "techcorp",
    logo: "/data-store.png",
    theme: {
      colors: {
        primary: [
          "#343a40", // Dark gray
          "#23272b", // Even darker gray
          "#1d2124", // Almost black gray
          "#0c0d0e", // Near black
          "#7f8c8d", // Gray with a slight blue tint
          "#6c757d", // Slightly darker gray
          "#5a6268", // Even darker gray
          "#4e555b", // Very dark gray
          "#434d52", // Near black gray
          "#373e41", // Almost black
        ],
        secondary: [
          "#adb5bd", // Muted gray
          "#6c757d", // Darker muted gray
          "#495057", // Dark gray
          "#343a40", // Even darker gray
          "#212529", // Near black
          "#0b0c0d", // Almost black
          "#6c757d", // Dark gray
          "#343a40", // Darker gray
          "#212529", // Very dark gray
          "#000000", // Black
        ],
      },
      primaryColor: "primary",
      colorScheme: "light",
      fontFamily: "Roboto, sans-serif",
      button: {
        color: "#343a40", // Dark gray
        textColor: "#ffffff", // White for contrast
      },
      color: "#ffffff", // Dark text
      backgroundColor: "#e9ecef", // Light background with a slight gray tint
      borderColor: "#dee2e6", // Light gray for borders
      linkColor: "#343a40", // Dark gray for links
      headerBackgroundColor: "#f8f9fa", // Light header background
    },
  },
  innovate: {
    organization: "innovate",
    logo: "/data-store.png",
    theme: {
      colors: {
        primary: [
          "#17a2b8", // Teal
          "#138496", // Slightly darker teal
          "#117a8b", // Even darker teal
          "#10707d", // Darker teal
          "#0d5b6c", // Deep teal
          "#094b54", // Very deep teal
          "#073c40", // Near black teal
          "#062d2d", // Almost black teal
          "#041f1f", // Near black
          "#030e0e", // Very dark
        ],
        secondary: [
          "#20c997", // Green
          "#1e9f80", // Slightly darker green
          "#1b8d69", // Even darker green
          "#177c56", // Deep green
          "#146d48", // Darker green
          "#115b39", // Very dark green
          "#0e4c29", // Near black green
          "#0b3d1a", // Almost black green
          "#07301c", // Near black
          "#042017", // Very dark
        ],
      },
      primaryColor: "primary",
      colorScheme: "light",
      fontFamily: "Arial, sans-serif",
      button: {
        color: "#17a2b8", // Teal
        textColor: "#ffffff", // White for contrast
      },
      color: "#ffffff", // Dark text
      backgroundColor: "#ffffff", // White background
      borderColor: "#ced4da", // Light gray for borders
      linkColor: "#17a2b8", // Teal for links
      headerBackgroundColor: "#e9ecef", // Light header background
    },
  },
};
export const getOrganizationConfig = (
  organization: string
): OrganizationConfig => {
  return {
    ...defaultConfig,
    ...organizationConfigs[organization],
    theme: {
      ...defaultConfig.theme,
      ...organizationConfigs[organization]?.theme,
      colors: {
        ...defaultConfig.theme.colors,
        ...organizationConfigs[organization]?.theme?.colors,
      },
    },
  };
};
