import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  ChevronsLeft,
  ChevronsRight,
  DollarSign,
  Handshake,
  Power,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUpDown,
  Users2,
} from "lucide-react";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
  { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
  { name: "Users", icon: Users2, color: "#EC4899", href: "/users" },
  { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  { name: "Vendors", icon: Handshake, color: "#e803fc", href: "/vendors" },
  {
    name: "Analytics",
    icon: TrendingUpDown,
    color: "#3B82F6",
    href: "/analytics",
  },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleMaxMinBtn = (e) => {
    e.preventDefault();
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-100 ease-in-out flex-shrink-0 shadow-black ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMaxMinBtn}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          {isSidebarOpen ? (
            <ChevronsLeft size={28} />
          ) : (
            <ChevronsRight size={28} />
          )}
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />

                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.1, delay: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>

        <AnimatePresence>
          {isSidebarOpen ? (
            <div className=" flex flex-row items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors gap-2 mb-1">
              <Power color="#EC4899" size={20} />{" "}
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <p className="text-sm font-medium p-1">Logout</p>{" "}
              </motion.span>
            </div>
          ) : (
            <div className=" flex flex-row items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-1">
              <Power color="#EC4899" size={20} />{" "}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
