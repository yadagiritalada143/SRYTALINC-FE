import { toast } from "react-toastify";
import { IconCircleDashedCheck, IconX } from "@tabler/icons-react";
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
        background: theme.colors.primary[2],
      },
      icon,
      closeButton: (
        <IconX
          style={{ cursor: "pointer" }}
          width={20}
          height={20}
          onClick={() => toast.dismiss()}
        />
      ),
    });
  };

  return { showSuccessToast };
};
