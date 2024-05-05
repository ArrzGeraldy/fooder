/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { MenuI } from "@/types";
import useCategory from "@/hooks/useCategory";
import { cn } from "@/lib/utils";
import LoadingRed from "../LoadingRed";

const MenuList = () => {
  const [menus, setmenus] = useState<MenuI[]>([]);
  const { fetchCategory, categories } = useCategory();
  const [qCategory, setQcategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/products?limit=4&sort=-1&category=${qCategory}`
      );

      const json = await response.json();
      setmenus(json.data);
      setIsLoading(false);
    };

    fetchMenu();
  }, [qCategory]);

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div className="bg-white flex ">
        <div className=" flex flex-col items-center md:w-4/5 w-[90%] mx-auto mt-2">
          <div className="flex gap-4 bg-gray-200 rounded-full mb-2">
            <button
              onClick={() => setQcategory("")}
              className={cn(
                "px-4 py-1.5",
                qCategory === "" && "bg-accent_alt text-white rounded-full"
              )}
            >
              Arrive
            </button>
            {categories &&
              categories.map((category) => (
                <button
                  onClick={() => setQcategory(category.name)}
                  key={category.name}
                  className={cn(
                    "px-4 py-1",
                    qCategory === category.name &&
                      "bg-accent_alt text-white rounded-full"
                  )}
                >
                  {category.name}
                </button>
              ))}
          </div>
          {isLoading ? (
            <div className="py-52">
              <LoadingRed style="" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6  gap-6">
              {menus.map((menu: MenuI, i) => (
                <Card menu={menu} key={i} />
              ))}
            </div>
          )}
        </div>

        <Modal />
      </div>
    </>
  );
};

export default MenuList;
