import { motion } from 'framer-motion';
import { WifiOff, RefreshCw, Signal, Wifi } from 'lucide-react';

const NoInternetPage = () => {
  const tryReconnect = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 0.9, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute left-1/2 -translate-x-1/2 -top-16"
            >
              <Wifi className="w-32 h-32 text-blue-200" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="relative z-10"
            >
              <WifiOff className="w-32 h-32 text-blue-600 mx-auto" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
          >
            No Internet Connection
          </motion.h1>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex justify-center space-x-2 mb-8"
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ["20px", "40px", "20px"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 bg-blue-400 rounded-full"
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 mb-8"
          >
            Looks like you're offline. Check your connection and try again.
          </motion.p>

          <div className="space-y-4">
            <motion.button
              onClick={tryReconnect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-full inline-flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </motion.button>

            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex justify-center items-center space-x-2 mt-8 text-gray-500"
            >
              <Signal className="w-5 h-5" />
              <span>Checking connection...</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-gray-500"
        >
          Tip: Try checking your Wi-Fi settings or mobile data
        </motion.div>
      </div>
    </div>
  );
};

export default NoInternetPage;