import { Avatar, Button, Menu, rem } from "@mantine/core";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
const Header = ({
  color,
  organization,
}: {
  color: string;
  organization: string;
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") {
      navigate(`/${organization}/${userRole}/login`);
    } else {
      navigate(`/${organization}/employee/login`);
    }
    localStorage.clear();
  };
  return (
    <div style={{ color }} className="flex justify-between mx-4">
      <div>
        <h1 className="text-2xl uppercase">{organization}</h1>
      </div>
      <div className="flex">
        <p className=" flex justify-center items-center px-4">
          Hello, {localStorage.getItem("firstName")}{" "}
          {localStorage.getItem("lastName")}{" "}
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
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Settings
              </Menu.Item>
              <Menu.Item
                className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                leftSection={
                  <IconUser style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Profile
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
  );
};

export default Header;
