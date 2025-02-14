import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, Brain } from "lucide-react";
import confetti from "canvas-confetti";
import supabase from "../utils/client";
import Swal from "sweetalert2";

const fireCelebration = () => {
  const count = 200;
  const defaults = { origin: { y: 0.7 }, zIndex: 1000 };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.2 } });
  fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.8 } });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, origin: { x: 0.5 } });
  fire(0.15, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    origin: { x: 0.5 },
  });
};

const Feedback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract state from navigation
  const responses = location.state?.responses || [];
  const startTime = location.state?.startTime;
  const questions = location.state?.questions || [];
  const questionId = location.state?.questionId || "";
  const endTime = location.state?.endTime;

  // State Management
  const [isGenerating, setIsGenerating] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Refs for Feedback Storage
  const feedbackRef = useRef<{ [key: number]: string }>({});
  const exampleRef = useRef<{ [key: number]: string }>({});
  const scoreRef = useRef<number>(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const hasPlayedAnimation = useRef(false);

  useEffect(() => {
    const fetchFeedbackFromBackend = async () => {
      if (!questionId) {
        console.error("Question ID is missing!");
        generateInitialFeedback();
        return;
      }

      try {
        setIsGenerating(true);
        const { data, error } = await supabase
          .from("mock_interview")
          .select("*")
          .eq("id", questionId)
          .single(); // Expect a single row

        if (error) throw error;
        setIsGenerating(false);

        if (data) {
          // console.log(data.overall_score);
          questions.forEach((_: any, index: any) => {
            feedbackRef.current[index] =
              data.feedback?.[index]?.feedback || "No feedback available";
            exampleRef.current[index] =
              data.feedback?.[index]?.example || "No example available";
          });
          scoreRef.current = data.overall_score;
          setTimeTaken(data.duration);
        } else {
          generateInitialFeedback();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: (error as Error).message,
        });
        generateInitialFeedback();
      }
    };

    const generateInitialFeedback = () => {
      questions.forEach((_: any, index: any) => {
        feedbackRef.current[index] = "No feedback available";
        exampleRef.current[index] = "No example available";
      });
      scoreRef.current = Math.floor(Math.random() * 30) + 70;
    };

    fetchFeedbackFromBackend();

    // const timer = setTimeout(() => {
    //   setIsGenerating(false);
    //   setShowContent(true);
    // }, 3000);

    // return () => clearTimeout(timer);
    setShowContent(true);
  }, [questionId, questions]);

  useEffect(() => {
    if (showContent && !hasPlayedAnimation.current) {
      hasPlayedAnimation.current = true;
      setTimeout(() => fireCelebration(), 500);
    }
  }, [showContent]);

  const handleSubmit = () => {
    navigate("/UserFeedback");
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Brain className="w-16 h-16 text-blue-600 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800">
            Analyzing Interview Responses
          </h2>
          <p className="text-gray-600">
            Our AI is generating personalized feedback...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-8 transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Interview Analysis
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600">
                  {scoreRef.current}
                </div>
                <div className="text-gray-600">Overall Score</div>
              </div>
              <div className="h-16 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600">
                  {questions.length}
                </div>
                <div className="text-gray-600">Questions Completed</div>
              </div>
              <div className="h-16 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600">
                  {timeTaken}
                </div>
                <div className="text-gray-600">Minutes</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`space-y-6 transition-all duration-500 ${
            showContent
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        >
          {questions.map((question: string, index: number) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Question {index + 1}: {question}
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 text-black">
                <strong>Response:</strong>{" "}
                {responses[index] || "No response available"}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  AI Feedback:
                </h4>
                <p className="text-blue-700">
                  {feedbackRef.current[index] || "No feedback available"}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-green-800 mb-2">Example:</h4>
                <p className="text-green-700">
                  {exampleRef.current[index] || "No example available"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-8 flex justify-center transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl"
          >
            Complete Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
