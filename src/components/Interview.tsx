import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
import { useLocation, useNavigate } from "react-router-dom";
import { Mic, MicOff, Camera, CameraOff, Brain } from "lucide-react";
import Swal from "sweetalert2";


type SpeechRecognition =
  | typeof window.SpeechRecognition
  | typeof window.webkitSpeechRecognition;


const Interview = () => {
  const BackendUrl=import.meta.env.VITE_BACKEND_URL
  const location = useLocation();
  const questions = location.state?.questions || [];
  const questionId = location.state?.id || "";
  const started_at = location.state?.started_at || "";
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [currentResponse, setCurrentResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [webcamActive, setWebcamActive] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout>();
  const [isStart, setisStart] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      recognitionRef.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result) => (result as SpeechRecognitionResult)[0])
          .map((result) => result.transcript)
          .join("");

        setCurrentResponse(transcript);

        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }
        silenceTimeoutRef.current = setTimeout(() => {
          setResponses((prev) => {
            const newResponses = [...prev];
            newResponses[currentQuestionIndex] = transcript;
            return newResponses;
          });

          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setCurrentResponse("");
            recognitionRef.current?.stop();
            setIsListening(false);
          } else {
            setResponses((prev) => {
              const newResponses = [...prev];
              newResponses[currentQuestionIndex] = transcript;
              fetchResponse(newResponses, started_at).then(() => {
                navigate("/feedback", {
                  state: {
                    responses: newResponses,
                    questions,
                    questionId,
                  },
                });
              });
              return newResponses;
            });
          }
        }, 4000);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [currentQuestionIndex, navigate]);

  // console.log(responses, questionId);

  useEffect(() => {
    const enableWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setWebcamActive(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    enableWebcam();

    return () => {
      const tracks = videoRef.current?.srcObject as MediaStream;
      tracks?.getTracks().forEach((track) => track.stop());
    };
  }, []);
// console.log(started_at);
  const fetchResponse = async (responses: any, started_at: any) => {
    setIsGenerating(true);
    try {
      await fetch(
        `${BackendUrl}/api/interview_review/${questionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questions, responses, started_at }),
        }
      );
      setIsGenerating(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: (error as Error).message,
      });
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setCurrentResponse("");
    }
  };

  const toggleWebcam = async () => {
    if (webcamActive) {
      const tracks = videoRef.current?.srcObject as MediaStream;
      tracks?.getTracks().forEach((track) => track.stop());
      setWebcamActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setWebcamActive(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }
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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            AI Interview Assistant
          </h1>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Webcam Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  webcamActive ? "opacity-100" : "opacity-0"
                }`}
              />
              {!webcamActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-lg">Camera is off</p>
                </div>
              )}
              {isListening && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-sm">Recording...</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={toggleWebcam}
                disabled={true}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
              >
                {webcamActive ? (
                  <CameraOff className="w-5 h-5" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
                {webcamActive ? "Stop Camera" : "Start Camera"}
              </button>
              <button
                onClick={toggleListening}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  isListening
                    ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                } text-white`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
                {isListening ? "Stop Recording" : "Start Recording"}
              </button>
            </div>
          </div>

          {/* Question Section */}
          {!isStart ? (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Interview Tips
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Be confident and stay calm.</li>
                <li>Listen carefully to each question.</li>
                <li>Take a moment to think before you respond.</li>
                <li>Speak clearly and at a moderate pace.</li>
                <li>Provide specific examples to illustrate your points.</li>
              </ul>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                How to Use This Interface
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Ensure your microphone and camera are enabled.</li>
                <li>Click "Start Recording" to begin answering a question.</li>
                <li>
                  Your responses will be recorded and saved automatically.
                </li>
                <li>Click "Stop Recording" to pause the recording.</li>
                <li>Pause for 5 sec to move to the next question.</li>
              </ul>
              <button
                onClick={() => setisStart(true)}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300"
              >
                Start Interview
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-6">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / questions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-6">
                <p className="text-xl md:text-2xl font-medium text-gray-800">
                  {questions[currentQuestionIndex]}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {isListening ? "Current Response:" : "Your Response:"}
                </h3>
                <div className="p-4 bg-gray-50 rounded-xl min-h-[100px]">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {currentResponse ||
                      responses[currentQuestionIndex] ||
                      "No response recorded yet"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* {currentQuestionIndex > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowPreviousResponses(!showPreviousResponses)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ChevronRight
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      showPreviousResponses ? 'rotate-90' : ''
                    }`}
                  />
                  {showPreviousResponses ? 'Hide Previous Responses' : 'Show Previous Responses'}
                </button>

                <div
                  className={`mt-4 space-y-4 transition-all duration-300 ${
                    showPreviousResponses ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'
                  } overflow-hidden`}
                >
                  {questions.slice(0, currentQuestionIndex).map((question:any, index:any) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors"
                    >
                      <p className="font-medium text-gray-800 mb-2">{question}</p>
                      <p className="text-gray-600">{responses[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
};

export default Interview;
