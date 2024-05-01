import { ModalContext } from "@/context/ModalProvider";
import { useContext } from "react";

const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
