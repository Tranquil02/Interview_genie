import React, { ReactNode, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";
import LoadingSkeleton from "./components/ui/skeleton";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Calendar from "./pages/Calendar";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./pages/landing";
import Pricing from "./components/pricing";
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import supabase from "./utils/client";
import { InterviewStart } from "./components/StartInterview";
import InterviewComponent from "./components/Interview";
import Feedback from "./components/Feedback";
import { ComingSoon } from "./pages/commingSoon";
import InternetError from "./pages/InternetError";
import ErrorPage from "./pages/ErrorPage";
import UserFeedback from "./pages/UserFeedback";

// Authenticated Layout Component
function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <Navbar />
        <main className="h-[calc(100vh-3rem)] overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

// Protected Route Component
function PrivateRoute({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <LoadingSkeleton />; // Show loader while checking

  return isAuthenticated ? (
    <AuthenticatedLayout>{children}</AuthenticatedLayout>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}

// Internet Connectivity Handler
function InternetHandler() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline && location.pathname !== "/InternetError") {
      navigate("/InternetError");
    } else if (isOnline && location.pathname === "/InternetError") {
      navigate(-1); // Go back to previous page when internet is restored
    }
  }, [isOnline, location.pathname, navigate]);

  return null; // This component only handles navigation logic
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="interview-master-theme">
      <InternetHandler /> {/* Handles automatic redirection */}
      <React.Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/interview-start" element={<InterviewComponent />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/commingSoon" element={<ComingSoon />} />
          <Route path="/InternetError" element={<InternetError />} />
          <Route path="/interview-start" element={<InterviewStart />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/userFeedback" element={<UserFeedback />} />

          <Route
            path="/practice"
            element={
              <PrivateRoute>
                <Practice />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <PrivateRoute>
                <Resources />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </React.Suspense>
    </ThemeProvider>
  );
}
