import LoadingRed from "@/components/LoadingRed";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { OrderI } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProfileOrder = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState<OrderI[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/orders`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      const json = await res.json();
      setOrders(json.data);
      setIsLoading(false);
    };

    getOrders();
  }, [auth]);

  return (
    <div className="mt-8 lg:mt-0 w-full">
      <h1 className="text-3xl font-semibold mb-2">Orders</h1>
      {isLoading ? (
        <div className="w-full mt-24 flex items-center justify-center">
          <LoadingRed style="" />
        </div>
      ) : (
        orders &&
        orders.map((order, i) => (
          <div
            key={i}
            className="bg-white mt-4 px-4 py-2.5 w-[90%] rounded-md drop-shadow-md  flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              <span className="font-semibold">#{i + 1}</span>
              <div className="flex gap-2 items-center">
                <span>{order._id}</span>
                <span
                  className={cn(
                    "text-xs rounded-md p-1.5",
                    order.status === "waiting payment"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-green-200 text-green-700"
                  )}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <Link
              to={`/order/${order._id}`}
              className="text-sky-500 underline hover:text-sky-600 transition-all"
            >
              detail
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileOrder;
