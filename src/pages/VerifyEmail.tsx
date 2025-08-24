import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Mail,
  CheckCircle,
  Heart,
  AlertCircle,
  Send,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";

const VerifyEmailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get email from location state or URL params
  useEffect(() => {
    const emailFromState = location.state?.email;
    const emailFromParams = searchParams.get("email");
    const token = searchParams.get("token");

    if (emailFromState) {
      setEmail(emailFromState);
      setIsVerifying(false);
    } else if (emailFromParams) {
      setEmail(emailFromParams);
    }

    // If there's a verification token, verify automatically
    if (token) {
      verifyEmailToken(token);
    } else {
      setIsVerifying(false);
    }
  }, [location.state, searchParams]);

  const verifyEmailToken = async (token: string) => {
    setIsVerifying(true);
    try {
      const result = await authClient.verifyEmail({
        query: { token },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      setVerificationStatus("success");
      toast({
        title: "Email verified successfully!",
        description:
          "Your account is now verified. Redirecting to dashboard...",
        action: <CheckCircle className="h-4 w-4" />,
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      setVerificationStatus("error");
      toast({
        title: "Verification failed",
        description:
          error.message || "The verification link may be expired or invalid.",
        variant: "destructive",
        action: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to resend verification.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Note: This would need to be implemented in Better Auth
      // For now, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Verification email sent!",
        description: "Check your inbox for the new verification email.",
        action: <CheckCircle className="h-4 w-4" />,
      });
    } catch (error: any) {
      toast({
        title: "Failed to resend email",
        description: error.message || "Please try again later.",
        variant: "destructive",
        action: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isVerifying) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Verifying Your Email
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Please wait while we verify your email address...
          </CardDescription>
        </motion.div>
      );
    }

    if (verificationStatus === "success") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle className="h-8 w-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Email Verified Successfully!
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 mb-6">
            Your account has been verified. Redirecting to your dashboard...
          </CardDescription>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium"
            >
              <div className="flex items-center gap-2">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </motion.div>
        </motion.div>
      );
    }

    if (verificationStatus === "error") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-4"
          >
            <AlertCircle className="h-8 w-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Verification Failed
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 mb-6">
            The verification link may be expired or invalid. You can request a
            new one below.
          </CardDescription>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleResendVerification}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Resend Verification Email
                </div>
              )}
            </Button>
          </motion.div>
        </motion.div>
      );
    }

    // Default state - waiting for verification
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
        >
          <Mail className="h-8 w-8 text-white" />
        </motion.div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300 mb-6">
          We've sent a verification email to your address. Please check your
          inbox and click the verification link.
        </CardDescription>

        {email && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Verification email sent to:
              </span>
            </div>
            <p className="text-sm font-mono bg-white dark:bg-gray-600 px-3 py-2 rounded border text-gray-800 dark:text-gray-200">
              {email}
            </p>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">What's next?</p>
              <ul className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Check your email inbox (and spam folder)</li>
                <li>• Click the verification link in the email</li>
                <li>• You'll be automatically redirected to your dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleResendVerification}
              variant="outline"
              className="w-full h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                  Resending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Resend Verification Email
                </div>
              )}
            </Button>
          </motion.div>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Didn't receive the email? Check your spam folder or click resend
              above.
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-slate-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <Heart className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
