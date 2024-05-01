import { AuthI } from "@/types";
import { ReactNode, createContext, useState } from "react";

interface AuthContextValue {
  auth: AuthI | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthI | undefined>>;
}

export const AuthContext = createContext<AuthContextValue>({
  auth: undefined,
  setAuth: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthI | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
