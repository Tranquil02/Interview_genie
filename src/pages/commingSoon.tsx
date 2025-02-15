import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface BalloonSVGProps {
  color: string;
}

function BalloonSVG({ color }: BalloonSVGProps) {
  return (
    <svg
      width="50"
      height="70"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 md:w-16 lg:w-20"
    >
      <path
        d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
        fill={color}
      />
      <path d="M30 60L35 80H25L30 60Z" fill={color} />
      <path
        d="M30 55C44.3594 55 56 43.3594 56 29C56 14.6406 44.3594 3 30 3C15.6406 3 4 14.6406 4 29C4 43.3594 15.6406 55 30 55Z"
        fill={`${color}dd`}
      />
    </svg>
  );
}

function Background() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute opacity-20"
          initial={{ x: -100 }}
          animate={{ x: ["100vw", "-20vw"] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: i * 3 }}
          style={{ top: `${15 + i * 15}%` }}
        >
          <div className="bg-white rounded-full w-14 h-14 md:w-20 md:h-20 blur-md" />
        </motion.div>
      ))}
    </>
  );
}

interface FloatingBalloonsProps {
  balloonColors: string[];
}

function FloatingBalloons({ balloonColors }: FloatingBalloonsProps) {
  return (
    <div className="absolute -top-20 left-0 right-0 flex justify-around">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="relative"
          animate={{ y: [0, -15, 0], x: [0, index % 2 === 0 ? 10 : -10, 0], rotate: [0, index % 2 === 0 ? 5 : -5, 0] }}
          transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <BalloonSVG color={balloonColors[index % balloonColors.length]} />
        </motion.div>
      ))}
    </div>
  );
}

export function ComingSoon() {
  const navigate = useNavigate();
  const balloonColors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#95E1D3", "#FF8B94"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-600 to-indigo-900 flex items-center justify-center overflow-hidden relative px-4">
      <Background />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative text-center px-4 sm:px-8">
          <motion.div
            className="bg-white/10 backdrop-blur-sm px-6 py-4 md:px-12 md:py-8 rounded-xl border border-white/20 shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Coming Soon
            </motion.h1>
          </motion.div>
          <FloatingBalloons balloonColors={balloonColors} />
          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 mx-auto drop-shadow max-w-lg md:max-w-2xl">
              Something amazing is in the works. We're crafting something special just for you.
            </p>
            <motion.button
              className="bg-white text-sky-900 px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
