import { SyntheticEvent } from "react";
import { Star } from "../component";
import { Link } from "react-router-dom";
import cl from "classnames";
import customStyle from "./card.module.scss";
const ProductCard = ({ product = {}, style = "", imgStyle = "" }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className={cl(customStyle.card, style)}
    >
      <div>
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
          <div className="flex gap-1"></div>
          <p className="flex gap-2 text-sm md:text-2xl items-center font-bold">
            <span>${product?.firstVariantSellPrice}</span>
            {product?.firstVariantDiscount &&
            product?.firstVariantDiscount > 0 ? (
              <span className="badge font-normal border-none text-red-600 bg-red-200">
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

export default ProductCard;
