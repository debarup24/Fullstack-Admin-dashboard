import React from "react";
import Header from "../components/common/Header";
import VendorsDetails from "../components/vendors/VendorsDetails";

const VendorsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Vendors" />

      <main className="max-w-7xl mx-auto py-6 px-4 mt-8 lg:px-8">
        <VendorsDetails />
      </main>
    </div>
  );
};

export default VendorsPage;
