import { Suspense } from "react";
import { PwaBanner } from "../components/component";
import { Outlet } from "react-router-dom";
import { SnackBar } from "../includes/includes";
import { Toaster } from "react-hot-toast";
import { LoaderScreen } from "../pages/page";

function RootLayout() {
  return (
    <>
      <Suspense fallback={<LoaderScreen />}>
        <PwaBanner />
        <Outlet />
        <SnackBar />
        <Toaster position="top-center" reverseOrder={false} />
      </Suspense>
    </>
  );
}

export default RootLayout;
