import { MenuI } from "@/types";
import { ReactNode, createContext, useState } from "react";

interface ModalContextValue {
  item: MenuI | undefined;
  setItem: React.Dispatch<React.SetStateAction<MenuI | undefined>>;
  modal: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

export const ModalContext = createContext<ModalContextValue>({
  item: undefined,
  setItem: () => {},
  modal: "",
  setModal: () => {},
  amount: 0,
  setAmount: () => 0,
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [item, setItem] = useState<MenuI | undefined>();
  const [modal, setModal] = useState<string>("hidden");
  const [amount, setAmount] = useState<number>(0);
  return (
    <ModalContext.Provider
      value={{ item, setItem, modal, setModal, amount, setAmount }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
