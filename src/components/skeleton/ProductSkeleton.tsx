import React from "react";

const ProductSkeleton = () => {
  return (
    <>
      <div className="flex flex-col  gap-2">
        <div className="skeleton bg-gray-200 rounded-md h-24 w-24  sm:h-36 sm:w-40"></div>
        <div className="skeleton bg-gray-200  h-3 w-20"></div>
        <div className="skeleton bg-gray-200  h-3 w-28"></div>
        <div className="skeleton bg-gray-200  h-4 w-28"></div>
      </div>
    </>
  );
};

export default ProductSkeleton;
