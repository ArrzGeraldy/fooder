/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MenuI, TagI } from "../../types";
import Card from "@/components/Card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  CaretDown,
  DotsThreeOutlineVertical,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import Search from "@/components/Search";
import { useSearchParams } from "react-router-dom";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCategory from "@/hooks/useCategory";
import Pagination from "@/components/Pagination";
import LoadingRed from "@/components/LoadingRed";

const Menu = () => {
  const [menus, setmenus] = useState<MenuI[]>([]);
  const [tags, setTags] = useState<TagI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const { categories, fetchCategory } = useCategory();

  const [qTags, setQTags] = useState<string[]>([]);
  const [qcategory, setQCategory] = useState<string>("");
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState<number>(-1);
  const q = searchParams.get("q") || "";

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const closeAside = () => {
    const tagMenu = document.querySelector(".tag-menu");
    tagMenu?.classList.toggle("tag-menu-show");
  };

  const handleSort = (value: number) => {
    if (value === sort) return;
    setPage(1);
    setSort(value);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    setQTags([]);
  }, [qcategory]);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/products?q=${q}&category=${qcategory}&tags[]=${qTags}&limit=8&page=${page}&sort=${sort}`
      );

      return response.json();
    };

    const fetchTags = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/tags?category=${qcategory}`
      );

      return response.json();
    };

    setIsLoading(true);
    Promise.all([fetchMenu(), fetchTags()])
      .then(([dataMenu, dataTags]) => {
        setTotalPage(dataMenu.pagination.total_page);
        setmenus(dataMenu.data);
        setTags(dataTags.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [qTags, qcategory, q, page, sort]);

  return (
    <>
      <section className="bg-white flex">
        <aside className="fixed lg:w-[20%] lg:sticky top-0 z-30 lg:z-10 tag-menu -translate-x-72 lg:translate-x-0 flex h-screen">
          <div className="w-72 lg:w-full border-e border-gray-300  bg-white px-4">
            <h1 className="text-2xl font-semibold text-center mt-4 mb-4">
              Tags
            </h1>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setQTags([]);
                  setPage(1);
                  closeAside();
                }}
                className={cn(
                  "rounded-full",
                  !qTags[0]
                    ? "bg-accent_alt hover:bg-accent_alt"
                    : "bg-transparent border text-black border-gray-300 hover:bg-gray-200"
                )}
              >
                All
              </Button>
              {tags.map((tag) => (
                <Button
                  key={tag.name}
                  onClick={() => {
                    setPage(1);
                    setQTags([tag.name]);
                    closeAside();
                  }}
                  className={cn(
                    "rounded-full",
                    qTags[0] === tag.name
                      ? "bg-accent_alt hover:bg-accent_alt"
                      : "bg-transparent border border-gray-300 text-black hover:bg-gray-200"
                  )}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              const tagMenu = document.querySelector(".tag-menu");
              tagMenu?.classList.toggle("tag-menu-show");
            }}
            className="bg-gray-100 border-e border-gray-300 py-4 px-2 rounded-e-full mt-24 h-fit lg:hidden"
          >
            <DotsThreeOutlineVertical size={24} />
          </button>
        </aside>
        <div className="w-[95%] lg:w-3/4 px-8  mx-auto pb-36 mt-4">
          <div className="flex flex-col md:items-center gap-y-4 md:flex-row md:justify-between">
            <div className="flex gap-4 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none gap-2 flex  text-sm justify-center items-center text-start px-4 rounded-md border py-2 border-gray-200 drop-shadow-md bg-white">
                  <SlidersHorizontal size={22} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className={cn(
                      "cursor-pointer",
                      sort === -1 && "bg-black text-white"
                    )}
                    onClick={() => handleSort(-1)}
                  >
                    New
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      "cursor-pointer mt-2",
                      sort === 1 && "bg-black text-white"
                    )}
                    onClick={() => handleSort(1)}
                  >
                    Latest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none gap-2 flex  text-sm justify-center items-center text-start px-4 rounded-md border py-2 border-gray-200 drop-shadow-md bg-white">
                  <p className="font-bold text-gray-600"> Category: </p>
                  <Badge className="bg-secondary text-slate-500 hover:none">
                    {qcategory.length ? qcategory : "All"}
                  </Badge>
                  <CaretDown size={22} className="text-gray-500 ms-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setPage(1);
                      setQCategory("");
                    }}
                  >
                    All
                  </DropdownMenuItem>
                  {categories &&
                    categories.map((category, i) => (
                      <DropdownMenuItem
                        key={i}
                        className="cursor-pointer"
                        onClick={() => {
                          setPage(1);
                          setQCategory(category.name);
                        }}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Search setPage={setPage} />
          </div>

          <div className="w-full flex justify-center mb-12">
            {isLoading ? (
              <LoadingRed style="mt-20" />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6 gap-4">
                {menus &&
                  menus.map((menu: MenuI, i) => <Card menu={menu} key={i} />)}
              </div>
            )}
          </div>
          {totalPage && totalPage > 1 && !isLoading && (
            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
          )}
        </div>
        <Modal />
      </section>
    </>
  );
};

export default Menu;
