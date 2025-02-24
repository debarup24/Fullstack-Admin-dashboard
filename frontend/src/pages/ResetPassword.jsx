import React, { useContext, useState } from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);

  axios.defaults.withCredentials = true; //send with cookies

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState(0);
  const [loading, setLoading] = useState(false);

  //Store the OTP
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Delete the input number using backspace button on keyboard
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // OTP Paste : copy OTP from email, paste it in the input by "ctrl+v" & it should be filled in all 6 input places
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text"); // data added
    // split it (added Data)
    const pasteArray = paste.split("");

    // ** Now paste all the number one by one in the input field
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  //Email form (form-1) handler
  const onSubmitEmailForm = async (e) => {
    e.preventDefault();
    //toast.success("Redirecting.. ");

    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );

      data.success
        ? toast.success(data.message)
        : toast.error(data.message) && setLoading(false);

      data.success && setIsEmailSent(true) && setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // OTP form (form-2) handler
  const onSubmitOTPForm = async (e) => {
    e.preventDefault();
    // store the OTP in the otpArray
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join("")); // join this array & create a single string
    setIsOtpSubmitted(true);
  };

  // New password form (form-3) handler
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Reset Password" />

      <div className="max-w-xl mx-auto py-6 px-4 lg:px-8 ">
        <main className="max-w-xl mx-auto py-10 px-4 mt-7 lg:px-8 ">
          {/* Email form (1) */}

          {!isEmailSent && (
            <motion.div
              className="bg-slate-900 p-10 rounded-xl shadow-lg  shadow-blue-700 w-full sm:w-96 text-indigo-300 text-sm items-center "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-white text-2xl font-semibold text-center mb-4">
                Reset Password
              </h1>
              <p className="text-center mb-6 text-indigo-300">
                Enter your registered email address
              </p>

              <form onSubmit={onSubmitEmailForm}>
                <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                  <Mail size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className="bg-transparent outline-none text-white"
                    placeholder="Email"
                    required
                  />
                </div>

                {loading ? (
                  <button className="w-full py-2.5 bg-slate-800 rounded-full text-gray-400 text-base mt-3">
                    Redirecting ...
                  </button>
                ) : (
                  <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white text-base mt-3">
                    Submit
                  </button>
                )}
              </form>
            </motion.div>
          )}

          {/* Next Form (2) for adding passw reset OTP */}
          {!isOtpSubmitted && isEmailSent && (
            <motion.div
              className="bg-slate-900 p-10 rounded-xl shadow-lg  shadow-blue-700 w-full sm:w-96 text-indigo-300 text-sm items-center "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-white text-2xl font-semibold text-center mb-4">
                Password Reset OTP
              </h1>
              <p className="text-center mb-6 text-indigo-300">
                Enter the six digit code sent to your email.
              </p>

              <form onSubmit={onSubmitOTPForm}>
                <div
                  className="flex justify-between mb-8"
                  onPaste={handlePaste}
                >
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <input
                        type="text"
                        key={index}
                        className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                        ref={(e) => (inputRefs.current[index] = e)}
                        // move cursor to next automatically
                        onInput={(e) => handleInput(e, index)}
                        // backspace key
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        required
                        maxLength={1}
                      />
                    ))}
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white  text-base hover:font-semibold">
                  Submit
                </button>
              </form>
            </motion.div>
          )}

          {/* Enter New Password form (3) */}
          {isOtpSubmitted && isEmailSent && (
            <motion.div
              className="bg-slate-900 p-10 rounded-xl shadow-lg  shadow-blue-700 w-full sm:w-96 text-indigo-300 text-sm items-center "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-white text-2xl font-semibold text-center mb-4">
                New Password
              </h1>
              <p className="text-center mb-6 text-indigo-300">
                Enter the new password
              </p>

              <form onSubmit={onSubmitNewPassword}>
                <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                  <Lock size={18} />
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    name="password"
                    className="bg-transparent outline-none text-white"
                    placeholder="New Password"
                    required
                  />
                </div>

                <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white text-base mt-3">
                  Submit
                </button>
              </form>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResetPassword;
