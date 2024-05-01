import Logout from "@/components/Logout";
import { cn } from "@/lib/utils";
import { Bell, List, MagnifyingGlass, UserCircle } from "@phosphor-icons/react";
import { Link, Outlet, useLocation } from "react-router-dom";

const linkItems = [
  { name: "dashboard", href: "/profile" },
  { name: "Orders", href: "/profile/orders" },
  { name: "My addresses", href: "/profile/addresses" },
];

const ProfileLayout = () => {
  const { pathname } = useLocation();
  const toggleAside = () => {
    const aside = document.querySelector(".tag-menu");
    aside?.classList.toggle("tag-menu-show");
  };
  return (
    <main className="flex h-screen w-full bg-gray-100 relative">
      <aside className="tag-menu lg:relative flex lg:w-2/12 absolute z-10 h-screen -translate-x-72 lg:translate-x-0">
        <div className="border-e py-6 px-4 lg:w-full flex flex-col justify-between  w-72 bg-white">
          <div>
            <h1 className="text-center font-semibold text-2xl">My Profile</h1>
            <div className="mt-4 flex flex-col gap-2">
              {linkItems.map((item, i) => (
                <Link
                  onClick={toggleAside}
                  to={item.href}
                  key={i}
                  className={cn(
                    "py-2 hover:bg-gray-100 transition-all  px-4 rounded-md",
                    pathname === item.href &&
                      "bg-black hover:bg-black text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <Link
              to={"/"}
              className="text-center flex bg-black mb-4 text-white justify-center py-2"
            >
              Home
            </Link>
            <Logout style="bg-accent_alt" />
          </div>
        </div>
        <div
          className="bg-gray-50 lg:hidden cursor-pointer px-2 h-fit mt-12 drop-shadow-md py-3 rounded-e-full"
          onClick={toggleAside}
        >
          <List size={18} />
        </div>
      </aside>
      <section className="lg:w-[83%] w-full">
        <nav className="bg-white py-3 px-4 flex justify-between items-center drop-shadow-md">
          <div className="w-60 relative">
            <input
              type="text"
              placeholder="Search..."
              className="text-sm border border-gray-400 px-4 py-1 w-full rounded-full"
            />
            <MagnifyingGlass
              size={18}
              className="text-gray-700 absolute top-1.5 right-3"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Bell size={24} />
            <UserCircle size={28} />
          </div>
        </nav>
        <div className="w-[95%] flex mx-auto mt-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default ProfileLayout;
