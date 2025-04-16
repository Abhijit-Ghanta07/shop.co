import heroImg from "../../assets/images/hero/hero.png";
import chanel from "../../assets/svgs/brands/chanel.svg";
import versace from "../../assets/svgs/brands/versace.svg";
import gucci from "../../assets/svgs/brands/gucci.svg";
import prada from "../../assets/svgs/brands/prada.svg";
import zara from "../../assets/svgs/brands/zara.svg";
import cl from "classnames";
import style from "./hero.module.scss";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const Hero = () => {
  return (
    <main className="overflow-hidden">
      <div className="">
        <div className="h-fit">
          <div className="bg-light relative flex flex-col sm:flex-row overflow-hidden">
            <div className="flex flex-col items-center md:items-start px-5 sm:px-10 pt-5 z-[1]">
              <h2
                className={cl(
                  "text-4xl integral font-extrabold mt-6 md:m-0 capitalize md:text-5xl md:w-2/4"
                )}
              >
                find Clothes that matches your style
              </h2>
              <p
                className={cl(
                  "text-balance text-sm text-gray-700 capitalize my-5  md:w-1/3"
                )}
              >
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <Link
                to={"/product/category"}
                className=" w-full satoshi bg-dark sm:w-40 text-light font-bold p-3 text-center rounded-badge text-lg"
              >
                Shop Now
              </Link>
              <div className="flex  gap-3 justify-center flex-wrap my-8">
                <HeroStats title="International Brands" number="200" />
                <HeroStats title="High-Quality Products" number="2,000" />
                <HeroStats title="Happy Coustomers" number="30,000" />
              </div>
            </div>
            <img
              src={heroImg}
              className={cl("sm:absolute", style.hero__img)}
              alt=""
            />
          </div>
        </div>
      </div>
      <HeroBanner />
    </main>
  );
};

function HeroBanner() {
  const bannerData = [versace, zara, gucci, prada, chanel];

  return (
    <div className="px-5 py-2 bg-gray-200">
      <div className="flex justify-around gap-2 flex-wrap ">
        {bannerData.map((ele) => {
          return (
            <img
              src={ele}
              alt="brand img"
              className={cl(style.hero__brand__img)}
            />
          );
        })}
      </div>
    </div>
  );
}
function HeroStats({ title = "", number = "" }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="font-semibold flex items-center gap-1 text-2xl">
          <span className="satoshi">{number}</span>
          <span>
            <FaPlus size={18} />
          </span>
        </div>
        <div className="satoshi text-gray-600 text-xs md:text-sm leading-4">
          <span>{title}</span>
        </div>
      </div>
    </>
  );
}

export default Hero;
