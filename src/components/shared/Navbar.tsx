import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bread, List, ShoppingCart, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import useAuth from "@/hooks/useAuth";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const { auth } = useAuth();
  return (
    <Headroom className="z-20 relative">
      <nav className="border-b border-gray-300  h-[72px] bg-white drop-shadow-sm  flex items-center">
        <div className="mx-auto w-[90%] lg:w-4/5 flex justify-between items-center">
          <Link to={"/"} className="text-3xl font-bold flex items-center gap-2">
            <Bread size={32} className="text-accent_alt" />
            <div>
              <span className="text-accent_alt">Fo</span>od'er
            </div>
          </Link>

          <div className="lg:flex gap-4 hidden">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={`${link.path}`}
                className={
                  "hover:text-accent_alt transition-all rounded py-1 text-[#242424]"
                }
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex gap-4  items-center">
              <Link to={"/cart"}>
                <ShoppingCart size={24} />
              </Link>
              <Link to={"/profile"}>
                <User size={24} />
              </Link>
              {auth?.user.role === "admin" && (
                <Link
                  to={"/admin"}
                  className="text-white bg-accent_alt px-4 py-2 rounded-full text-sm"
                >
                  Admin
                </Link>
              )}
            </div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger>
                  <List size={32} className="mt-1" />
                </SheetTrigger>
                <SheetContent className="bg-primary w-2/3">
                  <SheetHeader>
                    <SheetTitle className="text-[#242424] border-b border-gray-400 pb-2">
                      Welcome to Company
                    </SheetTitle>
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <Link
                          to={`${link.path}`}
                          className={
                            "hover:bg-gray-200 transition-all rounded py-1"
                          }
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </Headroom>
  );
};

export default Navbar;
