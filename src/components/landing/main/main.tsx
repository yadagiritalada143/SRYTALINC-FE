import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main className="relative h-[130dvh] text-white flex flex-col justify-center items-center px-4 bg-cover bg-center bg-fixed">
      <h1 className="text-5xl w-full md:w-3/4 font-bold mb-6 text-center">
        Empowering Businesses with Innovative Technology Solutions
      </h1>
      <p className="text-lg text-white text-center max-w-2xl">
        At SrytalInc, we are dedicated to driving digital transformation by
        providing cutting-edge software solutions tailored to meet the unique
        needs of businesses across industries. Our expertise spans custom
        software development, web and mobile app creation, cloud solutions, and
        IT consulting. With a focus on innovation, quality, and client
        satisfaction, we leverage the latest technologies to deliver scalable
        and efficient solutions that empower our clients to thrive in the
        digital age. Whether you're a startup or an established enterprise,
        SrytalInc is your trusted partner in achieving technological excellence.
      </p>
      <Link
        className="p-2 mt-4 bg-transparent text-white hover:shadow-lg hover:shadow-purple-400 shadow-sm shadow-purple-400 rounded-md"
        to="/about"
      >
        About Us
      </Link>
    </main>
  );
};

export default Main;
