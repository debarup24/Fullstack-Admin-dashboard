import React, { useContext, useState } from "react";
import Header from "../components/common/Header";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import NonAuthAlert from "../components/NonAuth/NonAuthAlert";
import { AppContext } from "../context/AppContext";

const userStats = {
  totalUsers: 252845,
  newUsersToday: 143,
  activeUsers: 33520,
  churnRate: "2.6%",
};

const UsersPage = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      {userData ? (
        <main className="max-w-7xl mx-auto mt-8 py-6 px-4 lg:px-8">
          {/* STATS */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Users"
              icon={UsersIcon}
              value={userStats.totalUsers.toLocaleString()}
              color="#6366F1"
            />
            <StatCard
              name="New Users Today"
              icon={UserPlus}
              value={userStats.newUsersToday}
              color="#10B981"
            />
            <StatCard
              name="Active Users"
              icon={UserCheck}
              value={userStats.activeUsers.toLocaleString()}
              color="#F59E0B"
            />
            <StatCard
              name="Churn Rate"
              icon={UserX}
              value={userStats.churnRate}
              color="#EF4444"
            />
          </motion.div>

          <UsersTable />

          {/* USER CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <UserGrowthChart />
            <UserActivityHeatmap />
            <UserDemographicsChart />
          </div>
        </main>
      ) : (
        <NonAuthAlert />
      )}
    </div>
  );
};

export default UsersPage;
