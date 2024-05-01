import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const authContext = useAuth();
  const auth = authContext ? authContext.auth : undefined;
  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/sign-in"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
