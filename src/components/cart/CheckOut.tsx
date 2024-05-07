import { toRupiah } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CartItemsI } from "@/types";

const CheckOut = ({
  cartItems,
  handleCheckOut,
  checkOutLoading,
}: {
  cartItems: CartItemsI[];
  handleCheckOut: () => void;
  checkOutLoading: boolean;
}) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let amount = 0;
    cartItems.forEach((item) => {
      amount += item.amount;
    });

    setTotalAmount(amount);
  }, [cartItems]);
  return (
    <section className="w-full  bg-white fixed bottom-0 border-t border-gray-400">
      <div className="flex justify-between items-center w-[90%] md:w-[80%] mx-auto py-6">
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-lg md:text-xl">Total:</span>
          <span className="md:text-lg">{toRupiah(totalAmount)}</span>
        </div>
        <Button
          disabled={checkOutLoading}
          onClick={handleCheckOut}
          className="bg-accent_alt hover:bg-accent_hover rounded-none py-6"
        >
          Check out
        </Button>
      </div>
    </section>
  );
};

export default CheckOut;
