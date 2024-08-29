import Header from "../../components/landing/header/header";
import Main from "../../components/landing/main/main";
import Footer from "../../components/landing/footer/footer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import About from "../../components/landing/about/about";
import Services from "../../components/landing/services/services";
import PromoBanner from "../../components/landing/promo/promo";
import WhyChooseUs from "../../components/landing/choose/choose";
import ContactComponent from "../../components/landing/contact/contact";

const Landing = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white snap-y snap-mandatory">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-50 animate-move1"></div>
      <div className="absolute top-20 right-10 w-40 h-40 bg-pink-500 rounded-full opacity-50 animate-move2"></div>
      <div className="absolute bottom-10 left-20 w-48 h-48 bg-blue-500 rounded-full opacity-50 animate-move3"></div>

      <Parallax pages={6}>
        <ParallaxLayer
          style={{
            backgroundImage: "url(/wal2.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          offset={0}
          speed={0.2}
          factor={1.2}
        />

        <ParallaxLayer
          offset={0}
          speed={1}
          factor={1}
          className="snap-start flex flex-col"
        >
          <div className="border-b-2 border-gray-500">
            <Header />
          </div>
          <div className="mt-8 md:mt-2">
            <Main />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={1} factor={5}>
          <div className="py-12 md:py-24 w-full  mx-auto">
            <About />
          </div>
          <div className="py-12 md:py-24 w-full  mx-auto">
            <Services />
          </div>
          <div className="py-12 md:py-24 w-full  mx-auto">
            <PromoBanner />
          </div>
          <div className="py-12 md:py-24 w-full max-w-5xl mx-auto">
            <WhyChooseUs />
          </div>
          <div className="py-12 md:py-24 w-full  mx-auto">
            <ContactComponent />
          </div>
          <div className="py-12 md:py-24 w-full max-w-5xl mx-auto">
            <Footer />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Landing;
