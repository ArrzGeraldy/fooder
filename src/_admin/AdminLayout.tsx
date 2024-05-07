import Logout from "@/components/Logout";
import { cn } from "@/lib/utils";
import { List } from "@phosphor-icons/react";
import { Link, Outlet, useLocation } from "react-router-dom";

const items = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/product" },
  { name: "Categories", href: "/admin/category" },
  { name: "Tags", href: "/admin/tag" },
  { name: "Users", href: "/admin/users" },
  { name: "Orders", href: "/admin/orders" },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const toggleAside = () => {
    const aside = document.querySelector(".tag-menu");
    aside?.classList.toggle("tag-menu-show");
  };

  return (
    <main className="flex gap-8 h-screen">
      <aside className="tag-menu top-0 flex lg:w-2/12 fixed z-10 h-screen text-white -translate-x-72 lg:translate-x-0">
        <div className="border-e py-6 lg:w-full flex flex-col justify-between  w-72 bg-accent_alt">
          <div>
            <h1 className="text-center font-semibold text-2xl">Admin</h1>
            <div className="mt-4 flex flex-col gap-2">
              {items.map((item, i) => (
                <Link
                  onClick={toggleAside}
                  to={item.href}
                  key={i}
                  className={cn(
                    "py-2 hover:bg-black transition-all  px-4",
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
              className="text-center flex bg-gray-100 mb-4 w-[90%] mx-auto text-black justify-center py-2"
            >
              Home
            </Link>
            <Logout style="bg-gray-100 text-black w-[90%] ms-3" />
          </div>
        </div>
        <div className="relative">
          <div
            className="bg-gray-50 lg:hidden absolute bottom-20 border border-gray-400 cursor-pointer px-2 h-fit shadow-md  py-3 rounded-e-full"
            onClick={toggleAside}
          >
            <List size={18} className="text-gray-800" />
          </div>
        </div>
      </aside>
      <section className="w-full bg-gray-50">
        <div className="w-[80%]  mx-auto mt-6 lg:ms-72">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default AdminLayout;
