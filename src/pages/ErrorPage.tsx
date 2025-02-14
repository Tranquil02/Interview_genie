
import { motion } from 'framer-motion';
import { CloudOff, RefreshCw, Home, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                y: [0, -10, 0, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-purple-500 mb-4"
            >
              <CloudOff size={120} className="mx-auto" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -right-4 bg-pink-100 rounded-full p-3"
            >
              <RefreshCw className="w-8 h-8 text-pink-500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
        >
          Oops! Lost in Space
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-8"
        >
          Houston, we have a problem! The page you're looking for seems to have drifted into a black hole.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-8 py-3 rounded-full inline-flex items-center space-x-2 hover:bg-purple-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span onClick={() => navigate("/")}>Back to Home</span>
          </motion.button>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.div
              animate={{ 
                x: [0, 20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center text-gray-900"
            >
              {/* <span>Keep Exploring</span> */}
              <ArrowUp className="w-6 h-7 ml-2" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm text-gray-500"
        >
          Error Code: 404 | Page Not Found
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;