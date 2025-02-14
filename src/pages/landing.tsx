
import  { useEffect, useRef, useState } from 'react';
import { Users, Award, Brain, ChevronRight, PlayCircle, CheckCircle2, Sparkles, Target, Zap } from 'lucide-react';
import LogoIcon from '../svg/lamp.png';



function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-trigger, .scroll-trigger-left, .scroll-trigger-right, .scroll-trigger-scale');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function useCountAnimation(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return { count, ref: countRef };
}

function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const { count, ref } = useCountAnimation(value);
  
  return (
    <div className="bg-glass rounded-2xl p-6 text-center">
      <div ref={ref} className="text-4xl font-bold text-gradient mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-300">{label}</p>
    </div>
  );
}


function LandingPage() {
  useScrollAnimation();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const openLogin = () => setIsLoginOpen(true);

  // console.log(fetchuser());
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900">
      {/* <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> */}
      
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">InterviewGenie</span>
            <img src={LogoIcon} alt="InterviewGenie Logo" className="h-10" />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
          </div>
          {isSignedIn  ? (
            <a 
              href="/dashboard"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 ml-4 md:ml-0 rounded-full transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 text-center block md:inline-block"
            >
              Go to Dashboard
            </a>
          ) : (
            <a 
              href='/signin'
              // onClick={openLogin}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Get Started
            </a>
          )}
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in">
              Master Your Interviews with
              <span className="text-gradient"> AI</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in animate-delay-200">
              Practice with our AI-powered interview simulator and get real-time feedback to land your dream job.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 animate-fade-in animate-delay-300">
              <button 
                onClick={()=>{window.location.href='/dashboard'}}
                className="group bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg flex items-center space-x-2 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <span>Start Practicing Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
                <PlayCircle className="w-6 h-6 group-hover:text-indigo-400 transition-colors" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="scroll-trigger-left">
              <AnimatedStat value={95} label="Success Rate" suffix="%" />
            </div>
            <div className="scroll-trigger-scale">
              <AnimatedStat value={10000} label="Practice Sessions" suffix="+" />
            </div>
            <div className="scroll-trigger-right">
              <AnimatedStat value={50} label="Industries Covered" suffix="+" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="scroll-trigger-left bg-glass p-8 rounded-2xl transform hover:-translate-y-2 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
              <Brain className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Feedback</h3>
              <p className="text-gray-300">Get instant, detailed feedback on your responses, body language, and speaking pace.</p>
            </div>
            <div className="scroll-trigger bg-glass p-8 rounded-2xl transform hover:-translate-y-2 transition-all hover:shadow-lg hover:shadow-purple-500/10">
              <Users className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Industry Specific</h3>
              <p className="text-gray-300">Practice with questions tailored to your industry and experience level.</p>
            </div>
            <div className="scroll-trigger-right bg-glass p-8 rounded-2xl transform hover:-translate-y-2 transition-all hover:shadow-lg hover:shadow-pink-500/10">
              <Award className="w-12 h-12 text-pink-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Success Tracking</h3>
              <p className="text-gray-300">Monitor your progress and improvement over time with detailed analytics.</p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="scroll-trigger-left">
              <div className="relative">
                <div className="bg-glass rounded-2xl p-8 relative z-10">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white">1</div>
                  <Sparkles className="w-12 h-12 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">Choose Your Focus</h3>
                  <p className="text-gray-300">Select from various interview types and difficulty levels.</p>
                </div>
              </div>
            </div>
            <div className="scroll-trigger-scale">
              <div className="relative">
                <div className="bg-glass rounded-2xl p-8 relative z-10">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white">2</div>
                  <Target className="w-12 h-12 text-purple-400 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">Practice Interview</h3>
                  <p className="text-gray-300">Engage in realistic interview scenarios with AI interviewer.</p>
                </div>
              </div>
            </div>
            <div className="scroll-trigger-right">
              <div className="relative">
                <div className="bg-glass rounded-2xl p-8 relative z-10">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white">3</div>
                  <Zap className="w-12 h-12 text-pink-400 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">Get Feedback</h3>
                  <p className="text-gray-300">Receive detailed analysis and improvement suggestions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        {/* <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16 scroll-trigger-scale">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
            <div className="flex flex-wrap justify-center items-center gap-12">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=100&fit=crop&q=80" alt="Company logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=200&h=100&fit=crop&q=80" alt="Company logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=100&fit=crop&q=80" alt="Company logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="scroll-trigger-scale bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 via-purple-600/50 to-pink-600/50 backdrop-blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Ace Your Next Interview?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of successful candidates who landed their dream jobs with InterviewAI.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
                <div className="bg-glass rounded-2xl p-6 flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <p className="text-white text-left">Access to 1000+ interview questions</p>
                </div>
                <div className="bg-glass rounded-2xl p-6 flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <p className="text-white text-left">Personalized feedback and coaching</p>
                </div>
              </div>
              <button 
                onClick={()=>{window.location.href='/dashboard'}}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-12 text-center text-gray-400">
        <p>© {new Date().getFullYear()} InterviewGenie All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;