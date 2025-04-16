import {
  Banner,
  Category,
  CategorySkeleton,
  Heading,
  Hero,
  List,
  ProductCard,
  ProductSkeleton,
  ReviewCard,
  Skeleton,
} from "../../components/component";
import { useSelector } from "react-redux";
import heroImg from "../../assets/images/hero/hero.png";
import HomeProduct from "../../components/homeProductList/HomeProduct";
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
          {status ? (
            <Skeleton count={4} style={"justify-center px-10"}>
              <CategorySkeleton />
            </Skeleton>
          ) : (
            <Category />
          )}

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
      text: "good product",
    },
  ];
  return (
    <div className="px-4 py-5">
      <div className="flex justify-between gap-3  items-center">
        <Heading title={"Our Happy customers"} />
        {/* scroller */}
      </div>
      <div className="overflow-auto my-4">
        <div className="flex gap-5">
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
