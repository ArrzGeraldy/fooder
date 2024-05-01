import { CaretDown } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthI, CartItemsI } from "@/types";
import React from "react";

interface DropDownQtyI {
  cart: CartItemsI;
  auth: AuthI | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemsI[]>>;
}

const quantityValue = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

const DropDownQuantity = ({
  cart,
  auth,
  setIsLoading,
  setCartItems,
}: DropDownQtyI) => {
  const updateQuantity = async (
    productId: string,
    currQuantity: number,
    price: number,
    value: number
  ) => {
    if (value < 0 || value === currQuantity) return;
    setIsLoading(true);
    const newQuantity = value;
    const newAmount = price * newQuantity;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity,
          amount: newAmount,
        }),
      }
    );

    const json = await response.json();
    if (response.ok) {
      setCartItems(json.data);
    }
    console.log(json);

    setIsLoading(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-gray-400 w-16 text-start px-2 rounded">
        <div className="flex justify-between items-center">
          {cart.quantity} <CaretDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {quantityValue.map((quanitity) => (
          <DropdownMenuItem
            key={quanitity.value}
            onClick={() =>
              updateQuantity(
                cart.product._id,
                cart.quantity,
                cart.product.price,
                quanitity.value
              )
            }
          >
            {quanitity.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownQuantity;
