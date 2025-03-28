import { FaShoppingCart } from "react-icons/fa";
import { IoMoonSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import Logo from "../images/Logo";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContent";
import { Link } from "react-router-dom";
import { Request } from "../helpers/Request";

export default function Header() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const { data } = await Request("cart", "GET");
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  const quantity = () => {
    return product.length;
  };
  const myTheme = useContext(ThemeContext);
  console.log(ThemeContext);
  return (
    <div className="min-h-[80px] dark:bg-[#001e36] dark:text-white shadow-md border-[#43a1fb] dark:shadow-[0px_0px_1px_1px_rgb(255,255,255)]">
      <div className="container max-w-6xl mx-auto flex items-center  justify-between p-4">
        <Logo />
        <ul className="flex items-center gap-x-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-20 mb-0">
          <Link className="no-underline text-dark dark:text-white" to={"/menu"}>
            <li className="text-lg sm:text-xl hover:text-[#43a1fb] cursor-pointer dark:text-white">
              Menu
            </li>
          </Link>
          <Link
            className="no-underline text-dark dark:text-white"
            to={"/cabinet"}
          >
            <li className="text-lg sm:text-xl dark:text-white hover:text-[#43a1fb] cursor-pointer">
              Cabinet
            </li>
          </Link>
          <Link
            to={"/admin"}
            className="no-underline text-dark dark:text-white"
          >
            <li className="text-lg sm:text-xl dark:text-white hover:text-[#43a1fb] cursor-pointer">
              Admin
            </li>
          </Link>
        </ul>
        <div className="flex items-center gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10">
          <button onClick={myTheme!.toggleTheme}>
            {myTheme?.theme === "dark" ? (
              <MdSunny className="dark:text-white hover:bg-[#22486c] w-[25px] sm:w-[30px] h-[25px] sm:h-[30px] p-1 rounded-md" />
            ) : (
              <IoMoonSharp
                className="dark:text-white hover:bg-gray-200 rounded-md p-1"
                size={25}
              />
            )}{" "}
          </button>
          <Link className="text-dark" to={"/cart"}>
            {" "}
            <button className="flex p-2 relative">
              <FaShoppingCart
                className="dark:text-white hover:bg-gray-200 dark:hover:bg-[#22486c] w-[30px] sm:w-[35px] h-[25px] sm:h-[30px] p-1 rounded-md"
                size={20}
              />
              <div className="absolute p-2 text-white rounded-full top-1 right-1 text-xs flex items-center justify-center bg-[#43a1fb] w-[12px] sm:w-[15px] h-[12px] sm:h-[15px]">
                {quantity()}
              </div>
            </button>
          </Link>
          <Link to={"/sign-in"}>
            <button
              type="button"
              className="text-white bg-[#43a1fb] font-medium rounded-lg text-sm px-2 py-1 sm:px-3 sm:py-2 dark:bg-[#43a1fb] dark:hover:bg-[#1e70bf] hover:bg-[#1e70bf]"
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
