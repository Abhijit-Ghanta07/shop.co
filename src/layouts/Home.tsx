import { Footer, Header } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { NewsLetter } from "../components/component";

const Home = () => {
  return (
    <>
      <Header />
      <div className="overflow-auto mb-10 sm:m-0 text-black">
        <section>
          <div className="lg:container mx-auto">
            <Outlet />
          </div>
          <div className="bg-white">
            <NewsLetter />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
