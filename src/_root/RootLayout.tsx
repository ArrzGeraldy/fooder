import { Outlet } from "react-router-dom";

import ModalProvider from "@/context/ModalProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <ModalProvider>
        <main className="w-full height-main flex flex-col">
          <div className="flex-grow bg-white">
            <Outlet />
          </div>
          <Footer />
        </main>
      </ModalProvider>
    </>
  );
};

export default RootLayout;
