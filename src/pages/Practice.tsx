import { motion } from "framer-motion";
import { Code, Users, Brain, Timer, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InterviewStart } from "../components/StartInterview";

const interviewTypes = [
  {
    id: 1,
    title: "Technical Interview",
    icon: Code,
    description: "Practice coding problems,or domain-specific questions",
    difficulty: "Intermediate",
    duration: "45 mins",
    rating: 4.8,
  },
  {
    id: 2,
    title: "HR Interview",
    icon: Users,
    description: "Focuses on behavioral and cultural fit in a company",
    difficulty: "All Levels",
    duration: "30 mins",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Case Study Interview",
    icon: Brain,
    description: "Common in consulting, candidates analyze business problems",
    difficulty: "Advanced",
    duration: "60 mins",
    rating: 4.7,
  },
];

export default function Practice() {
  const [interviewClicked, setInterviewClicked] = useState(false);
  const [interviewType, setInterviewType] = useState("");
  const navigate = useNavigate();
  const handleClick = (type: string) => () => {
    setInterviewClicked(true);
    setInterviewType(type);
  };

  return interviewClicked ? (
    <InterviewStart type={interviewType} />
  ) : (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
          Practice Interviews
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Choose your interview type and start practicing
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {interviewTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/10 rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <type.icon className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                <span className="text-xs md:text-sm font-medium">
                  {type.rating}
                </span>
              </div>
            </div>

            <h3 className="text-base md:text-xl font-semibold mb-2">
              {type.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4">
              {type.description}
            </p>

            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
              <div className="flex items-center gap-1">
                <Timer className="h-3 w-3 md:h-4 md:w-4" />
                {type.duration}
              </div>
              <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400 text-xs md:text-sm">
                {type.difficulty}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick(type.title)}
              className="w-full py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-xs md:text-sm font-medium hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-1 md:gap-2"
            >
              Start Interview
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Quick Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 md:mt-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl md:rounded-2xl p-4 md:p-8 text-white"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Quick Tips for Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <h3 className="text-sm md:text-base font-semibold mb-2">
                  Prepare Your Space
                </h3>
                <p className="text-xs md:text-sm text-blue-100">
                  Find a quiet location with good lighting and stable internet
                  connection
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <h3 className="text-sm md:text-base font-semibold mb-2">
                  Test Equipment
                </h3>
                <p className="text-xs md:text-sm text-blue-100">
                  Check your microphone and camera before starting the interview
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <h3 className="text-sm md:text-base font-semibold mb-2">
                  Stay Focused
                </h3>
                <p className="text-xs md:text-sm text-blue-100">
                  Maintain eye contact and speak clearly during the interview
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
