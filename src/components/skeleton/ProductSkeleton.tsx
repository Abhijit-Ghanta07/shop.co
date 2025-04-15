import React from "react";

const ProductSkeleton = () => {
  return (
    <>
      <div className="flex flex-col  gap-2">
        <div className="skeleton bg-gray-200 rounded-md h-28 w-28  sm:h-44 sm:w-44"></div>
        <div className="skeleton bg-gray-200  h-3 w-20"></div>
        <div className="skeleton bg-gray-200  h-3 w-28"></div>
        <div className="skeleton bg-gray-200  h-4 w-28"></div>
      </div>
    </>
  );
};

export default ProductSkeleton;
