import React from "react";

const ProductSkeleton = () => {
  return (
    <>
      <div className="flex flex-col  gap-2">
        <div className="skeleton bg-gray-200 rounded-md h-20 w-24  sm:h-28 sm:w-32"></div>
        <div className="skeleton bg-gray-200  h-2 w-16"></div>
        <div className="skeleton bg-gray-200  h-2 w-24"></div>
        <div className="skeleton bg-gray-200  h-3 w-24"></div>
      </div>
    </>
  );
};

export default ProductSkeleton;
