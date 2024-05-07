import { PencilSimpleLine } from "@phosphor-icons/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { OrderI } from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

const statusOrder = ["waiting payment", "processing", "in delivery", "success"];

const UpdateOrders = ({
  order,
  getAllOrders,
}: {
  order: OrderI;
  getAllOrders: () => void;
}) => {
  const [statusValue, setStatusValue] = useState(order.status);
  const { auth } = useAuth();

  const handleUpdate = async () => {
    if (order.status === statusValue) return;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/admin/orders/${order._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "Application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
        body: JSON.stringify({ status: statusValue }),
      }
    );

    if (res.ok) getAllOrders();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="px-2 py-1 bg-sky-500 text-white rounded-md">
        <PencilSimpleLine size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Orders</AlertDialogTitle>
          <div className="font-medium">ID: {order._id}</div>
          <Select onValueChange={(e) => setStatusValue(e)} value={statusValue}>
            <SelectTrigger className="w-full border-gray-500 border">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOrder.map((value, i) => (
                <SelectItem key={i} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateOrders;
