import React from 'react';
import { CheckCircle, Download } from 'lucide-react';

interface InterviewCompleteProps {
  responses: { [key: number]: string };
  questions: string[];
  onFeedback: () => void;
}

const InterviewComplete = () => {
  const questions: string[] = [];
  const responses: { [key: number]: string } = {};
  const onFeedback: () => void = () => {};

  const downloadResponses = () => {
    const content = questions.map((q, index) => (
      `Question: ${q}\nResponse: ${responses[index]}\n\n`
    )).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-responses.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Interview Complete!
            </h1>
            <p className="text-gray-600 text-lg">
              Great job! You've completed all the interview questions.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {questions.map((question, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:border-blue-200"
              >
                <p className="font-medium text-gray-800 mb-2">{question}</p>
                <p className="text-gray-600">{responses[index]}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadResponses}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Responses
            </button>
            <button
              onClick={onFeedback}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Provide Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewComplete;