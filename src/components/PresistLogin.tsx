import useAuth from "@/hooks/useAuth";
import useRefresh from "@/hooks/useRefresh";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PresistLogin = () => {
  const refresh = useRefresh();
  const authContext = useAuth();
  const auth = authContext ? authContext.auth : undefined;
  const [isLoadng, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        await refresh();
      } catch (error) {
        // session cookie expired
        console.log(error);
        console.log("session refresh token habis");
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyCookie() : setIsLoading(false);
  }, []);

  return (
    <>
      {isLoadng ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PresistLogin;
