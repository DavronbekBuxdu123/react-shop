import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRef, useState } from "react";
import { Request } from "../../helpers/Request";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordrepeatRef = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const navigate = useNavigate();

  const register = async () => {
    const name = nameRef.current?.value?.trim();
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value;
    const passwordRepeat = passwordrepeatRef.current?.value;
    if (!name || !email || !password || !passwordRepeat) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Noto'g'ri email formati!");
      return;
    }
    if (password !== passwordRepeat) {
      alert("Parollar mos kelmadi!");
      return;
    }

    try {
      const { data: users } = await Request(`/users?email=${email}`, "GET");
      if (users.length > 0) {
        alert("Bu email bilan foydalanuvchi oldin ro‘yxatdan o'tgan!");
        navigate("/sign-in");
        return;
      }

      const { data } = await Request("/users", "POST", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("id", data.id);

      navigate(role === "ADMIN" ? "/admin" : "/");
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Server bilan bog‘liq muammo yuzaga keldi!");
    }
  };

  return (
    <div className="dark:bg-[#001e36] p-10 text-white min-h-screen">
      <div className="flex mt-[100px] justify-center">
        <div className="max-w-[400px] w-full p-4 rounded-md space-y-4 border mx-auto">
          <div className="w-full h-[40px] bg-[#43a1fb] rounded-md text-center text-white p-1">
            <h4>Ro'yxatdan o'tish</h4>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              className="form-control"
              placeholder="FISH..."
              ref={nameRef}
            />
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              placeholder="Email..."
            />
            <input
              ref={passwordRef}
              type="password"
              className="form-control"
              placeholder="Parol..."
            />
            <input
              ref={passwordrepeatRef}
              type="password"
              className="form-control"
              placeholder="Parolni takrorlang..."
            />
            <div className="w-full rounded-md flex items-start justify-between p-2">
              <button
                onClick={() => setRole("ADMIN")}
                className={`flex items-center gap-x-2 border rounded-md p-1 bg-[#43a1fb] ${
                  role === "ADMIN" ? "bg-green-500" : ""
                }`}
              >
                <MdAdminPanelSettings className="size-7" />
                Admin
              </button>
              <button
                onClick={() => setRole("USER")}
                className={`flex items-center gap-x-2 border rounded-md p-2 bg-[#43a1fb] ${
                  role === "USER" ? "bg-green-500" : ""
                }`}
              >
                <FaUser className="size-6" />
                User
              </button>
            </div>
          </div>
          <button
            onClick={register}
            className="w-full bg-[#43a1fb] rounded-md text-white h-[35px]"
          >
            Ro'yxatdan o'tish
          </button>
          <Link to={"/sign-in"}>
            <button className="w-full mt-3 bg-[#43a1fb] rounded-md text-white h-[35px]">
              Sign-in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
