import React, { useState } from "react";
import { Star, Send, Heart, AlertCircle, MessageSquare, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/client";

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
    try {
      const { data: user } = await supabase.auth.getUser();
      const { error } = await supabase.from("feedback_users").insert([
        { rating, feedback, interviewIssues, user_id: user?.user?.id },
      ]);
      if (error) throw error;
      setIsLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full text-center">
          <button onClick={() => navigate("/dashboard")} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
          <Heart className="w-12 h-12 text-pink-500 mx-auto mb-3 animate-bounce-slow" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Thank You!</h2>
          <p className="text-gray-600 dark:text-gray-300">Your feedback means the world to us!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full">
        <button onClick={() => navigate("/dashboard")} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-6">
          <MessageSquare className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">We Value Your Feedback</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Help us improve our new website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">How would you rate your experience?</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} onClick={() => setRating(star)}>
                  <Star className={`w-6 h-6 ${star <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Your Suggestions *</label>
            <textarea id="feedback" rows={3} className="w-full p-2 border rounded-lg text-sm" placeholder="Share your thoughts with us..." value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
          </div>

          <div className="p-3 border rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-4 h-4 text-gray-500" />
              <label htmlFor="interviewIssues" className="text-sm font-medium text-gray-700">Interview Issues (optional)</label>
            </div>
            <textarea id="interviewIssues" rows={2} className="w-full p-2 border rounded-lg text-sm" placeholder="Any issues during the interview process?" value={interviewIssues} onChange={(e) => setInterviewIssues(e.target.value)} />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
            {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <><Send className="w-4 h-4" /><span>Submit Feedback</span></>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
