import { SyntheticEvent, useState } from "react";
import { Heading, Star } from "../component";
import { Link } from "react-router-dom";
import cl from "classnames";

const SearchProductCard = ({ product = {}, style = "", imgStyle }) => {
  return (
    <>
      <Link
        to={`/product/${product._id}`}
        className={cl("grow flex gap-1 overflow-hidden text-black", style)}
      >
        <figure className={cl("h-16 w-14", imgStyle)}>
          <img
            src={product?.imgurl || product?.firstVariantImages?.[0]?.url || ""}
            className={cl("rounded size-full aspect-square")}
            alt="cloth"
            onError={(e: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
              e.target.parentElement.parentElement.parentElement.style.display =
                "none";
            }}
          />
        </figure>
        <div className="gap-1 px-2 flex flex-col">
          <Heading
            title={product?.name}
            style={"!text-sm !my-0 text-start !font-medium"}
          />
          <div className="w-fit">
            <span>
              <Star
                count={product?.averageRating || 1}
                color="orange"
                size={10}
              />
            </span>
            {/* <span>{Math.round(product?.averageRating)}/5</span> */}
          </div>

          <p className="flex gap-2 items-center text-xs md:text-2xl font-bold">
            {/* <span>${product?.price}</span> */}
            <span className="text-base">${product?.firstVariantSellPrice}</span>
            {product?.firstVariantDiscount &&
            product?.firstVariantDiscount > 0 ? (
              <span className="badge font-normal border-none text-red-500 bg-red-100">
                -{product?.firstVariantDiscount}%
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
      </Link>
      <div className="divider m-0"></div>
    </>
  );
};

export default SearchProductCard;
