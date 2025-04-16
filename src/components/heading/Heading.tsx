import React from "react";
import cl from "classnames";
const Heading = ({ title, style }) => {
  return (
    <>
      <h2
        className={cl(
          "integral text-2xl sm:text-3xl  uppercase my-5 font-extrabold",
          style
        )}
      >
        {title}
      </h2>
    </>
  );
};

export default Heading;
