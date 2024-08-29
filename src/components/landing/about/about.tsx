import {
  IconBrandReact,
  IconBrandNodejs,
  IconBrandJavascript,
  IconBrandTailwind,
  IconBrandPython,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandMongodb,
} from "@tabler/icons-react";
import { useRef } from "react";

const About = () => {
  const flipRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (flipRef.current) {
      flipRef.current.classList.toggle("is-flipped");
    }
  };

  return (
    <div className="px-4 md:px-12 flex flex-col space-y-10 relative z-10">
      <div className="mt-12">
        <h1 className="text-3xl font-bold">ABOUT US</h1>
        <div className="mt-4 text-lg leading-relaxed">
          We are a forward-thinking software company committed to transforming
          businesses through innovative technology solutions. Our team of
          experienced developers, designers, and strategists works closely with
          clients to understand their unique challenges and deliver customized
          software that drives growth and efficiency. With a passion for
          excellence, we specialize in creating cutting-edge applications,
          responsive websites, and robust cloud solutions that empower
          businesses to stay ahead in a competitive market.
          <div
            id="flip-card"
            ref={flipRef}
            className="relative float-right md:w-1/2 m-4 rounded-3xl w-full h-64 md:h-80 transform transition-transform duration-1000"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            style={{
              perspective: "1000px",
              boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
            }}
          >
            <div className="flip-inner absolute w-full h-full">
              <div
                className="absolute w-full h-full backface-hidden"
                style={{
                  transform: "rotateY(0deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  className="w-full h-full rounded-3xl object-cover"
                  src="/img-2.jpg"
                  alt="Front"
                />
              </div>
              <div
                className="absolute w-full h-full backface-hidden"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  className="w-full h-full rounded-3xl object-cover"
                  src="/img-4.jpg"
                  alt="Back"
                />
              </div>
            </div>
          </div>
          Our approach is centered around client collaboration, quality, and
          continuous improvement. We leverage the latest technologies and best
          practices to ensure that our solutions are not only powerful but also
          scalable and secure. By focusing on long-term partnerships, we aim to
          provide ongoing support and enhancements that keep our clients at the
          forefront of their industries. Whether it's developing a custom
          software solution or optimizing existing systems, we are dedicated to
          helping businesses achieve their goals through technology.
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Technologies We Use
        </h1>
        <div className="flex overflow-hidden">
          <div
            className="flex space-x-32 animate-marquee"
            style={{
              animation: "marquee 10s linear infinite",
            }}
          >
            <IconBrandReact className="text-blue-500 w-20 h-20" />
            <IconBrandNodejs className="text-green-500 w-20 h-20" />
            <IconBrandJavascript className="text-yellow-500 w-20 h-20" />
            <IconBrandTailwind className="text-teal-500 w-20 h-20" />
            <IconBrandPython className="text-blue-600 w-20 h-20" />
            <IconBrandHtml5 className="text-orange-600 w-20 h-20" />
            <IconBrandCss3 className="text-blue-700 w-20 h-20" />
            <IconBrandMongodb className="text-green-700 w-20 h-20" />
            {/* Duplicate the icons for continuous loop */}
            <IconBrandReact className="text-blue-500 w-20 h-20" />
            <IconBrandNodejs className="text-green-500 w-20 h-20" />
            <IconBrandJavascript className="text-yellow-500 w-20 h-20" />
            <IconBrandTailwind className="text-teal-500 w-20 h-20" />
            <IconBrandPython className="text-blue-600 w-20 h-20" />
            <IconBrandHtml5 className="text-orange-600 w-20 h-20" />
            <IconBrandCss3 className="text-blue-700 w-20 h-20" />
            <IconBrandMongodb className="text-green-700 w-20 h-20" />
          </div>
        </div>
      </div>

      <style>
        {`
          .flip-inner {
            transform-style: preserve-3d;
            transition: transform 1s;
          }

          .is-flipped .flip-inner {
            transform: rotateY(180deg);
          }

          @keyframes marquee {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default About;
