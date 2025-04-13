import React from "react";
import cl from "classnames";
const Skeleton = ({ count, style, children }) => {
  return (
    <>
      <div
        className={cl("flex gap-4 justify-center my-5 flex-wrap px-10", style)}
      >
        {Array.from({ length: count }, (_, index) => {
          return children;
        })}
      </div>
    </>
  );
};

export default Skeleton;
