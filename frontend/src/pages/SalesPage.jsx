import React, { useContext, useState } from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import StatCard from "../components/common/StatCard";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import DailySalesTrend from "../components/sales/DailySalesTrend";
import { ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const salesStats = {
  totalRevenue: "$1,234,567",
  averageOrderValue: "$78.90",
  conversionRate: "3.45%",
  salesGrowth: "12.3%",
};

const SalesPage = () => {
  const { userData, setIsLoggedin } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Sales" />

      {userData ? (
        <main className="max-w-7xl mx-auto py-6 px-4 mt-8 lg:px-8">
          {/* SALES STATS */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value={salesStats.totalRevenue}
              color="#6366F1"
            />

            <StatCard
              name="Avg. Order Value"
              icon={ShoppingCart}
              value={salesStats.averageOrderValue}
              color="#10B981"
            />
            <StatCard
              name="Conversion Rate"
              icon={TrendingUp}
              value={salesStats.conversionRate}
              color="#F59E0B"
            />
            <StatCard
              name="Sales Growth"
              icon={CreditCard}
              value={salesStats.salesGrowth}
              color="#EF4444"
            />
          </motion.div>

          <SalesOverviewChart />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <SalesByCategoryChart />
            <DailySalesTrend />
          </div>
        </main>
      ) : (
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
      )}
    </div>
  );
};

export default SalesPage;
