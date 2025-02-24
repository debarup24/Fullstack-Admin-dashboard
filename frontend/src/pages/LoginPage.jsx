import React, { useContext } from "react";
import Header from "../components/common/Header";
import Login from "../components/common/Login";

const LoginPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Login" />

      <div className="max-w-xl mx-auto py-6 px-4 lg:px-8 ">
        <main className="max-w-xl mx-auto py-10 px-4 mt-7 lg:px-8 ">
          <Login />
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
