import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "../includes/includes";

const Auth = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <>
        {/* <Link
          to={"/"}
          className="absolute w-fit p-3 border top-5 left-5 rounded-3xl text-light bg-primary"
        >
          Go Home
        </Link> */}
        <Outlet />
      </>
      <ToastContainer />
    </>
  );
};

export default Auth;
