import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRef, useState } from "react";
import { Request } from "../../helpers/Request";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordrepeatRef = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const navigate = useNavigate();
  const register = async () => {
    if (passwordRef.current?.value !== passwordrepeatRef.current?.value) {
      alert("Parolda xatolik bor");
    }
    const obj = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      role,
    };
    try {
      const { data: myData } = await Request(
        `/users?email=${emailRef.current?.value}`,
        "GET"
      );
      if (myData > 0) {
        alert("Oldin royxatdan utkansiz");
        navigate("/sign-in");
        return;
      }

      const { data } = await Request("/users", "POST", obj);
      if (data.role === "USER") {
        navigate("/");
      } else if (role === "ADMIN") {
        navigate("/admin");
      }
      localStorage.setItem("id", data.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dark:bg-[#001e36] p-10 text-white min-h-screen">
      <div className="flex mt-[100px] justify-center  ">
        <div className="max-w-[400px] w-full p-4 rounded-md space-y-4 border mx-auto  ">
          <div className="w-full h-[35px] bg-[#43a1fb] rounded-md  text-center text-white">
            <h4>Sign-Up</h4>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              className="form-control"
              placeholder="FullName..."
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
              placeholder="Password..."
            />
            <input
              ref={passwordrepeatRef}
              type="password"
              className="form-control"
              placeholder="Password Repeat..."
            />
            <div className="border w-full rounded-md flex items-start justify-between p-2">
              <button
                onClick={() => setRole("ADMIN")}
                className="flex border items-center gap-x-2 p-1 rounded-md "
              >
                <MdAdminPanelSettings className="size-7" />
                Admin
              </button>
              <button
                onClick={() => setRole("USER")}
                className="flex items-center gap-x-2 border rounded-md p-1"
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
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
