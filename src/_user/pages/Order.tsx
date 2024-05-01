import { CreditCard } from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router-dom";
import Payment from "../../components/Payment";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { OrderI, OrderItemI } from "@/types";

const Order = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [order, setOrder] = useState<OrderI>();
  const [orderItems, setOrderItems] = useState<OrderItemI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/orders/${id}`,
        {
          headers: {
            "Content-Type": "Application/json",
            authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status !== 200) {
        navigate("/");
      }

      const json = await response.json();
      console.log(json);
      const result = json.data;

      setOrder(result.order);
      setOrderItems(result.orderItems);
      setIsLoading(false);
    };

    getOrder();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (auth?.user.email !== order?.user.email || !order) {
        return navigate("/");
      }
    }
  }, [isLoading]);

  return (
    <section className="w-full h-screen flex mt-12 flex-col items-center">
      {/* payment */}
      <Payment id={id} order={order} orderItems={orderItems} auth={auth} />

      {/* payment */}
    </section>
  );
};

export default Order;
