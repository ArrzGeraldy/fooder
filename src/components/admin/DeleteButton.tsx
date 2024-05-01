import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

const toastLoading = () => toast.loading("Loading...", { id: "loader" });

interface DeleteButtonPropsI {
  id: string;
  fetchData: () => void;
  token: string | undefined;
  endPoint: string;
}

const DeleteButton = ({
  id,
  fetchData,
  token,
  endPoint,
}: DeleteButtonPropsI) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/${endPoint}/${id}`,
      {
        method: "delete",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setIsLoading(false);
      fetchData();
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    isLoading ? toastLoading() : toast.dismiss("loader");
  }, [isLoading]);

  return (
    <button onClick={handleDelete} disabled={isLoading}>
      <Badge className="bg-red-500 cursor-pointer">Delete</Badge>
    </button>
  );
};

export default DeleteButton;
