import React from "react";

const TableDataSkeleton = () => {
  return (
    <>
      <div className="flex w-full justify-between bg-white">
        <div className="skeleton bg-inherit w-8 h-8 rounded-full"></div>
        <div className="skeleton bg-inherit h-2 w-20"></div>
        <div className="skeleton bg-inherit h-2 w-20"></div>
        <div className="skeleton bg-inherit h-2 w-20"></div>
        <div className="skeleton bg-inherit h-2 w-20"></div>
      </div>
    </>
  );
};

export default TableDataSkeleton;
