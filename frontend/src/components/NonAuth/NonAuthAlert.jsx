import React from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const NonAuthAlert = () => {
  const navigate = useNavigate();

  return (
    <div>
      <main className="max-w-xl mx-auto py-10 px-4 lg:px-8 ">
        {" "}
        <motion.div
          className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 md:p-12 lg:p-14 border border-red-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-auto">
            <ResponsiveContainer className="w-full h-auto">
              <div className="p-2 justify-center">
                <h1 className="mt-2 mb-3 font-semibold text-lg md:text-xl lg:text-xl">
                  Please Login to access this page !
                </h1>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 hover:bg-blue-800 p-3 my-5 rounded-lg text-sm md:text-base cursor-pointer hover:scale-110 transition-all duration-700"
                >
                  Login Now
                </button>
              </div>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NonAuthAlert;
