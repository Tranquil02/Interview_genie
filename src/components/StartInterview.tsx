import React, { useState } from "react";
import { AlertTriangle, Building, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import supabase from "../utils/client";
import { data } from "framer-motion/client";
import Swal from "sweetalert2";

interface InterviewDetails {
  company: string;
  role: string;
  acceptedTerms: boolean;
}
// const questions = [
//   "Tell me about yourself and your background.",
//   "What made you interested in this position?",
//   "Where do you see yourself in 5 years?",
//   "What are your greatest strengths and weaknesses?",
//   "Describe a challenging situation at work and how you handled it.",
// ];

export function InterviewStart(type: any) {
  var mySkills = "";
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails>({
    company: "",
    role: "",
    acceptedTerms: false,
  });

  // console.log(type.type);

  const handleStartInterview = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (type.type === "HR Interview") {
          mySkills = " ";
        } else {
          mySkills = profile.skills || "";
        }

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/generate-questions`,
          {
            user_id: profile.id,
            skills: mySkills,
            name: profile.full_name,
            experience: profile.experience_years || "fresher",
            questionType: type.type,
            company: interviewDetails.company,
            position: interviewDetails.role,
          }
        );

        const { data } = await supabase
          .from("mock_interview")
          .select("id, created_at")
          .eq("user_id", profile.id)
          .order("created_at", { ascending: false })
          .limit(1);

        setQuestions(response.data.questions);
        // console.log(data?.[0]?.created_at);
        navigate("/interview-start", {
          state: {
            questions: response.data.questions,
            id: data?.[0]?.id,
            started_at: data?.[0]?.created_at,
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer:(error as Error).message
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        {/* Warning Banner */}
        <div className="bg-amber-50 dark:bg-amber-900 border-l-4 border-amber-500 p-4 flex items-start space-x-3">
          <AlertTriangle className="text-amber-500 w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-200">
              Important Notice
            </h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Please review and accept our terms and conditions before
              proceeding.
            </p>
          </div>
        </div>

        {/* Interview Details Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="text-gray-500 dark:text-gray-300 w-5 h-5" />
              <div className="flex-1">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 p-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={interviewDetails.company}
                  onChange={(e) =>
                    setInterviewDetails({
                      ...interviewDetails,
                      company: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Enter company name"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Briefcase className="text-gray-500 dark:text-gray-300 w-5 h-5" />
              <div className="flex-1">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Position/Role
                </label>
                <input
                  type="text"
                  id="role"
                  value={interviewDetails.role}
                  onChange={(e) =>
                    setInterviewDetails({
                      ...interviewDetails,
                      role: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md p-3 border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                  placeholder="e.g., Frontend Developer, Product Manager"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Terms and Conditions
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The questions provided are for practice purposes only.
                  </li>
                  <li>
                    Your responses and data may be used to improve our service.
                  </li>
                  <li>
                    We do not guarantee the accuracy of company-specific
                    questions.
                  </li>
                  <li>
                    You agree to use this service responsibly and ethically.
                  </li>
                </ul>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={interviewDetails.acceptedTerms}
                  onChange={(e) =>
                    setInterviewDetails({
                      ...interviewDetails,
                      acceptedTerms: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  I have read and agree to the terms and conditions
                </label>
              </div>
            </div>
          </div>

          <button
            className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleStartInterview}
            disabled={
              !interviewDetails.company ||
              !interviewDetails.role ||
              !interviewDetails.acceptedTerms ||
              loading
            }
          >
            Continue to Interview
          </button>
        </div>
      </div>
    </div>
  );
}
