import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

const OrderStatus = ({ status }: { status: string | undefined }) => {
  return (
    <Badge
      className={cn(
        " border w-fit font-semibold text-[0.825rem] py-1 bg-green-200 text-green-600 border-green-600",
        status === "waiting payment"
          ? "bg-yellow-200 text-yellow-600 border-yellow-600"
          : status === "processing"
          ? "bg-sky-200 text-sky-600 border-sky-600"
          : status === "in delivery" &&
            "bg-fuchsia-200 text-fuchsia-600 border-fuchsia-600"
      )}
    >
      {status}
    </Badge>
  );
};

export default OrderStatus;
