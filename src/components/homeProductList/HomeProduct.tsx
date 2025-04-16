import React, { useEffect, useRef, useState } from "react";
import { Heading, ProductCard, ProductSkeleton, Skeleton } from "../component";
import { Link } from "react-router-dom";
import cl from "classnames";
const HomeProduct = ({ title, products, loading, link }) => {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  }, [products]);
  return (
    <>
      <section>
        <div className="lg:container mx-auto">
          <Heading title={title} style={"text-center"} />
          <div className="overflow-auto m-5" ref={containerRef}>
            <div
              className={cl(
                "flex gap-3",
                !isOverflowing ? "justify-center" : ""
              )}
            >
              {loading ? (
                <Skeleton count={4}>
                  <ProductSkeleton />
                </Skeleton>
              ) : (
                products?.map((product) => <ProductCard product={product} />)
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to={link}
              className="rounded-badge transition-all outline outline-1 px-8 py-2 hover:bg-dark hover:text-light"
            >
              View All
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProduct;
