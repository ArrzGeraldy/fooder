import { toRupiah } from "@/lib/utils";
import { AuthI, OrderI, OrderItemI } from "@/types";
import { useEffect } from "react";

interface PaymentI {
  id: string | undefined;
  auth: AuthI | undefined;
  order: OrderI | undefined;
  orderItems: OrderItemI[];
}

const Payment = ({ auth, id, order, orderItems }: PaymentI) => {
  const handlePay = async () => {
    window.snap.pay(order?.snap_token, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: async (result: any) => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/v1/orders/payment`, {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
            authorization: `Bearer ${auth?.accessToken}`,
          },
          body: JSON.stringify({ result }),
        });
      },
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";

    script.setAttribute("data-client-key", `${import.meta.env.VITE_MT_CLIENT}`);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-[90%] lg:w-1/2 max-w-lg text-sm border border-gray-200 mt-6 rounded-md">
      <h1 className="text-3xl text-white font-semibold bg-accent_alt text-center py-6 rounded-t-lg">
        Food'er
      </h1>
      <div className="bg-white shadow-md rounded-lg px-4 lg:px-8 mt-4">
        <div className="">
          <h4 className="font-semibold">Invoice</h4>
          <div>
            <div>
              Order Id: <span>#{id}</span>
            </div>
            <div className="mt-1">
              Status:{" "}
              <span className="text-yellow-700 bg-yellow-300 px-2 py-1 rounded-lg text-xs font-semibold">
                {order?.status}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 ">
          <div className=" py-4 border-t border-gray-300">
            <h4 className="font-semibold">Bill to: </h4>
            <div className="flex flex-col text-sm">
              <span>
                {order?.delivery_address.name}, {order?.delivery_address.phone}
              </span>
              <span>
                {order?.delivery_address.province},{" "}
                {order?.delivery_address.city}
              </span>
              <span>{order?.delivery_address.detail}</span>
            </div>
          </div>
          <div className="py-4 border-t border-gray-300">
            <h4 className="font-semibold">Order items: </h4>
            <div className="flex flex-col text-sm">
              {orderItems.map((item, i) => (
                <div className="flex justify-between" key={i}>
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>{toRupiah(item.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Tax fee:</span>
                <span>{toRupiah(order?.delivery_fee || 0)}</span>
              </div>

              <div className="flex justify-between font-semibold mt-2 text-base">
                <span>Total</span>
                <span>{toRupiah(order?.total || 0)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end py-4 border-t border-gray-300">
          {order?.status !== "waiting payment" ? (
            <div className="bg-green-200 text-green-700 font-bold px-6 py-2 rounded-xl">
              Success
            </div>
          ) : (
            <button
              className="bg-accent_alt text-white font-semibold px-6 py-2"
              onClick={handlePay}
            >
              Pay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
