import React from "react";
import style from "./banner.module.scss";
import cl from "classnames";
const Banner = ({ img, title = "Hot Deals" }) => {
  return (
    <>
      <div className="lg:container mx-auto">
        <div
          className={cl("wrapper w-full", style.banner)}
          style={{ background: `url(${img})` }}
        >
          <h2>{title}</h2>
        </div>
      </div>
    </>
  );
};

export default Banner;
