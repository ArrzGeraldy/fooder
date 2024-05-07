/* eslint-disable react-hooks/exhaustive-deps */
import OrderStatus from "@/components/OrderStatus";
import DetailOrder from "@/components/admin/orders/DetailOrder";
import FilterOrder from "@/components/admin/orders/FilterOrder";
import UpdateOrders from "@/components/admin/orders/UpdateOrders";
import useAuth from "@/hooks/useAuth";
import { toRupiah } from "@/lib/utils";
import { OrderI } from "@/types";
import { useEffect, useState } from "react";

const AdminOrders = () => {
  const statusOrder = [
    "waiting payment",
    "processing",
    "in delivery",
    "success",
  ];
  const [orders, setOrders] = useState<OrderI[]>();
  const [sort, setSort] = useState(-1);
  const [qStatus, setQStatus] = useState("");
  const { auth } = useAuth();

  const getAllOrders = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/v1/admin/orders?sort=${sort}&status=${qStatus}`,
      {
        headers: {
          "Content-type": "Application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
      }
    );
    const json = await res.json();
    setOrders(json.data);
  };

  useEffect(() => {
    getAllOrders();
  }, [auth, sort, qStatus]);

  return (
    <section className="py-1 w-full  bg-blueGray-50">
      <FilterOrder
        statusOrder={statusOrder}
        qStatus={qStatus}
        setQStatus={setQStatus}
        setSort={setSort}
        sort={sort}
      />
      <div className="w-full  mb-12  mx-auto mt-4 ">
        <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border border-gray-300">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Orders
                </h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto border border-gray-300">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    id
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Total
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders &&
                  orders.map((order, i) => (
                    <tr key={i}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {order._id}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {toRupiah(order.total)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <OrderStatus status={order.status} />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex gap-4 items-center">
                          <UpdateOrders
                            order={order}
                            getAllOrders={getAllOrders}
                          />
                          <DetailOrder order={order} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrders;
