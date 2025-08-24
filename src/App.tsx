import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppNavbar } from "@/components/AppNavbar";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import {
  ProtectedRoute,
  PublicRoute,
  SessionTimeout,
} from "@/components/auth/ProtectedRoute";

// Protected Pages
import Index from "./pages/Index";
import SimpleIndex from "./pages/SimpleIndex";
import FramerTest from "./pages/FramerTest";
import TestPage from "./pages/TestPage";
import Chat from "./pages/Chat";
import Symptoms from "./pages/Symptoms";
import Medications from "./pages/Medications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Emergency from "./pages/Emergency";
import HealthTips from "./pages/HealthTips";
import Telehealth from "./pages/Telehealth";
import Prescription from "./pages/Prescription";
import About from "./pages/About";
import Feedback from "./pages/Feedback";

// Public Pages
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import VerifyEmailPage from "./pages/VerifyEmail";
import TestAuth from "./pages/TestAuth";
import SimpleLogin from "./pages/SimpleLogin";
import MinimalLogin from "./pages/MinimalLogin";
import NewLogin from "./pages/NewLogin";
import NewRegister from "./pages/NewRegister";
import NewDashboard from "./pages/NewDashboard";
import MinimalDashboard from "./pages/MinimalDashboard";

// 404 Page
import NotFound from "./pages/NotFound";

// Debug Page
import Debug from "./pages/Debug";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isFeaturePage = [
    "/chat",
    "/symptoms",
    "/medications",
    "/tips",
    "/telehealth",
    "/prescription",
    "/emergency",
    "/profile",
    "/settings",
  ].includes(location.pathname);
  const isLandingPage = location.pathname === "/";
  const hideNavbar = isAuthPage || isFeaturePage;

  return (
    <SessionTimeout timeoutMinutes={30} warningMinutes={5}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {!hideNavbar && (
          <>
            <AppNavbar />
            <main className="flex-1 mt-20">
              <Routes>
                {/* Public Landing Page - New Spectacular UI */}
                <Route path="/" element={<SimpleIndex />} />

                {/* Protected Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard-old"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ProtectedRoute>
                      <About />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feedback"
                  element={
                    <ProtectedRoute>
                      <Feedback />
                    </ProtectedRoute>
                  }
                />
                <Route path="/debug" element={<Debug />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </>
        )}

        {hideNavbar && (
          <main className="flex-1">
            <Routes>
              {/* Public Landing Page - New Spectacular UI */}
              <Route path="/" element={<SimpleIndex />} />

              {/* Feature Pages - No Navbar */}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/symptoms"
                element={
                  <ProtectedRoute>
                    <Symptoms />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/medications"
                element={
                  <ProtectedRoute>
                    <Medications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tips"
                element={
                  <ProtectedRoute>
                    <HealthTips />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/telehealth"
                element={
                  <ProtectedRoute>
                    <Telehealth />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prescription"
                element={
                  <ProtectedRoute>
                    <Prescription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/emergency"
                element={
                  <ProtectedRoute>
                    <Emergency />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* Authentication Routes */}
              <Route path="/auth/test" element={<TestAuth />} />
              <Route path="/auth/minimal" element={<MinimalLogin />} />
              <Route path="/auth/simple-login" element={<SimpleLogin />} />
              <Route
                path="/auth/login"
                element={
                  <PublicRoute>
                    <NewLogin />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/register"
                element={
                  <PublicRoute>
                    <NewRegister />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/login-old"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/register-old"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPasswordPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/reset-password"
                element={
                  <PublicRoute>
                    <ResetPasswordPage />
                  </PublicRoute>
                }
              />
              <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
              <Route
                path="/auth/callback"
                element={<div>Processing authentication...</div>}
              />

              {/* Fallback */}
              <Route path="*" element={<Landing />} />
            </Routes>
          </main>
        )}
      </div>
    </SessionTimeout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
