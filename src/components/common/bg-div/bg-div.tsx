import { useMantineTheme } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../atoms/organization-atom";

export const BgDiv = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  return (
    <div
      className={`custom-style-div ${className}`}
      style={{
        color: theme.colors.primary[8],

        backgroundImage: `linear-gradient(to right, ${theme.colors.primary[0]}, ${theme.colors.primary[9]})`,
        fontFamily: theme.fontFamily,
      }}
    >
      <style>
        {`
          a {
            color: ${organizationConfig.organization_theme.theme.linkColor};
            
          }
         
        `}
      </style>
      {children}
    </div>
  );
};
