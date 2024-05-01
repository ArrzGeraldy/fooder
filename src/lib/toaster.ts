import toast from "react-hot-toast";

export const toastLoading = () => toast.loading("Loading...", { id: "loader" });
export const toastSuccess = (message: string) => toast.success(message);
export const toastError = (message: string) => toast.error(message);
