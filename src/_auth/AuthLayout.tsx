import { Outlet } from "react-router-dom";
import AuthImg from "../assets/auth-img.jpg";

const AuthLayout = () => {
  return (
    <main className="flex">
      <section className="lg:w-2/5 w-full bg-primary h-screen justify-center items-center flex">
        <Outlet />
      </section>
      <img
        src={AuthImg}
        className="w-[60%] h-screen object-cover object-center hidden lg:block"
      />
    </main>
  );
};

export default AuthLayout;
