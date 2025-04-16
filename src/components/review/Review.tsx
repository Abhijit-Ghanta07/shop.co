import React, { FC, useState } from "react";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { Star } from "../component";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Review = ({
  id = "",
  stats = 4,
  customerName = "",
  verified = true,
  reviewText = false,
  handleDelete,
}) => {
  const { userDetails } = useSelector((store) => store.user);
  const [isAdmin, setIsadmin] = useState(userDetails?.roles?.includes("ADMIN"));
  const handleDeleteClick = async () => {
    handleDelete(id);
  };
  return (
    <div className="outline outline-1 rounded-md p-3 min-w-60  max-w-sm">
      <div className="wrapper h-full text-black relative">
        {isAdmin && (
          <button
            className="p-2 border absolute right-5 top-3 bg-red-500 cursor-pointer hover:scale-110 duration-300 rounded-full"
            onClick={handleDeleteClick}
          >
            <FiTrash color="white" />
          </button>
        )}

        <div className="flex h-full flex-col gap-1">
          <p className="flex gap-2 justify-between">
            <Star count={stats} size={15} color="orange" />
            <span className="inline-block hover:bg-gray-300 p-1 cursor-pointer rounded">
              <HiOutlineDotsHorizontal />
            </span>
          </p>
          <div className="flex items-center gap-2">
            <p className="capitalize text-lg font-medium">{customerName}</p>
            <span>
              {verified ? (
                <FaCheckCircle color="green" />
              ) : (
                <FaRegCheckCircle color="gray" />
              )}
            </span>
          </div>
          <p className=" flex-1 text-sm text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis">
            {reviewText}
          </p>
          <div className="mt-auto">
            <p className="text-sm text-gray-700">
              Posted On: <span>Auguest 23th 2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
