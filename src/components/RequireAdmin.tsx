import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";
import NotFound from "./NotFound";

const RequireAdmin = () => {
  const { auth } = useAuth();
  return <div>{auth?.user.role === "admin" ? <Outlet /> : <NotFound />}</div>;
};

export default RequireAdmin;
