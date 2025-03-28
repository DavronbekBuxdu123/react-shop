import { useEffect, useState } from "react";
import { Request } from "../../helpers/Request";
import { FaUser } from "react-icons/fa";
type Users = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};
export default function Users() {
  const [users, setUsers] = useState<Users[]>([]);
  useEffect(() => {
    GetUsers();
  }, []);
  const GetUsers = async () => {
    try {
      const { data } = await Request("/users", "GET");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container text-white justify-around gap-3 p-6 mt-[80px] flex flex-wrap">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-white uppercase  dark:bg-[#43a1fb] bg-[#43a1fb]  ">
            <tr>
              <th scope="col" className="px-16 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                password
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((use) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 dark:bg-[#43a1fb] dark:text-white">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                    className="w-[120px] h-[120px] dark:bg-[#43a1fb]"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:bg-[#43a1fb] dark:text-white ">
                  {use.name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:bg-[#43a1fb] dark:text-white">
                  {use.password}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:bg-[#43a1fb] dark:text-white ">
                  {use.email}
                </td>
                <td className="px-6 py-4 text-gray-900 font-semibold dark:bg-[#43a1fb] dark:text-white">
                  {use.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
