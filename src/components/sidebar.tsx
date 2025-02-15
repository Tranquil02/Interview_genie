import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  LogOut,
  BarChart3,
  Mic,
  Calendar,
  BookOpen,
  Settings,
} from "lucide-react"; // Assuming you are using lucide-react for the icons
import { motion } from "framer-motion";
import supabase from "../utils/client";
import LogoIcon from "../svg/lamp.png";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
  { icon: Mic, label: "Practice", path: "/practice" },
  // { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: BookOpen, label: "Resources", path: "/commingSoon" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  // const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // Sign out from Supabase
      navigate("/signin"); // Redirect to Sign-in page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-16 md:w-64 h-screen bg-white dark:bg-gray-900 fixed left-0 top-0 border-r border-gray-200 dark:border-gray-800 z-40 flex flex-col justify-between">
      <div>
        <div className="flex items-center p-5 gap-2">
          <a href="/" className="hidden sm:block">
            <span className="text-lg font-bold truncate dark:text-white">
              InterviewGenie
            </span>
          </a>
          <a href="/">
            <img
              src={LogoIcon}
              alt="logo"
              className="h-12 w-12 sm:h-24 sm:w-24 md:h-16 md:w-16 lg:h-16 lg:w-16 object-contain"
            />
          </a>
        </div>

        {/* Menu items */}
        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center px-3 py-3 mb-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-600 dark:text-blue-300 p-2 rounded-lg"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span
                className={`ml-3 ${
                  location.pathname === item.path
                    ? "text-blue-600 dark:text-blue-300"
                    : ""
                } hidden md:block`}
              >
                {item.label}
              </span>

              {/* Tooltip for mobile */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-14 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-50 md:hidden"
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-2">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`group relative flex items-center w-full px-3 py-3 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 ${
            isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="p-2">
            {isLoggingOut ? (
              <div className="h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogOut className="h-5 w-5" />
            )}
          </div>
          <span className="ml-3 hidden md:block">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>

          {/* Tooltip for mobile */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute left-14 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-50 md:hidden"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </motion.div>
        </button>
      </div>
    </div>
  );
}
