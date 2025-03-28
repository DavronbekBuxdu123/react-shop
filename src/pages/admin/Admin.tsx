import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useState } from "react";

import { GrMenu } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { ThemeContext } from "../../context/ThemeContent";
export default function Admin() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const myTheme = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex dark:bg-[#001e36]">
      <button
        className="md:hidden p-2 mt-[35px]  bg-[#43a1fb] text-white ml-[-10px]  fixed top-4 left-4 rounded-lg z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <IoClose className="" size={24} />
        ) : (
          <GrMenu size={24} />
        )}
      </button>

      <div
        className={`fixed md:static 
        
        top-0 left-0 lg:w-1/4 h-full 
   border-r z-40 p-6 mt-12 lg:mt-[100px] shadow-lg 
  transform transition-transform duration-300 
  ${
    sidebarOpen
      ? `translate-x-0 ${
          myTheme?.theme === "dark" ? "bg-[#001e36] " : "bg-white"
        }`
      : "-translate-x-full"
  } md:translate-x-0`}
      >
        <Link className="no-underline" to={"/admin/categories"}>
          <div
            className={`p-3 mt-5  ${
              location.pathname === "/admin/categories"
                ? "bg-[#44df78]"
                : "bg-[#43a1fb]"
            } text-white hover:bg-[#1e70bf] rounded-lg flex items-center justify-center font-bold`}
          >
            Kategoriyalar
          </div>
        </Link>
        <Link className="no-underline " to={"/admin/adminproducts"}>
          <div
            className={`p-3 mt-8 ${
              location.pathname === "/admin/adminproducts"
                ? "bg-[#44df78]"
                : "bg-[#43a1fb]"
            } text-white hover:bg-[#1e70bf] rounded-lg flex items-center justify-center font-bold`}
          >
            Mahsulotlar
          </div>
        </Link>
        <Link className="no-underline" to={"/admin/orders"}>
          <div className="p-3 mt-8 bg-[#43a1fb] text-white hover:bg-[#1e70bf] rounded-lg flex items-center justify-center font-bold">
            Buyurtmalar
          </div>
        </Link>
        <Link className="no-underline" to={"/admin/users"}>
          <div
            className={`p-3 mt-8 ${
              location.pathname === "/admin/users"
                ? "bg-[#44df78]"
                : "bg-[#43a1fb]"
            } text-white hover:bg-[#1e70bf] rounded-lg flex items-center justify-center font-bold`}
          >
            Foydalanuvchilar
          </div>
        </Link>
        <Link className="no-underline" to={"/"}>
          <div className="p-3 mt-8 bg-[#43a1fb] text-white hover:bg-[#1e70bf] rounded-lg flex items-center justify-center font-bold">
            Asosiy sahifa
          </div>
        </Link>
      </div>

      <div className="w-full md:w-3/4 border p-4">
        <Outlet />
      </div>
    </div>
  );
}
