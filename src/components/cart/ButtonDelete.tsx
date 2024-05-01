import { AuthI, CartItemsI } from "@/types";
import { Button } from "../ui/button";
import { Trash } from "@phosphor-icons/react";

interface DeleteButtonI {
  productId: string;
  auth: AuthI | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemsI[]>>;
}

const ButtonDelete = ({
  productId,
  auth,
  setIsLoading,
  setCartItems,
}: DeleteButtonI) => {
  const deleteItem = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      const json = await response.json();
      setCartItems(json.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <Button
      className="self-center justify-self-center bg-accent_alt w-fit hover:bg-accent_hover"
      onClick={deleteItem}
    >
      <Trash size={20} />
    </Button>
  );
};

export default ButtonDelete;
