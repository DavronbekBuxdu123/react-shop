import { useEffect, useState } from "react";
import { Request } from "../../helpers/Request";

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="hidden md:block overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-[#43a1fb] dark:bg-[#1E40AF]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Rasmi
              </th>
              <th scope="col" className="px-6 py-3">
                Foydalanuvchi
              </th>
              <th scope="col" className="px-6 py-3">
                Paroli
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Lavozimi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="p-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                    className="w-[60px] h-[60px] rounded-full mx-auto"
                    alt="User"
                  />
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {user.password}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4 mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                className="w-[50px] h-[50px] rounded-full"
                alt="User"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Parol:
                </strong>{" "}
                {user.password}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Lavozimi:
                </strong>{" "}
                {user.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
