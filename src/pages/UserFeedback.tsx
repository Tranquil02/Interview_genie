import React, { useState } from "react";
import {
  Star,
  Send,
  Smile,
  MessageSquare,
  ThumbsUp,
  Heart,
  AlertCircle,
} from "lucide-react";
import { nav } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [interviewIssues, setInterviewIssues] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <div className="animate-fade-up bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full text-center">
          <Heart className="w-12 h-12 text-pink-500 mx-auto mb-3 animate-bounce-slow" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your feedback means the world to us!
          </p>
          <button
            type="submit"
            onClick={() => navigate("/dashboard")}
            className="w-full mt-5 bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-lg
                     hover:bg-indigo-700 dark:hover:bg-indigo-600 
                     transform hover:scale-[1.02] active:scale-95
                     transition-all duration-200 
                     flex items-center justify-center space-x-2 text-sm font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>Okay</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="animate-fade-up bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <MessageSquare className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3 transform transition-transform hover:scale-110 hover:rotate-6" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            We Value Your Feedback
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Help us improve our new website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              How would you rate your experience?
            </label>
            <div className="flex justify-start space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hover || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Your Suggestions <span className="text-red-500">*</span>
            </label>
            <textarea
              id="feedback"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                       focus:border-indigo-500 dark:focus:border-indigo-400 
                       resize-none text-sm"
              placeholder="Share your thoughts with us..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <label
                htmlFor="interviewIssues"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Interview Issues{" "}
                <span className="text-xs font-normal text-gray-500">
                  (optional)
                </span>
              </label>
            </div>
            <textarea
              id="interviewIssues"
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                       focus:border-indigo-500 dark:focus:border-indigo-400 
                       resize-none text-sm"
              placeholder="Any issues during the interview process?"
              value={interviewIssues}
              onChange={(e) => setInterviewIssues(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-lg
                     hover:bg-indigo-700 dark:hover:bg-indigo-600 
                     transform hover:scale-[1.02] active:scale-95
                     transition-all duration-200 
                     flex items-center justify-center space-x-2 text-sm font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Your feedback helps us improve
        </div>
      </div>
    </div>
  );
}

export default Feedback;
