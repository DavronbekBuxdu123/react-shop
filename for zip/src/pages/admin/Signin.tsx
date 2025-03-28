import { useRef } from "react";
import { Request } from "../../helpers/Request";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const login = async () => {
    try {
      if (!emailRef.current.value) {
        alert("Email kiriting");
      }
      const { data } = await Request(
        `/users?email=` + emailRef.current?.value,
        "GET"
      );
      console.log(data, data[0].role);
      if (data.length === 0) {
        alert("Siz ruyxatdan o'tmagansiz");
      }
      if (data[0].password !== passwordRef.current?.value) {
        alert("Parol notogri");
      }
      if (data[0].id === localStorage.getItem("id")) {
        alert("Siz tizimga kirgansiz");
        navigate("/");
      }
      if (data[0].role === "ADMIN") {
        navigate("/admin");
        localStorage.setItem("id", data[0].id);
      }
      if (data[0].role === "USER") {
        navigate("/");
        localStorage.setItem("id", data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark:bg-[#001e36] p-10 text-white min-h-screen">
      <div className="flex  justify-center   ">
        <div className="max-w-[400px] w-full p-4 rounded-md space-y-4 border mx-auto  ">
          <div className="w-full h-[35px] bg-[#43a1fb] rounded-md  text-center text-white ">
            <h4>Sign-in</h4>
          </div>
          <div className="space-y-4">
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
          </div>
          <button
            onClick={login}
            className="w-full bg-[#43a1fb] rounded-md text-white h-[35px]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
