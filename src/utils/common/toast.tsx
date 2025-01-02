import { toast } from "react-toastify";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../atoms/organization-atom";
import { useMantineTheme } from "@mantine/core";

export const useCustomToast = () => {
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const showSuccessToast = (
    message: string,
    icon = <IconCircleDashedCheck width={32} height={32} />
  ) => {
    toast(message, {
      style: {
        color: theme.colors.primary[2],
        backgroundColor:
          organizationConfig.organization_theme.theme.backgroundColor,
      },
      progressStyle: {
        background: theme.colors.primary[8],
      },
      icon,
    });
  };

  return { showSuccessToast };
};
