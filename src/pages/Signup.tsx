import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserRound,
  Lock,
  Mail,
  ArrowRight,
  Home,
  MailCheck,
} from "lucide-react";
import supabase from "../utils/client";
import LogoIcon from "../svg/lamp.png";
import Swal from "sweetalert2";
import { text } from "framer-motion/client";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      if (error) {
        Swal.fire({
          title: "Error!",
          text: (error as Error).message,
          icon: "error",
          confirmButtonText: "Okay",
        });
        console.error("Error signing up:", error);
        return;
      }
      setLoading(false);
      Swal.fire({
        title: "Check your email for the confirmation link",
        text: "Please verify your email address",
        icon: "info",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: (error as Error).message,
        icon: "error",
        confirmButtonText: "Okay",
      });
      console.error("Error signing up:", error);
    }
    navigate("/signin");
  };

  return (
    <>
      <Link
        to="/"
        className="absolute top-4 left-4 p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
      >
        <Home className="h-6 w-6" />
      </Link>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <img src={LogoIcon} alt="logo" className="h-20 w-20" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="mt-2 text-gray-600">
                Start your interview practice journey
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none dark:text-black"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-black dark:text-black"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-black dark:text-black"
                    required
                  />
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
                  loading
                    ? "bg-orange-400"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span>Creating Account</span>
                ) : (
                  <span>Create Account</span>
                )}
                {loading && <span className="ml-2 loader"></span>}
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
