import useAuth from "@/hooks/useAuth";
import { OrderI, OrderItemI } from "@/types";
import { Eye } from "@phosphor-icons/react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import OrderStatus from "@/components/OrderStatus";
import { toRupiah } from "@/lib/utils";
import LoadingRed from "@/components/LoadingRed";

const DetailOrder = ({ order }: { order: OrderI }) => {
  const [orderItems, setOrderItems] = useState<OrderItemI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { auth } = useAuth();

  const getOrder = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/orders/${order._id}`,
      {
        headers: {
          "Content-Type": "Application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
      }
    );

    const json = await response.json();
    const result = json.data;

    //   setOrder(result.order);
    setOrderItems(result.orderItems);
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={getOrder}
        className="px-2 py-1 rounded-md bg-teal-500 text-white"
      >
        {" "}
        <Eye size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Detail Order</AlertDialogTitle>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <LoadingRed style="" />
            </div>
          ) : (
            <div className="text-sm ">
              <div className="flex flex-col gap-2 pb-4 border-b border-gray-500">
                <span className="font-medium">Email: {order.user?.email}</span>

                <OrderStatus status={order.status} />
              </div>
              <div className="pt-2 pb-4 border-b border-gray-500 flex flex-col gap-1">
                <span className="font-medium">
                  {order.delivery_address.name} | {order.delivery_address.phone}
                </span>
                <p>
                  {order.delivery_address.province},{" "}
                  {order.delivery_address.city}{" "}
                </p>
                <p>{order.delivery_address.detail}</p>
              </div>
              <div className="pt-2 pb-4 border-b border-gray-500 max-h-80 overflow-y-auto">
                <span className="font-semibold mb-1 block">Items</span>
                {orderItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between pe-2"
                  >
                    <div className="flex flex-col mb-2">
                      {item.product.name}
                      <span>
                        {toRupiah(item.product.price)} x {"("}
                        {item.quantity}
                        {")"}
                      </span>
                    </div>
                    <span className="font-medium">{toRupiah(item.amount)}</span>
                  </div>
                ))}
              </div>
              <div className="py-2 flex font-semibold justify-between items-center">
                <span>TOTAL:</span>
                <span>{toRupiah(order.total)}</span>
              </div>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-teal-600 hover:bg-teal-500 transition-all">
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DetailOrder;
