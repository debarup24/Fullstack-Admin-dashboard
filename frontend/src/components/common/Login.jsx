import { Lock, Mail, User } from "lucide-react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // with the '/auth/register' or '/auth/login' API we have to send cookies also, for that we have to make "withCredentials = true" for the api request :

      axios.defaults.withCredentials = true;

      if (state === "Sign Up Now") {
        // if true then hit the /register API
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(false);
          getUserData();
          navigate("/");
        } else {
          //alert (data.message)
          toast.error(data.message);
        }
      }
      // if state is not sign up then hit the /login API
      else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(false);
          getUserData();
          navigate("/");
        } else {
          //alert (data.message)
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-slate-900 p-10 rounded-xl shadow-lg  shadow-blue-700 w-full sm:w-96 text-indigo-300 text-sm items-center ">
      <h2 className="text-3xl font-semibold text-white text-center mb-3">
        {state === "Sign Up Now" ? "Create Account" : "Login"}{" "}
      </h2>
      <p className="text-center mb-6 text-sm">
        {state === "Sign Up Now"
          ? "Create Your Account"
          : "Login to your account!"}
      </p>

      <form onSubmit={onSubmitHandler}>
        {state === "Sign Up Now" && (
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <User size={18} />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-transparent outline-none"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <Mail size={18} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-transparent outline-none"
            type="email"
            placeholder="debarup24sarkar@gmail.com"
            required
          />
        </div>

        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <Lock size={18} />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-transparent outline-none"
            type="password"
            placeholder="Test#1234"
            required
          />
        </div>

        {state === "Login" && (
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer font-medium"
          >
            Forgot Password?
          </p>
        )}

        <button className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
          {state}
        </button>
      </form>

      {state === "Sign Up Now" ? (
        <p className="text-center mt-4 text-gray-400 text-sm">
          Already have an account? &nbsp;{" "}
          <span
            onClick={() => setState("Login")}
            className="text-blue-400 underline font-normal cursor-pointer text-base"
          >
            Login here
          </span>
        </p>
      ) : (
        <p className="text-center mt-4 text-gray-400 text-sm">
          Don't have an account? &nbsp;{" "}
          <span
            onClick={() => setState("Sign Up Now")}
            className="text-blue-400 underline cursor-pointer"
          >
            Sign Up here
          </span>
        </p>
      )}
    </div>
  );
};

export default Login;
