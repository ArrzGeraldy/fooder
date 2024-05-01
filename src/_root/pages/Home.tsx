import { ArrowRight } from "@phosphor-icons/react";
import heroImg from "/hero-img.png";
import MenuList from "@/components/home/MenuList";
import BannerTwo from "/banner-2.jpg";
import BannerOne from "/banner-1.jpg";

const Home = () => {
  return (
    <>
      <section className="w-full bg-gray-50">
        <div className="w-4/5 mx-auto height-main flex flex-col lg:flex-row gap-8 lg:justify-between justify-center items-center">
          <div className="lg:w-[40%] mt-4 lg:mt-0 text-center lg:text-start items-center lg:items-start w-full flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">Hero</h1>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              molestiae error consectetur in eveniet eius aspernatur minus amet?
              Dolorum, quos.
            </p>
            <a
              href="/"
              className="px-4 py-2.5 bg-accent_alt hover:bg-accent_hover text-white rounded-full items-center  w-fit flex gap-2 mt-1"
            >
              <span>Our tasty food</span>
              <ArrowRight size={20} />
            </a>
          </div>

          <div className=" bg-accent_alt rounded-full w-fit">
            <img src={heroImg} alt="" className="lg:max-w-xl max-w-md" />
          </div>
        </div>
      </section>

      <section className="mt-24">
        <h1 className="text-4xl text-center ">New Menu</h1>
        <p className="text-center mt-2">Lorem ipsum sit.</p>
        <div className="mt-4">
          <MenuList />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 w-4/5 mx-auto gap-8 mt-24">
        <div
          style={{ backgroundImage: `url(${BannerOne})` }}
          className="bg-cover bg-center h-56 rounded-md flex items-center px-8"
        >
          <div>
            <h4 className="font-medium text-2xl">Fresh Fruits</h4>
            <span>
              Get Upto <span className="font-medium">30%</span> off
            </span>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${BannerTwo})` }}
          className="bg-cover bg-center h-56 rounded-md flex items-center px-8 "
        >
          <div>
            <h4 className="font-medium text-2xl">Healthy Food</h4>
            <span>
              Get Upto <span className="font-medium">25%</span> off
            </span>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <h1 className="text-4xl text-center">Reviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-4/5 mx-auto gap-8 mt-8">
          {/* review 1 */}
          <div className="bg-white flex  rounded-md border border-gray-300 shadow-md">
            <div className="w-4 bg-accent_alt rounded-md"></div>
            <div className="px-4 py-2.5">
              <span className="font-semibold">Jon Doe</span>
              <div className="flex  items-center">
                <div className="flex items-center mt-2 mb-4">
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                fuga minus voluptates. Rem nihil beatae quasi a! Tempora non, a
                recusandae nemo officia porro eius hic. Pariatur aut sequi
                facilis.
              </p>
            </div>
          </div>
          {/* review 2 */}
          <div className="bg-white flex  rounded-md border border-gray-300 shadow-md">
            <div className="w-4 bg-accent_alt rounded-md"></div>
            <div className="px-4 py-2.5">
              <span className="font-semibold">Jon Doe</span>
              <div className="flex  items-center">
                <div className="flex items-center mt-2 mb-4">
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                fuga minus voluptates. Rem nihil beatae quasi a! Tempora non, a
                recusandae nemo officia porro eius hic. Pariatur aut sequi
                facilis.
              </p>
            </div>
          </div>
          {/* review 3 */}
          <div className="bg-white flex  rounded-md border border-gray-300 shadow-md">
            <div className="w-4 bg-accent_alt rounded-md"></div>
            <div className="px-4 py-2.5">
              <span className="font-semibold">Jon Doe</span>
              <div className="flex  items-center">
                <div className="flex items-center mt-2 mb-4">
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                fuga minus voluptates. Rem nihil beatae quasi a! Tempora non, a
                recusandae nemo officia porro eius hic. Pariatur aut sequi
                facilis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
