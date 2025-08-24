import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireEmailVerification?: boolean;
}

// Main Protected Route Component
export const ProtectedRoute = ({
  children,
  fallback,
  requireEmailVerification = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return fallback || <AuthLoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  // Check email verification if required
  // if (requireEmailVerification && user && !user.emailVerified) {
  //   return <Navigate to="/auth/verify-email" replace />;
  // }

  return <>{children}</>;
};

// Public Route Component (redirects authenticated users)
interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const PublicRoute = ({
  children,
  redirectTo = "/dashboard",
}: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// Role-based Route Protection
interface RoleProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  fallback?: ReactNode;
}

export const RoleProtectedRoute = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  fallback,
}: RoleProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return fallback || <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  // Note: Role and permission checking would need to be implemented
  // based on your user model and authorization system
  const userRoles = (user as any)?.roles || [];
  const userPermissions = (user as any)?.permissions || [];

  const hasRequiredRole =
    requiredRoles.length === 0 ||
    requiredRoles.some((role) => userRoles.includes(role));

  const hasRequiredPermission =
    requiredPermissions.length === 0 ||
    requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );

  if (!hasRequiredRole || !hasRequiredPermission) {
    return <UnauthorizedScreen />;
  }

  return <>{children}</>;
};

// Email Verification Guard
interface EmailVerificationGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const EmailVerificationGuard = ({
  children,
  fallback,
}: EmailVerificationGuardProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return fallback || <AuthLoadingScreen />;
  }

  // if (user && !user.emailVerified) {
  //   return <Navigate to="/auth/verify-email" replace />;
  // }

  return <>{children}</>;
};

// Authentication Loading Screen
const AuthLoadingScreen = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #f3e5f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
            animation: "spin 2s linear infinite",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid rgba(255, 255, 255, 0.3)",
              borderTop: "3px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>

        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
            margin: "0 0 8px 0",
          }}
        >
          Loading HealthWise AI
        </h2>

        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            margin: "0 0 24px 0",
          }}
        >
          Verifying your authentication...
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#3b82f6",
                borderRadius: "50%",
                animation: `pulse 0.6s infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
          }
        `,
        }}
      />
    </div>
  );
};

// Unauthorized Access Screen
const UnauthorizedScreen = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fff7ed 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8px)",
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #ef4444, #f97316)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid white",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              !
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            background: "linear-gradient(135deg, #ef4444, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
            margin: "0 0 8px 0",
          }}
        >
          Access Denied
        </h2>

        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            margin: "0 0 24px 0",
            lineHeight: "1.5",
          }}
        >
          You don't have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>

        <button
          onClick={() => window.history.back()}
          style={{
            padding: "8px 24px",
            background: "linear-gradient(135deg, #ef4444, #f97316)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #dc2626, #ea580c)";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #ef4444, #f97316)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

// Session Timeout Handler
interface SessionTimeoutProps {
  children: ReactNode;
  timeoutMinutes?: number;
  warningMinutes?: number;
}

export const SessionTimeout = ({
  children,
  timeoutMinutes = 30,
  warningMinutes = 5,
}: SessionTimeoutProps) => {
  const { signOut, refreshSession, isAuthenticated } = useAuth();
  const [showWarning, setShowWarning] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(0);

  React.useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: NodeJS.Timeout;
    let warningId: NodeJS.Timeout;
    let countdownId: NodeJS.Timeout;

    const resetTimers = () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      clearInterval(countdownId);
      setShowWarning(false);

      // Set warning timer
      warningId = setTimeout(() => {
        setShowWarning(true);
        setTimeLeft(warningMinutes * 60);

        // Start countdown
        countdownId = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              signOut();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, (timeoutMinutes - warningMinutes) * 60 * 1000);

      // Set auto logout timer
      timeoutId = setTimeout(() => {
        signOut();
      }, timeoutMinutes * 60 * 1000);
    };

    // Reset timers on user activity
    const handleActivity = () => resetTimers();

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    resetTimers();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      clearInterval(countdownId);
    };
  }, [isAuthenticated, timeoutMinutes, warningMinutes, signOut]);

  const handleExtendSession = async () => {
    await refreshSession();
    setShowWarning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {children}

      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl border"
          >
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Session Expiring Soon
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your session will expire in{" "}
                  <span className="font-mono font-semibold">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={signOut}
                  className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Sign Out
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExtendSession}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Stay Signed In
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default {
  ProtectedRoute,
  PublicRoute,
  RoleProtectedRoute,
  EmailVerificationGuard,
  SessionTimeout,
};
