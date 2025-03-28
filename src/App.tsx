import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContent";
import Menu from "./pages/Menu";
import Cabinet from "./pages/cabinet/Cabinet";
import Admin from "./pages/admin/Admin";
import Categories from "./pages/admin/categories/Categories";
import AdminProducts from "./pages/admin/products/AdminProducts";
import Wishlist from "./pages/cabinet/Wishlist";
import Register from "./pages/admin/Register";
import { useEffect, useState } from "react";
import { Request } from "./helpers/Request";
import Signin from "./pages/admin/Signin";
import MoreDetails from "./pages/MoreDetails";
import Cart from "./pages/Cart";
import Users from "./pages/admin/users";
import Settings from "./pages/cabinet/Settings";
import Orders from "./pages/admin/products/Orders";
import MyOrders from "./pages/cabinet/Myorders";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);
  const blockedPages = [
    "/admin",
    "/admin/categories",
    "/admin/adminproducts",
    "/admin/orders",
    "/admin/users",
  ];
  const blockedPages1 = [
    "/cabinet",
    "/cabinet/wishlist",
    "/cabinet/settings",
    "/cabinet/myorders",
  ];

  const CheckUser = async () => {
    const id = localStorage.getItem("id");
    if (!id) {
      if (
        blockedPages.includes(location.pathname) ||
        blockedPages1.includes(location.pathname)
      ) {
        toast.warning("Sizga bu sahifaga kirishga ruxsat yo'q");
        navigate("/sign-in");
      }
      return;
    }

    let role = localStorage.getItem("role") as UserRole;
    if (role) {
      setUserRole(role);
      return;
    }

    try {
      const { data } = await Request(`/users/${id}`, "GET");

      if (!data || !data.role) {
        navigate("/sign-in");
        return;
      }

      setUserRole(data.role);
      localStorage.setItem("role", data.role);

      if (blockedPages.includes(location.pathname) && data.role !== "ADMIN") {
        navigate("/sign-in");
      } else if (
        blockedPages1.includes(location.pathname) &&
        data.role !== "USER"
      ) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.error(error);
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    CheckUser();
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/:id" element={<MoreDetails />} />
        <Route path="/cabinet" element={<Cabinet />}>
          <Route index element={<Navigate to="/cabinet/wishlist" />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="settings" element={<Settings />} />
          <Route path="Myorders" element={<MyOrders />} />
        </Route>
        <Route
          path="/admin"
          element={
            userRole === "ADMIN" ? <Admin /> : <Navigate to="/sign-in" />
          }
        >
          <Route index element={<Navigate to="/admin/categories" />} />
          <Route path="categories" element={<Categories />} />
          <Route path="adminproducts" element={<AdminProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}
