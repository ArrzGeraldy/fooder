import useAuth from "@/hooks/useAuth";
import { cn, toRupiah } from "@/lib/utils";
import { CartItemsI, MainAddressesI } from "@/types";
import { useEffect, useState } from "react";
import CheckOut from "@/components/cart/CheckOut";
import DropDownQuantity from "@/components/cart/DropDownQuantity";
import ButtonDelete from "@/components/cart/ButtonDelete";
import CreateAddress from "@/components/cart/CreateAddress";
import { useNavigate } from "react-router-dom";
import { toastError, toastLoading } from "@/lib/toaster";
import toast, { Toaster } from "react-hot-toast";
const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemsI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<MainAddressesI[]>([]);
  const [selectaddress, setSelectAddress] = useState<MainAddressesI>();
  const [checkOutLoading, setCheckOutLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/cart`,
        {
          headers: {
            authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      const json = await response.json();

      setCartItems(json.data);
    };

    const fetchAddresses = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/addresses`,
        {
          headers: {
            authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      const json = await response.json();
      setAddresses(json.data);
    };

    fetchCartItems();
    fetchAddresses();
  }, [auth]);

  const handleCheckOut = async () => {
    if (!selectaddress) {
      toastError("Please select an address");
      return;
    }

    setCheckOutLoading(true);
    toastLoading();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/orders`,
      {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
        body: JSON.stringify({ items: cartItems, address: selectaddress }),
      }
    );

    const json = await response.json();
    toast.dismiss("loader");
    setCheckOutLoading(false);

    if (response.ok) {
      setCheckOutLoading(false);
      navigate(`/order/${json.data._id}`);
    }
  };

  return (
    <div className="">
      {/* modal loading */}
      <div
        className={cn(
          "modal-container flex items-center justify-center z-10",
          !isLoading && "hidden"
        )}
        hidden={!isLoading}
      >
        <div className="dots"></div>
      </div>
      {/* modal loading */}

      <div className="w-[90%] lg:w-[80%] mx-auto mb-24">
        <Toaster />
        <h1 className="text-2xl font-semibold py-4 ">Cart item</h1>
        <div className="flex flex-col lg:flex-row  gap-4">
          {/* cart item */}
          <section className="w-full pb-12">
            <div className="bg-white shadow-md flex flex-col px-4  py-4  md:pb-8 rounded-md border border-gray-300">
              <span className="font-semibold py-1 border-b border-gray-400">
                Cart item
              </span>
              {cartItems &&
                cartItems.map((cart) => (
                  <div
                    key={cart.product.name}
                    className="grid grid-cols-4 py-4 gap-4 content-center border-b border-gray-300"
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${
                        cart.product.image_url
                      }`}
                      className="md:max-w-32 justify-self-center"
                      alt="image cart"
                    />
                    <div className="flex flex-col justify-center justify-sel md:flex-row md:justify-between md:items-center gap-2 col-span-2 text-sm">
                      <div>
                        <h4 className="font-semibold  mb-2">
                          {cart.product.name}
                        </h4>
                        <h4 className="font-semibold">
                          {toRupiah(cart.amount)}
                        </h4>
                      </div>

                      <div className="flex items-center lg:justify-center  gap-2">
                        <DropDownQuantity
                          auth={auth}
                          cart={cart}
                          setCartItems={setCartItems}
                          setIsLoading={setIsLoading}
                        />
                        <span className="text-xs">
                          x {toRupiah(cart.product.price)}
                        </span>
                      </div>
                    </div>
                    <ButtonDelete
                      auth={auth}
                      productId={cart.product._id}
                      setCartItems={setCartItems}
                      setIsLoading={setIsLoading}
                    />
                  </div>
                ))}
            </div>
          </section>
          {/* cart item */}

          <aside className="w-full lg:w-[40%] pb-12 bg-white border px-4 py-4 border-gray-300 rounded-md shadow-md">
            <h4 className="font-semibold border-b border-gray-400 pb-1">
              Address
            </h4>
            <div>
              <div className="mt-4">
                <CreateAddress auth={auth} setAddresses={setAddresses} />
              </div>

              {addresses.map((address, i) => (
                <div
                  onClick={() => setSelectAddress(address)}
                  className={cn(
                    "flex flex-col gap-1 border cursor-pointer relative border-gray-400 px-4 py-2 rounded-md mt-4 text-sm",
                    address === selectaddress && "bg-accent_alt text-white"
                  )}
                  key={i}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{address.name}</p> |
                    <p className="text-xs">{address.phone}</p>
                  </div>

                  <div className="detail">
                    <p>{address.province}</p>
                    <p>{address.city}</p>
                    <p>{address.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      <CheckOut
        handleCheckOut={handleCheckOut}
        cartItems={cartItems}
        checkOutLoading={checkOutLoading}
      />
    </div>
  );
};

export default Cart;
