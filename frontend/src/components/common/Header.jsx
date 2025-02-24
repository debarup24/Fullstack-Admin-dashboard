import { User } from "lucide-react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Header = ({ title }) => {
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const sendVerificationOtp = async () => {
    toast.success("Please Wait...");
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-between bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-100">
          {title}
        </h1>
      </div>

      <div className="p-4 mr-10">
        <ul className="flex flex-row gap-8">
          <Link to={"/send-mail"}>
            <li className="cursor-pointer p-1 text-xs md:text-sm md:font-semibold lg:text-base hover:text-yellow-300">
              Send Mail
            </li>
          </Link>
          <Link to={"/ondemand-loading"}>
            <li className="cursor-pointer hover:text-yellow-300 p-1 text-xs md:text-sm lg:text-base md:font-semibold">
              Lazy Load
            </li>
          </Link>

          {userData ? (
            <div
              className="bg-black rounded-full w-9 h-9 shadow-md shadow-red-600 cursor-pointer flex justify-center items-center text-white text-lg font-semibold relative group"
              onClick={() => navigate("/settings")}
            >
              {" "}
              {userData.name[0].toUpperCase()}{" "}
              <div className="absolute hidden group-hover:block top-0 left-0 z-10 rounded pt-9 text-gray-100">
                <ul className=" list-none m-0 p-2 rounded-md bg-slate-700 text-sm">
                  {!userData.isAccountVerified && (
                    <li
                      onClick={sendVerificationOtp}
                      className="py-1 px-2 hover:bg-slate-800 cursor-pointer"
                    >
                      verify mail
                    </li>
                  )}
                  <li
                    onClick={logout}
                    className="py-1 px-2 pr-10 hover:bg-slate-800 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <li className="bg-slate-900 rounded-full p-0 md:p-1.5 cursor-pointer">
                {" "}
                <User className="text-amber-300 size-4 md:size-6" />{" "}
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;
