import { useEffect, useState } from "react";
import { Request } from "../../helpers/Request";
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};
export default function Settings() {
  useEffect(() => {
    GetUser(id);
  }, []);
  const id = localStorage.getItem("id");
  const [user, setUser] = useState([]);
  const GetUser = async (id) => {
    try {
      const { data } = await Request(`/users/${id}`, "GET");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <img
          className="w-full h-56 object-cover object-center"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />

        <div className="py-4 px-6 dark:bg-[#43a1fb] dark:text-white ">
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="py-2 text-lg ">{user.id}</p>
          <div className="flex items-center mt-4 ">
            <h1 className="px-2 text-sm">{user.email}</h1>
          </div>
          <div className="flex items-center mt-4 ">
            <h1 className="px-2 text-sm">{user.password}</h1>
          </div>
          <div className="flex items-center mt-4 ">
            <h1 className="px-2 text-sm">{user.role}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
