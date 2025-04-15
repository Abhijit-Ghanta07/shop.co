import { useOnlineStatus } from "../hooks/useOnlineStatus";
import useUser from "../hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

const GuestProtected = () => {
  const [_, status] = useUser();
  return status ? <Outlet /> : <Navigate to={"/"} />;
};
const UserProtected = () => {
  const [_, status] = useUser();
  return status ? <Navigate to={"/"} /> : <Outlet />;
};
const AdminProtected = () => {
  const [user] = useUser();
  return user?.roles?.includes("ADMIN") ? <Outlet /> : <Navigate to={"/"} />;
};

const OfflineStatusProtected = () => {
  const online = useOnlineStatus();
  return online ? <Navigate to={"/"} /> : <Outlet />;
};

export {
  GuestProtected,
  UserProtected,
  AdminProtected,
  OfflineStatusProtected,
};
