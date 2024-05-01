import useAuth from "@/hooks/useAuth";
import { toastError } from "@/lib/toaster";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Logout = ({ style }: { style: string }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const logout = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      navigate("/");
      setAuth(undefined);
    } else {
      toastError("Failed logout");
    }
  };
  return (
    <button
      onClick={logout}
      className={cn("px-4 py-2 w-full text-center text-white", style)}
    >
      Logout
    </button>
  );
};

export default Logout;
