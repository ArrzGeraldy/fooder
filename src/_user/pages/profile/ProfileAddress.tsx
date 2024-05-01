import CreateAddress from "@/components/cart/CreateAddress";
import useAddress from "@/hooks/useAddress";
import useAuth from "@/hooks/useAuth";
import { MainAddressesI } from "@/types";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const toastLoading = () => toast.loading("Loading...");

const ProfileAddress = () => {
  const { auth } = useAuth();
  const [addresses, setAddresses] = useState<MainAddressesI[]>([]);
  const { deleteAddress, error, isLoading } = useAddress();

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
  const handleDelete = async (id: string) => {
    await deleteAddress(auth?.accessToken, id);
    fetchAddresses();
  };

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    isLoading ? toastLoading() : toast.remove();
  }, [isLoading]);

  return (
    <div className="w-full">
      {error && (
        <div className="w-full px-3 py-4 bg-red-200 text-red-800 border border-red-500">
          Failed delete address
        </div>
      )}
      <Toaster />
      <div className="mb-4 mt-8 lg:mt-0">
        <CreateAddress auth={auth} setAddresses={setAddresses} />
      </div>
      <div className="px-4 py-6 bg- rounded-lg drop-shadow-md bg-white">
        <div className="font-semibold text-xl">Addresses</div>
        <div className="flex flex-col gap-2 mt-2">
          {addresses.map((address, i) => (
            <div
              key={i}
              className="flex justify-between text-sm py-2 border-b border-gray-400"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-semibold">{address.name}</span> |{" "}
                  {address.phone}
                </div>
                <div>
                  <p>{address.province}</p>
                  <p>{address.city}</p>
                  <p>{address.detail}</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="p-2 bg-sky-500 h-fit rounded-md text-white">
                  <PencilSimpleLine className="lg:text-xl text-sm" />
                </div>
                <button
                  disabled={isLoading}
                  onClick={() => handleDelete(address._id)}
                  className="p-2 bg-accent_alt h-fit rounded-md text-white"
                >
                  <Trash className="lg:text-xl text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileAddress;
