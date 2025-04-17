import { useRelativeProducts } from "../../querys/product/productQuery";
import { ProductCard, Skeleton } from "../component";

export function RealativeProducts({
  productId = "",
  title = "Relative Products",
}) {
  const { data: products, isLoading } = useRelativeProducts(productId);

  return (
    <section>
      <div className="wrapper py-5 px-1 md:py-10 md:px-5">
        <div className="flex flex-col">
          <h2 className="font-extrabold integral py-10 text-center uppercase text-3xl">
            {title}
          </h2>
          {isLoading ? (
            <Skeleton
              count={5}
              style={"!flex-nowrap !overflow-auto py-5 px-2 !justify-start"}
            >
              <div className="flex flex-col  gap-2">
                <div className="skeleton bg-gray-200  h-44 w-44"></div>
                <div className="skeleton bg-gray-200  h-4 w-20"></div>
                <div className="skeleton bg-gray-200  h-4 w-28"></div>
                <div className="skeleton bg-gray-200  h-8 w-28"></div>
              </div>
            </Skeleton>
          ) : (
            <div className="my-5 overflow-auto">
              <div className="flex gap-7 py-4 px-2">
                {products?.map((ele) => (
                  <ProductCard product={ele} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RealativeProducts;
