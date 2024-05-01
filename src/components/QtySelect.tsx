import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toRupiah } from "@/lib/utils";
import { MenuI } from "@/types";
import { CaretDown } from "@phosphor-icons/react";

const quantityValue = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

interface QtySelectI {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  item: MenuI | undefined;
  amount: number;
}

const QtySelect = ({
  quantity,
  setQuantity,
  setAmount,
  amount,
  item,
}: QtySelectI) => {
  return (
    <div className="flex gap-2 items-center mt-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none text-sm rounded-md border border-gray-500 w-20 px-4 py-0.5 text-start ">
          <div className="flex justify-between items-center">
            <span>{quantity}</span>
            <CaretDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Quantity</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {quantityValue.map((value, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => {
                setQuantity(value.value);
                setAmount(item ? item.price * quantity : 0);
              }}
            >
              {value.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-sm">{`x ${toRupiah(amount || 0)}`}</span>
    </div>
  );
};

export default QtySelect;
