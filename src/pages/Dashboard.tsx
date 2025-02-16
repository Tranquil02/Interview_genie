// import React from 'react';
import { motion } from "framer-motion";
// import { PremiumBanner } from '../components/PremiumBanner';
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Clock,
  Target,
  Award,
  TrendingUp,
  BookOpen,
  Users,
  Calendar,
  Star,
  Timer,
  PcCase,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../utils/client";
import { data } from "framer-motion/client";
import MySkeletonComponent from "../components/ui/skeleton";
import SkeletonLoader from "../components/ui/skeleton";
// import { useAuth } from '@clerk/clerk-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  interface Interview {
    id: string;
    interview_type: string;
    created_at: Date;
    duration: string;
    overall_score: number;
    feedback: string;
    company_applied: string;
    position_applied: string;
  }
  const [interviewCounts, setInterviewCounts] = useState<
    Record<string, number | null>
  >({
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: null,
    Fri: null,
    Sat: null,
    Sun: null,
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [scores, setScores] = useState<
    { interview_type: string; average_score: number }[]
  >([]);

  const [ProfileComplete, setProfileComplete] = useState(false);
  const [prevInterviews, setPrevInterview] = useState<Interview[]>([]);
  const [anotherInterviews, SetanotherInterviews] = useState<Interview[]>([]);
  const [totalPracticeHours, setTotalPracticeHours] = useState(0);
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchInterviewCounts = async () => {
    const { data, error } = await supabase.rpc("get_interview_counts");

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data;
  };

  const progressData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "Interviews",
        data: daysOfWeek.map((day) => interviewCounts[day]), // Uses null for missing days
        borderColor: "#4285F4",
        backgroundColor: "rgba(66, 133, 244, 0.5)",
        tension: 0.4, // Smooths the curve
      },
    ],
  };

  const performanceData = {
    labels: ["Technical Interview", "HR Interview", "Case Study Interview"],
    datasets: [
      {
        label: "Performance Score",
        data: scores.map((score: any) => score.average_score),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(147, 51, 234, 0.8)",
          "rgba(59, 130, 246, 0.6)",
          "rgba(147, 51, 234, 0.6)",
        ],
      },
    ],
  };

  const stats = [
    {
      icon: Clock,
      label: "Practice Hours",
      value: totalPracticeHours,
      change: "+2.5",
    },
    {
      icon: Target,
      label: "Interviews Completed",
      value: totalInterviews,
      change: "+3",
    },
    { icon: Award, label: "Success Rate", value: successRate, change: "+5%" },
  ];

  const upcomingInterviews = [
    { title: "Technical Interview", time: "10:00 AM", type: "Mock Interview" },
    { title: "System Design", time: "2:00 PM", type: "Practice Session" },
  ];

  // console.log(scores);
  useEffect(() => {
    const fetchPreviousInterviews = async () => {
      setLoading(true);
      try {
        // Get logged-in user
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError || !user?.user?.id) {
          console.error("Error fetching user:", userError);
          return;
        }

        // Fetching Profile to check if it's complete
        const { data: profiles, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.user.id);

        const profile = profiles?.[0]; // Get the first (and only) profile

        // Check if any value is null or empty
        const isProfileComplete = profile
          ? Object.values(profile).every(
              (value) => value !== null && value !== ""
            )
          : false; // If no profile exists, it's incomplete

        setProfileComplete(isProfileComplete); // True only if all fields are filled

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return;
        }

        // Fetch previous interviews
        const { data, error } = await supabase
          .from("mock_interview")
          .select("*")
          .eq("user_id", user.user.id) // Ensure filtering by logged-in user
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching previous interviews:", error);
          return;
        }

        const data_length = data.length;
        // Set state with only the latest 4 interviews
        setPrevInterview(data.slice(0,data_length/2 ));

        //Setting another interview
        SetanotherInterviews(data.slice((data_length/2), data_length));

        // Calculate total practice hours
        const totalMinutes = data.reduce(
          (sum, interview) => sum + (interview.duration || 0),
          0
        );
        setTotalPracticeHours(parseFloat((totalMinutes / 60).toFixed(2)));

        // Set total interviews count
        setTotalInterviews(data.length);

        // Calculate success rate (avoid divide by zero error)
        if (data.length > 0) {
          const totalScore = data.reduce(
            (sum, interview) => sum + (interview.overall_score || 0),
            0
          );
          setSuccessRate(Math.round(totalScore / data.length));
        } else {
          setSuccessRate(0);
        }

        // Calculate average scores by interview type
        const scoreMap: Record<string, { total: number; count: number }> = {};

        data.forEach(({ interview_type, overall_score }) => {
          if (!scoreMap[interview_type]) {
            scoreMap[interview_type] = { total: 0, count: 0 };
          }
          scoreMap[interview_type].total += overall_score || 0;
          scoreMap[interview_type].count += 1;
        });

        // Compute final averages
        const averageScores: Record<string, number> = {};
        Object.keys(scoreMap).forEach((type) => {
          averageScores[type] = parseFloat(
            (scoreMap[type].total / scoreMap[type].count).toFixed(2)
          );
        });

        const scoresArray = Object.keys(averageScores).map((type) => ({
          interview_type: type,
          average_score: averageScores[type],
        }));
        // Set the state for scores per interview type
        setScores(scoresArray);

        // Count interviews by day
        if (!data || data.length === 0) return;

        const interviewCountByDay: Record<string, number | null> = {
          Mon: null,
          Tue: null,
          Wed: null,
          Thu: null,
          Fri: null,
          Sat: null,
          Sun: null,
        };

        data.forEach(({ created_at }) => {
          if (!created_at) return;

          const date = new Date(created_at);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });

          if (interviewCountByDay[dayName] === null) {
            interviewCountByDay[dayName] = 1;
          } else {
            interviewCountByDay[dayName]! += 1;
          }
        });

        setInterviewCounts(interviewCountByDay);
      } finally {
        setLoading(false); // Ensure loading is turned off after fetching
      }
    };
    // console.log(scores);

    // Execute all async functions
    fetchPreviousInterviews();
    fetchInterviewCounts().then(setInterviewCounts);
  }, []);

  // console.log(prevInterviews);s
  interface Resource {
    title: string;
    type: string;
    duration: string;
    lastAccessed: string;
    progress: number;
    author: string;
  }

  const recentResources: Resource[] = [];

  if (loading) {
    return <SkeletonLoader/>;
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {!ProfileComplete && (
        <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 shadow-md p-4 rounded-lg">
          <AlertCircle className="text-yellow-500 w-6 h-6 mr-3 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-yellow-700">
              Complete Your Profile!
            </h2>
            <p className="text-yellow-600 text-sm mt-1">
              To get more <b>personalized interview questions</b>, make sure
              your profile is <b>fully updated</b> with your skills, experience,
              and education details.
            </p>
            <a
              href="/settings"
              className="mt-2 inline-block text-sm font-semibold text-yellow-800 hover:text-yellow-900 underline"
            >
              Update Profile →
            </a>
          </div>
        </div>
      )}
      {/* <PremiumBanner /> */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
                <div className="text-2xl font-bold dark:text-white">
                  {stat.value}
                </div>
              </div>
              {/* <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                {stat.change}
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Weekly Progress
          </h3>
          <Line
            data={progressData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grace: "10%",
                  grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </motion.div>

        {/* Performance in each type*/}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Performance Overview
          </h3>
          <Bar
            data={performanceData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </motion.div>
      </div>

      {/* Interview History and Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Previous Interviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold dark:text-white">
              Previous Interviews
            </h3>
            <PcCase className="h-5 w-5 text-blue-600" />
          </div>
          {prevInterviews && prevInterviews.length > 0 ? (
            prevInterviews.map((interview) => (
              <>
                <div
                  key={interview.id}
                  className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium dark:text-white">
                        {interview.interview_type}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <Timer className="h-4 w-4" />
                        {interview.duration || "N/A"} min
                        <span className="text-gray-300 dark:text-gray-600">
                          {" "}
                          •{" "}
                        </span>
                        {interview.created_at
                          ? new Date(interview.created_at).toLocaleDateString()
                          : "No Date"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold dark:text-white">
                        {interview.overall_score !== null &&
                        interview.overall_score !== undefined
                          ? `${interview.overall_score}%`
                          : "No Score"}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    {interview.company_applied && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Company:{" "}
                        {interview.company_applied.charAt(0).toUpperCase() +
                          interview.company_applied.slice(1).toLowerCase()}
                      </p>
                    )}
                    {interview.position_applied && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Position:{" "}
                        {interview.position_applied.charAt(0).toUpperCase() +
                          interview.position_applied.slice(1).toLowerCase()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3"></div>
              </>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No previous interviews found.
            </p>
          )}
        </motion.div>

        {/* Recent Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          {/* <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold dark:text-white">
              Recent Resources
            </h3>
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div> */}
          {/* <div className="space-y-4">
            {recentResources.map((resource, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {resource.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                        {resource.type}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">
                        •
                      </span>
                      <span>{resource.duration}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {resource.lastAccessed}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {resource.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${resource.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  {resource.author}
                </div>
              </div>
            ))} 
          </div>*/}

          {/* This is Temporary fetching Another Previous Interview as we dont have any resources */}
          {anotherInterviews && anotherInterviews.length > 0 ? (
            anotherInterviews.map((interview) => (
              <>
                <div
                  key={interview.id}
                  className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium dark:text-white">
                        {interview.interview_type}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <Timer className="h-4 w-4" />
                        {interview.duration || "N/A"} min
                        <span className="text-gray-300 dark:text-gray-600">
                          {" "}
                          •{" "}
                        </span>
                        {interview.created_at
                          ? new Date(interview.created_at).toLocaleDateString()
                          : "No Date"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold dark:text-white">
                        {interview.overall_score !== null &&
                        interview.overall_score !== undefined
                          ? `${interview.overall_score}%`
                          : "No Score"}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    {interview.company_applied && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Company:{" "}
                        {interview.company_applied.charAt(0).toUpperCase() +
                          interview.company_applied.slice(1).toLowerCase()}
                      </p>
                    )}
                    {interview.position_applied && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Position:{" "}
                        {interview.position_applied.charAt(0).toUpperCase() +
                          interview.position_applied.slice(1).toLowerCase()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3"></div>
              </>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No more data to show. Keep practicing and keep learning!
              </p>
              <div className="mt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.replace("/practice")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md dark:bg-blue-500"
                >
                  Start Practice
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Upcoming Interviews */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold dark:text-white">
            Upcoming Interviews
          </h3>
          <Users className="h-5 w-5 text-blue-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingInterviews.map((interview, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div>
                <h4 className="font-medium dark:text-white">
                  {interview.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {interview.time}
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full">
                {interview.type}
              </span>
            </div>
          ))}
        </div> 
      </motion.div>*/}
    </div>
  );
}
