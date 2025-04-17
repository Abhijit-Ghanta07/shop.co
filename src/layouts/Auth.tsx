import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../includes/includes";
import authImg from "../assets/svgs/auth/frame.svg";
const Auth = () => {
  return (
    <main className="min-h-screen text-black dark:text-white">
      <ScrollRestoration />
      <Header />
      <div className="flex grow items-center justify-center bg-gray-100">
        <div className="mt-5  flex flex-col sm:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="order-2 sm:order-2 sm:w-1/2 p-8">
            <Outlet />
          </div>

          {/* left side */}
          <div className="order-1 sm:order-2 block sm:w-1/2">
            <img
              src={authImg}
              alt="Registration illustration"
              className="object-fill p-1 w-full h-full aspect-video"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
