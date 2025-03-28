import { Link, Outlet, useLocation } from "react-router-dom";

export default function Admin() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="min-h-screen flex dark:bg-[#001e36] ">
      <div className="w-1/4 border flex flex-col p-4 h-screen space-y-6">
        <Link className="no-underline" to={"/admin/categories"}>
          {" "}
          <div
            className={`${
              location.pathname === "/admin/categories"
                ? "bg-[#44df78]"
                : "bg-[#43a1fb]"
            } p-2 bg-[#43a1fb] text-white hover:bg-[#1e70bf] mt-20 rounded-lg flex items-center justify-center font-bold`}
          >
            Categories
          </div>
        </Link>
        <Link className="no-underline" to={"/admin/adminproducts"}>
          {" "}
          <div
            className={`${
              location.pathname === "/admin/adminproducts"
                ? "bg-[#44df78]"
                : "bg-[#43a1fb]"
            } p-2 bg-[#43a1fb] text-white hover:bg-[#1e70bf]  rounded-lg flex items-center justify-center font-bold`}
          >
            Products
          </div>
        </Link>
        <Link className="no-underline" to={"/admin/adminorders"}>
          {" "}
          <div className="p-2 bg-[#43a1fb] text-white hover:bg-[#1e70bf] rounded-lg flex items-center justify-center font-bold">
            Orders
          </div>
        </Link>
        <Link className="no-underline" to={"/admin/users"}>
          {" "}
          <div
            className={`${
              location.pathname === "/admin/users"
                ? "bg-[#44df78]"
                : "bg-[#43a1fb]"
            } p-2 bg-[#43a1fb] text-white hover:bg-[#1e70bf]  rounded-lg flex items-center justify-center font-bold`}
          >
            Users
          </div>
        </Link>
        <Link className="no-underline" to={"/"}>
          {" "}
          <div className="p-2 bg-[#43a1fb] text-white hover:bg-[#1e70bf] rounded-lg flex items-center justify-center font-bold">
            Home
          </div>
        </Link>
      </div>

      <div className="w-3/4 border ">
        <Outlet />
      </div>
    </div>
  );
}
