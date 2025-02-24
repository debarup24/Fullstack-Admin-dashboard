import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { MdVerified } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { userData } = useContext(AppContext);

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        {userData ? (
          <div className="bg-black rounded-full w-14 h-14 shadow-md shadow-red-600 cursor-pointer flex justify-center items-center text-white text-2xl font-semibold relative group">
            {" "}
            {userData.name[0].toUpperCase()}{" "}
          </div>
        ) : (
          <FaUserCircle className="size-12 text-slate-300" />
        )}

        <div className="ml-3">
          <h3 className="text-lg flex font-semibold text-gray-100">
            {userData ? userData.name : "No user"}{" "}
            {userData.isAccountVerified && (
              <div className="flex flex-row">
                <MdVerified className="text-green-400 size-5 ml-2.5 mt-1" />
                <p className="mt-1.5 ml-2 text-xs text-slate-500">
                  verified{" "}
                </p>{" "}
              </div>
            )}{" "}
          </h3>
          <p className="text-gray-400 ">
            {userData ? userData.email : "email not found"}
          </p>
        </div>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SettingSection>
  );
};
export default Profile;
