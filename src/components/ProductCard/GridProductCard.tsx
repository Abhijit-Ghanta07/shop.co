import { SyntheticEvent } from "react";
import { Star } from "../component";
import { Link } from "react-router-dom";
import cl from "classnames";
import customStyle from "./card.module.scss";
const GridProductCard = ({ product = {}, style = "", imgStyle = "" }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className={cl(style)}>
        <figure className={cl(imgStyle)}>
          <img
            src={product?.imgurl || product?.firstVariantImages?.[0]?.url || ""}
            className={cl(customStyle.card__img)}
            alt="cloth"
            onError={(e: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
              e.target.parentElement.parentElement.parentElement.style.display =
                "none";
            }}
          />
        </figure>
        <div className="sm:p-2  p-1 gap-1 flex flex-col">
          <h2 className="text-gray-900 text-xs sm:text-sm  font-medium capitalize  overflow-hidden">
            {product?.name}
            {/* <div className="badge badge-seconday">{product.category.name}</div> */}
          </h2>
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
          <div className="flex gap-1">
            {/* <p className="text-sm text-gray-500 capitalize font-medium">
            {product?.description}
          </p> */}
          </div>

          <p className="flex gap-2 items-center text-xs md:text-2xl font-bold">
            <span>${product?.firstVariantSellPrice}</span>
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
      </div>
    </Link>
  );
};

export default GridProductCard;
