import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HoverCard } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandMeta,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

const CardDropdownStyles = {
  overflow: "hidden",
  backgroundColor: "black",
  border: "none",
  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
};

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className="relative text-white py-4 ">
      <div className="container mx-auto flex flex-col lg:flex-row px-4 items-center justify-between">
        <div className="flex justify-between w-full lg:w-auto lg:justify-start items-center">
          <h1
            className="text-purple-500 text-3xl lg:text-4xl font-bold"
            style={{ textShadow: "2px 2px 2px white" }}
          >
            SRYTAL
          </h1>
          <div className="lg:hidden ml-auto">
            <Burger color="white" opened={opened} onClick={toggle} />
          </div>
        </div>
        <div
          className={`${
            opened ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } lg:max-h-none lg:opacity-100 overflow-hidden transition-all duration-500 ease-in-out lg:flex justify-center items-center text-center w-full mt-4 lg:mt-0 space-y-4 lg:space-y-0 lg:space-x-8`}
        >
          <nav className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <HoverCard width="max-content" position="bottom" radius="md">
              <HoverCard.Target>
                <a href="#" className="text-gray-300 hover:text-purple-400">
                  Services
                </a>
              </HoverCard.Target>
              <HoverCard.Dropdown style={CardDropdownStyles}>
                <div className="flex flex-col space-y-2">
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    Custom Software Development
                  </a>
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    Web Development
                  </a>
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    Mobile App Development
                  </a>
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    Cloud Solutions
                  </a>
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    IT Consulting and Strategy
                  </a>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <HoverCard width="max-content" position="bottom" radius="md">
              <HoverCard.Target>
                <a href="#" className="text-gray-300 hover:text-purple-400">
                  Technology
                </a>
              </HoverCard.Target>
              <HoverCard.Dropdown style={CardDropdownStyles}>
                <div className="flex flex-col space-y-2">
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    JAVA
                  </a>
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    MERN
                  </a>
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    FLUTTER
                  </a>
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    DJANGO
                  </a>
                  <a className="text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500">
                    BLOCKCHAIN
                  </a>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className="text-gray-300 hover:text-purple-400">
              Insights
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400">
              Pricing
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-400">
              Changelog
            </a>
          </nav>
        </div>
        <div className="flex justify-center space-x-3 mt-4 lg:mt-0 items-center">
          <div className="text-white animate-bounce cursor-pointer hover:text-purple-400">
            <IconBrandLinkedin size={28} />
          </div>
          <div className="text-white animate-bounce cursor-pointer hover:text-purple-400">
            <IconBrandMeta size={28} />
          </div>
          <div className="text-white animate-bounce cursor-pointer hover:text-purple-400">
            <IconBrandFacebook size={28} />
          </div>
          <div className="text-white animate-bounce cursor-pointer hover:text-purple-400">
            <IconBrandWhatsapp size={28} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
