import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";

export default function Cabinet() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      <Header />
      <div className="p-2 flex dark:bg-[#001e36] min-h-screen ">
        <div className="w-1/4 max-h-[500px] flex flex-col items-center  space-y-8 mt-[-30px]  p-4">
          <Link className="w-full no-underline" to={"/cabinet/wishlist"}>
            <div
              className={`${
                location.pathname === "/cabinet/wishlist"
                  ? "bg-[#44df78]"
                  : "bg-[#43a1fb]"
              } rounded-md bg-[#43a1fb] flex items-center justify-center cursor-pointer p-3 w-full mt-10 text-white`}
            >
              Wishlist
            </div>
          </Link>
          <Link className="w-full no-underline" to={"/cabinet/settings"}>
            <div
              className={`${
                location.pathname === "/cabinet/settings"
                  ? "bg-[#44df78]"
                  : "bg-[#43a1fb]"
              } rounded-md bg-[#43a1fb] flex items-center justify-center cursor-pointer p-3 w-full  text-white`}
            >
              Settings
            </div>
          </Link>
          <div
            className={`${
              location.pathname === "/cabinet/myorders"
                ? "bg-[#44df78]"
                : "bg-[#43a1fb]"
            } rounded-md bg-[#43a1fb] flex items-center justify-center cursor-pointer p-3 w-full mt-10 text-white`}
          >
            My Orders
          </div>
          <Link
            className="rounded-md no-underline bg-[#43a1fb] flex items-center justify-center cursor-pointer p-3 w-full mt-10 text-white"
            to={"/"}
          >
            <div className="">Home</div>
          </Link>
        </div>
        <div className="w-3/4 border-l  p-1  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
