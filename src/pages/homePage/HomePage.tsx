import {
  Category,
  CategorySkeleton,
  Heading,
  Hero,
  ReviewCard,
  Skeleton,
} from "../../components/component";
import { useSelector } from "react-redux";
import HomeProduct from "../../components/homeProductList/HomeProduct";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
const HomePage = () => {
  const products = useSelector((state) => state.product);
  const { status } = useSelector((store) => store.loader);
  return (
    <section>
      <div className="lg:container mx-auto">
        <Hero />
        <div className="bg-white">
          <HomeProduct
            title={"New Arrivals"}
            loading={status}
            products={products?.arivalsProducts?.products}
            link={"/product/slug?query=arrival"}
          />

          <div className="divider w-full"></div>

          <HomeProduct
            title={"TOP SELLING"}
            loading={status}
            products={products?.topProducts?.products}
            link={"/product/slug?query=top"}
          />
          <div className="divider w-full"></div>
          {/* browse by category */}
          <Category loading={status} />
          {/* customers review */}
          <ReviewSection />
        </div>
      </div>
    </section>
  );
};
function ReviewSection() {
  const reviews = [
    {
      id: 1,
      star: 3,
      customer: "abhijt",
      verified: true,
      text: "good product",
    },
    {
      id: 1,
      star: 3,
      customer: "abhijt",
      verified: true,
      text: "good product",
    },
    {
      id: 1,
      star: 3,
      customer: "abhijt",
      verified: true,
      text: "good product",
    },
    {
      id: 1,
      star: 3,
      customer: "abhijt",
      verified: true,
      text: "good product",
    },
    {
      id: 1,
      star: 3,
      customer: "abhijt",
      verified: true,
      text: "very good product. i am using this product for last 2 yeays no damge or color fade yet",
    },
  ];
  return (
    <div className="px-4 py-5">
      <div className="flex justify-between gap-3  items-center">
        <Heading title={"Our Happy customers"} />
        <div className="flex mx-5 gap-4">
          <button className="hover:bg-gray-200 rounded p-2">
            <IoIosArrowRoundBack size={30} />
          </button>
          <button className="hover:bg-gray-200 rounded p-2">
            <IoIosArrowRoundForward size={30} />
          </button>
        </div>
      </div>
      <div className="overflow-auto my-4 py-2">
        <div className="flex gap-5 px-2">
          {reviews.map((rev) => (
            <ReviewCard
              stats={rev.star}
              customerName={rev.customer}
              verified={rev.verified}
              reviewText={rev.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
