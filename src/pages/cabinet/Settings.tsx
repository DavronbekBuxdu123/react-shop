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
  const id = localStorage.getItem("id");
  const [user, setUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      GetUser(id);
    }
  }, [id]);

  const GetUser = async (id: string) => {
    try {
      const { data } = await Request(`/users/${id}`, "GET");
      setUser(data);
      setEditUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      setEditUser({ ...user });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editUser) {
      setEditUser({ ...editUser, [e.target.name]: e.target.value });
    }
  };

  const updateUser = async () => {
    if (editUser) {
      try {
        const { data } = await Request(
          `/users/${editUser.id}`,
          "PUT",
          editUser
        );
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-2">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <img
          className="w-full h-56 object-cover object-center"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />

        <div className="py-4 px-6 dark:bg-[#43a1fb]  ">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="py-2 text-lg ">{user?.id}</p>

          {editUser && (
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="password"
                name="password"
                value={editUser.password}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="role"
                value={editUser.role}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
          )}

          <button
            onClick={updateUser}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Yangilash
          </button>
        </div>
      </div>
    </div>
  );
}
