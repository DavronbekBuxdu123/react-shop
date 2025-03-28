import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useState } from "react";

import Header from "../../components/Header";
import { GrMenu } from "react-icons/gr";
import { ThemeContext } from "../../context/ThemeContent";

export default function Cabinet() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const myTheme = useContext(ThemeContext);
  return (
    <div>
      <Header />
      <div className="p-2 flex dark:bg-[#001e36]  min-h-screen relative">
        <button
          className="md:hidden fixed top-4 left-4 mt-[85px] ml-1 bg-[#43a1fb] text-white p-2 rounded-md z-40"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <GrMenu size={24} />
        </button>

        <div
          className={`fixed inset-y-0 left-0  transform ${
            isSidebarOpen
              ? `translate-x-0 ${
                  myTheme?.theme === "dark" ? "bg-[#001e36] " : "bg-white"
                }`
              : "-translate-x-full"
          } md:translate-x-0 md:relative transition-transform duration-300 ease-in-out 
  w-64 z-40 max-h-screen p-4 md:flex md:flex-col md:w-1/4 `}
        >
          <button
            className="md:hidden text-white self-end p-2 ml-[180px]"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✖
          </button>
          <div className="flex flex-col items-center space-y-6">
            <Link className="w-full no-underline" to={"/cabinet/wishlist"}>
              <div
                className={`${
                  location.pathname === "/cabinet/wishlist"
                    ? "bg-[#44df78] "
                    : "bg-[#43a1fb]"
                } rounded-md flex items-center justify-center cursor-pointer p-3 w-full text-white`}
              >
                Sevimlilar
              </div>
            </Link>
            <Link className="w-full no-underline" to={"/cabinet/settings"}>
              <div
                className={`${
                  location.pathname === "/cabinet/settings"
                    ? "bg-[#44df78]"
                    : "bg-[#43a1fb]"
                } rounded-md flex items-center justify-center cursor-pointer p-3 w-full text-white`}
              >
                Sozlamalar
              </div>
            </Link>
            <Link className="w-full no-underline" to={"/cabinet/Myorders"}>
              <div
                className={`${
                  location.pathname === "/cabinet/Myorders"
                    ? "bg-[#44df78]"
                    : "bg-[#43a1fb]"
                } rounded-md flex items-center justify-center cursor-pointer p-3 w-full text-white`}
              >
                Mening buyurtmalarim
              </div>
            </Link>
            <Link
              className="rounded-md no-underline bg-[#43a1fb] flex items-center justify-center cursor-pointer p-3 w-full text-white"
              to={"/"}
            >
              <div>Asosiy sahifa</div>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-3/4 sm:border-none mt-2 lg:border-l p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
