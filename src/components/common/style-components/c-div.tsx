import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../atoms/organization-atom";

export const ColorDiv = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  return (
    <div
      className={`custom-style-div ${className}`}
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
      }}
    >
      {children}
    </div>
  );
};
