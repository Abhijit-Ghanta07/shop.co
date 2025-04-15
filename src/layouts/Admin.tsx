import { AdminDashboardHeader, Sidebar } from "../includes/includes";
import { Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <>
      <div className="wrapper xl:container xl:mx-auto h-screen  sm:m-0 text-black">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex flex-col w-full overflow-y-scroll">
            <AdminDashboardHeader />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
