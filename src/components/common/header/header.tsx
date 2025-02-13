import { Avatar, Menu, rem } from "@mantine/core";
import {
  IconLogout,
  IconSettings,
  IconUser,
  IconPasswordUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import {
  organizationAdminUrls,
  organizationEmployeeUrls,
} from "../../../utils/common/constants";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../atoms/user";
import { useDisclosure } from "@mantine/hooks";
import ChangePasswordPopup from "../../../pages/user/changePassword/changePassword";
const Header = ({
  color,
  organization,
}: {
  color: string;
  organization: string;
}) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userDetailsAtom);
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") {
      navigate(`${organizationAdminUrls(organization)}/login`);
    } else {
      navigate(`${organizationEmployeeUrls(organization)}/login`);
    }
    localStorage.clear();
  };
  return (
    <>
    <div style={{ color }} className="flex justify-between space-x-8 mx-4">
      <div>
        <h1 className="text-2xl uppercase underline">{organization}</h1>
      </div>
      <div className="flex ">
        <p className=" flex justify-center items-center px-4 font-bold">
          {user.firstName} {user.lastName}{" "}
        </p>
        <div>
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <Avatar className="cursor-pointer" color={color} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                leftSection={
                  <IconUser style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Profile
              </Menu.Item>

              <Menu.Item
                className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                leftSection={
                  <IconPasswordUser
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
                onClick={open}>
                Change Password
              </Menu.Item>

              <Menu.Item
                className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Settings
              </Menu.Item>
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item
                onClick={handleLogout}
                className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
    <ChangePasswordPopup opened={opened} close={close} />
    </>
  );
};

export default Header;
