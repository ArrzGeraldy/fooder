import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CaretDown, SlidersHorizontal } from "@phosphor-icons/react";
import React from "react";

interface FilterOrderPropsI {
  statusOrder: string[];
  sort: number;
  setSort: React.Dispatch<React.SetStateAction<number>>;
  qStatus: string;
  setQStatus: React.Dispatch<React.SetStateAction<string>>;
}

const FilterOrder = ({
  statusOrder,
  sort,
  setSort,
  qStatus,
  setQStatus,
}: FilterOrderPropsI) => {
  const handleSort = (x: number) => {
    if (x === sort) return;
    setSort(x);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
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
            <p className="font-bold text-gray-600"> Status: </p>
            <Badge className="bg-secondary text-slate-500 hover:none">
              {qStatus.length ? qStatus : "All"}
            </Badge>
            <CaretDown size={22} className="text-gray-500 ms-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setQStatus("")}
            >
              All
            </DropdownMenuItem>
            {statusOrder.map((value, i) => (
              <DropdownMenuItem
                key={i}
                className="cursor-pointer"
                onClick={() => setQStatus(value)}
              >
                {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterOrder;
