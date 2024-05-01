import { Route, Routes } from "react-router-dom";
import Home from "./_root/pages/Home";
import RootLayout from "./_root/RootLayout";
import Menu from "./_root/pages/Menu";
import AuthLayout from "./_auth/AuthLayout";
import SignIn from "./_auth/pages/SignIn";
import SignUp from "./_auth/pages/SignUp";
import RequireAuth from "./components/RequireAuth";
import Cart from "./_user/pages/Cart";
import PresistLogin from "./components/PresistLogin";
import Order from "./_user/pages/Order";
import Profile from "./_user/pages/profile/Profile";
import ProfileLayout from "./_user/ProfileLayout";
import ProfileAddress from "./_user/pages/profile/ProfileAddress";
import ProfileOrder from "./_user/pages/profile/ProfileOrder";
import RequireAdmin from "./components/RequireAdmin";
import AdminLayout from "./_admin/AdminLayout";
import Dashboard from "./_admin/pages/Dashboard";
import AdminProduct from "./_admin/pages/AdminProduct";
import AdminCategory from "./_admin/pages/AdminCategory";
import AdminTag from "./_admin/pages/AdminTag";
import CreateProduct from "./components/admin/product/CreateProduct";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route element={<PresistLogin />}>
        {/* _root */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/not-found" element={<NotFound />} />
        </Route>

        {/* require auth */}
        <Route element={<RequireAuth />}>
          <Route element={<RootLayout />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/order/:id" element={<Order />} />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/addresses" element={<ProfileAddress />} />
            <Route path="/profile/orders" element={<ProfileOrder />} />
          </Route>
        </Route>
        {/* require auth */}

        {/* admin */}
        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/product/create" element={<CreateProduct />} />
            <Route path="/admin/category" element={<AdminCategory />} />
            <Route path="/admin/tag" element={<AdminTag />} />
          </Route>
        </Route>
        {/* admin */}

        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
