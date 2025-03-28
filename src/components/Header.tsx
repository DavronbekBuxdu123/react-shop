import { FaShoppingCart } from "react-icons/fa";
import { IoMoonSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import Logo from "../images/Logo";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cart = () => {
    return JSON.parse(localStorage.getItem("cart")!)?.length || 0;
  };
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const location = useLocation();
  const myTheme = useContext(ThemeContext);
  console.log(userId);
  const DeleteUser = (userId: string) => {
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div className="min-h-[80px] w-full dark:bg-[#001e36] dark:text-white shadow-md border-[#43a1fb] dark:shadow-[0px_0px_1px_1px_rgb(255,255,255)]">
      <div className="container max-w-6xl mx-auto flex items-center justify-between p-4">
        <button
          className="lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={30} className="dark:text-white" />
        </button>
        <Link to={"/"}>
          <Logo />
        </Link>
        <ul className="hidden lg:flex items-center gap-x-8  mb-0">
          <Link className="no-underline  " to={"/menu"}>
            <li
              className={`text-lg hover:text-[#43a1fb] dark:text-white cursor-pointer ${
                location.pathname === "/menu"
                  ? "text-[#43a1fb]"
                  : "text-gray-900"
              }`}
            >
              Menyu
            </li>
          </Link>
          {userId && (
            <Link className="no-underline " to={"/cabinet"}>
              <li
                className={`text-lg hover:text-[#43a1fb] dark:text-white cursor-pointer ${
                  location.pathname === "/cabinet"
                    ? "text-[#43a1fb]"
                    : "text-gray-900"
                }`}
              >
                Profil
              </li>
            </Link>
          )}
          {userId && (
            <Link to={"/admin"} className="no-underline  ">
              <li className="text-lg hover:text-[#43a1fb] dark:text-white  cursor-pointer">
                Admin
              </li>
            </Link>
          )}
        </ul>
        <div className="flex items-center gap-x-6">
          <button onClick={myTheme!.toggleTheme}>
            {myTheme?.theme === "dark" ? (
              <MdSunny className="dark:text-white hover:bg-[#22486c] w-[30px] h-[30px] p-1 rounded-md" />
            ) : (
              <IoMoonSharp
                className="dark:text-white hover:bg-gray-200 rounded-md p-1"
                size={25}
              />
            )}
          </button>
          <Link className="text-dark" to={"/cart"}>
            <button className="flex p-2 relative">
              <FaShoppingCart
                className="dark:text-white hover:bg-gray-200 dark:hover:bg-[#22486c] w-[35px] h-[30px] p-1 rounded-md"
                size={20}
              />
              <div className="absolute p-2 text-white rounded-full top-1 right-1 text-xs flex items-center justify-center bg-[#43a1fb] w-[15px] h-[15px]">
                {cart()}
              </div>
            </button>
          </Link>
          {userId && (
            <button
              onClick={() => DeleteUser(userId)}
              className="hidden sm:block text-white bg-[#43a1fb] font-medium rounded-lg text-sm px-3 py-2 dark:bg-[#43a1fb] dark:hover:bg-[#1e70bf] hover:bg-[#1e70bf]"
            >
              Chiqish
            </button>
          )}
          {!userId && (
            <Link to={"/sign-up"}>
              <button className="border w-[100px] text-white bg-[#43a1fb] font-medium rounded-lg text-sm px-3 py-2 dark:bg-[#43a1fb] dark:hover:bg-[#1e70bf] hover:bg-[#1e70bf]">
                Kirish
              </button>
            </Link>
          )}
        </div>
      </div>
      {sidebarOpen && (
        <div
          className={`lg:hidden fixed top-0 left-0 w-50 h-full ${
            myTheme?.theme === "dark" ? "bg-[#001e36]" : "bg-white"
          }
              shadow-lg dark:shadow-[0px_0px_10px_2px_rgb(255,255,255)] z-50 p-4 transition-transform duration-300 ease-in-out transform translate-x-0`}
        >
          <button
            className="mb-4 text-lg  ml-[140px] text-dark dark:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
          <ul className="flex flex-col gap-y-6 text-lg dark:text-white">
            <Link className="no-underline" to={"/menu"}>
              <li className="hover:text-[#43a1fb] cursor-pointer">Menyu</li>
            </Link>
            {userId && (
              <Link className="no-underline" to={"/cabinet"}>
                <li className="hover:text-[#43a1fb] cursor-pointer">Profil</li>
              </Link>
            )}
            {userId && (
              <Link className="no-underline" to={"/admin"}>
                <li className="hover:text-[#43a1fb] cursor-pointer">Admin</li>
              </Link>
            )}
          </ul>
          {userId ? (
            <button
              onClick={() => DeleteUser(userId)}
              className="text-white bg-[#43a1fb] font-medium rounded-lg text-sm px-3 py-2 dark:bg-[#43a1fb] dark:hover:bg-[#1e70bf] hover:bg-[#1e70bf]"
            >
              Chiqish
            </button>
          ) : (
            <Link to={"/sign-up"}>
              <button className="border w-[100px] text-white bg-[#43a1fb] font-medium rounded-lg text-sm px-3 py-2 dark:bg-[#43a1fb] dark:hover:bg-[#1e70bf] hover:bg-[#1e70bf]">
                Kirish
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
