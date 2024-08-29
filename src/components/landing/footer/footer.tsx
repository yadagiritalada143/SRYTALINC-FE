import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandGithub,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <div className=" text-white py-10 border-t-2 border-gray-400">
      <div className=" px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl font-bold mb-4">SRYTAL</h1>
            <p className="text-sm mb-4">
              Empowering businesses with technology solutions!
            </p>
            <div className="flex gap-2 mb-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <IconBrandLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <IconBrandTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <IconBrandYoutube size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <IconBrandGithub size={24} />
              </a>
            </div>
            <p className="text-xs text-gray-400">
              © SRYTAL 2024. All Rights Reserved
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="w-1/4 mb-6 md:mb-0">
              <h2 className="text-sm font-bold mb-2">Company</h2>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-1/4 mb-6 md:mb-0">
              <h2 className="text-sm font-bold mb-2">Product</h2>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-1/4 mb-6 md:mb-0">
              <h2 className="text-sm font-bold mb-2">Resources</h2>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
