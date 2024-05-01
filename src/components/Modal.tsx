import useModal from "@/hooks/useModal";
import { cn, toRupiah } from "@/lib/utils";
import { Badge } from "./ui/badge";

import { X } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import QtySelect from "./QtySelect";
import { toastError, toastSuccess } from "@/lib/toaster";
import { Toaster } from "react-hot-toast";

const Modal = () => {
  const { modal, item, setModal, amount, setAmount } = useModal();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useAuth();

  const closeModal = () => {
    document.body.style.overflow = "auto";
    const modal = document.querySelector(".modal");
    setTimeout(() => {
      modal?.classList.toggle("modal-active");
    }, 0);
    setQuantity(1);
    setAmount(0);
    setModal("hidden");
  };

  const addToCart = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/cart`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${authContext?.auth?.accessToken}`,
        },
        body: JSON.stringify({ itemId: item?._id, quantity: quantity }),
      }
    );

    if (response.ok) {
      toastSuccess("Add to cart");
    } else {
      const json = await response.json();
      toastError(json.error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setAmount(item ? item.price * quantity : 0);
  }, [item, quantity, setAmount]);
  return (
    <div
      className={cn(
        "modal-container flex  justify-center items-center z-30",
        modal
      )}
    >
      <Toaster />
      <div className="modal   border shadow-md  relative  flex flex-col sm:flex-row gap-4 bg-white rounded-md w-11/12 lg:w-1/2 p-8 py-14 lg:py-10">
        <div
          className="absolute top-3 right-4 cursor-pointer"
          onClick={closeModal}
        >
          <X className="text-xl " />
        </div>
        <div className="flex border border-accent_alt rounded-md w-full justify-center">
          {item && (
            <img
              src={`${import.meta.env.VITE_API_URL}/${item?.image_url}`}
              alt=""
              className="px-4 w-52 object-contain"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl font-semibold">{item?.name}</h4>
          <div className="flex gap-2 items-center">
            {item?.tags.map((tag, i) => (
              <Badge className="bg-accent_alt text-white h-fit w-fit " key={i}>
                {tag.name}
              </Badge>
            ))}
          </div>
          <p className="font-semibold">{toRupiah(item?.price || 0)}</p>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            illum rem error commodi, tempore necessitatibus debitis hic
            cupiditate atque et maxime voluptas minus adipisci vitae.
          </p>
          <QtySelect
            amount={amount}
            item={item}
            quantity={quantity}
            setAmount={setAmount}
            setQuantity={setQuantity}
          />
          <Button
            onClick={addToCart}
            className="bg-accent_alt text-white font-semibold mt-2 hover:bg-accent_hover"
          >
            {isLoading ? "Loading..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
