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
import { useEffect } from "react";
import { Request } from "./helpers/Request";
import Signin from "./pages/admin/Signin";
import MoreDetails from "./pages/MoreDetails";
import Cart from "./pages/Cart";
import Users from "./pages/admin/users";
import Settings from "./pages/cabinet/Settings";

export default function App() {
  const location = useLocation();
  useEffect(() => {
    CheckUser();
  }, [location.pathname]);

  const navigate = useNavigate();
  const blockedPages = ["/admin", "/admin/categories", "/admin/products"];
  const CheckUser = async () => {
    if (blockedPages.includes(location.pathname)) {
      const id = localStorage.getItem("id");
      if (id === null) {
        navigate("/sign-up");
        return;
      }
      try {
        const { data } = await Request(`/users/${id}`, "GET");
        if (data.role !== "ADMIN") {
          navigate("/sign-in");
          return;
        }
      } catch (error) {
        console.log(error);
        navigate("/sign-in");
      }
    }
  };

  return (
    <div>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/:id" element={<MoreDetails />} />
          <Route path="/cabinet" element={<Cabinet />}>
            <Route
              path="/cabinet"
              element={<Navigate to={"/cabinet/wishlist"} />}
            />
            <Route path="/cabinet/wishlist" element={<Wishlist />} />
            <Route path="/cabinet/settings" element={<Settings />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route
              path="/admin"
              element={<Navigate to={"/admin/categories"} />}
            />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/adminproducts" element={<AdminProducts />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}
