import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface BalloonSVGProps {
  color: string;
}

function BalloonSVG({ color }: BalloonSVGProps) {
  return (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
      <path
        d="M20 20C24 16 36 16 40 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Background() {
  return (
    <>
      {/* Clouds */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute opacity-20"
          initial={{ x: -100 }}
          animate={{
            x: ["100vw", "-20vw"],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3,
          }}
          style={{
            top: `${15 + i * 15}%`,
          }}
        >
          <div className="bg-white rounded-full w-20 h-20 blur-md" />
        </motion.div>
      ))}

      {/* Stars in the background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute bg-white rounded-full w-1 h-1"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
}

interface FloatingBalloonsProps {
  balloonColors: string[];
}

function FloatingBalloons({ balloonColors }: FloatingBalloonsProps) {
  return (
    <div className="absolute -top-20 left-0 right-0">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${index * 20}%`,
            marginLeft: "-30px",
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, index % 2 === 0 ? 10 : -10, 0],
            rotate: [0, index % 2 === 0 ? 5 : -5, 0],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BalloonSVG color={balloonColors[index % balloonColors.length]} />
          {/* String connecting to banner */}
          <motion.div
            className="absolute w-0.5 bg-white/40 left-1/2 transform -translate-x-1/2"
            style={{
              height: "80px",
              top: "95%",
            }}
            animate={{
              scaleY: [1, 1.02, 1],
              rotate: [0, index % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function ComingSoon() {
  const navigate = useNavigate();
  const balloonColors = [
    "#FF6B6B", // red
    "#4ECDC4", // teal
    "#FFD93D", // yellow
    "#95E1D3", // mint
    "#FF8B94", // pink
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-600 to-indigo-900 flex items-center justify-center overflow-hidden relative">
      <Background />

      {/* Main content container */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Banner */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm px-12 py-8 rounded-xl border border-white/20 shadow-2xl"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white tracking-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Coming Soon
            </motion.h1>
          </motion.div>

          <FloatingBalloons balloonColors={balloonColors} />

          {/* Subtitle and button */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow">
              Something amazing is in the works. We're crafting something
              special just for you.
            </p>
            <motion.button
              className="bg-white text-sky-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Go to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
