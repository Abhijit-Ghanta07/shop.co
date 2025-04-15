import { Suspense } from "react";
import { PwaBanner } from "../components/component";
import { Outlet } from "react-router-dom";
import { SnackBar } from "../includes/includes";
import { Toaster } from "react-hot-toast";
import { LoaderScreen } from "../pages/page";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <>
      <Suspense fallback={<LoaderScreen />}>
        <PwaBanner />
        <Outlet />
        <SnackBar />
        <Toaster position="top-center" reverseOrder={false} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 100 }}
        />
      </Suspense>
    </>
  );
}

export default RootLayout;
