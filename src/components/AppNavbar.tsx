import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import {
  Activity,
  Stethoscope,
  Pill,
  MessageCircle,
  User,
  Settings,
  Home,
  Brain,
  FileText,
  LogOut,
  AlertTriangle,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon: any;
  badge?: string;
  isEmergency?: boolean;
}

const featuresItems: NavItem[] = [
  {
    title: "AI Health Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Symptom Checker",
    url: "/symptoms",
    icon: Activity,
  },
  {
    title: "Prescription AI",
    url: "/prescription",
    icon: FileText,
  },
  {
    title: "Medications",
    url: "/medications",
    icon: Pill,
  },
  {
    title: "Telehealth",
    url: "/telehealth",
    icon: Stethoscope,
  },
];

export function AppNavbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { theme, setTheme } = useTheme();

  // Determine if we're in dark mode
  const isDarkMode = theme === "dark";

  const isActive = (path: string) => currentPath === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1200px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 z-50 transition-colors duration-300">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Brand Section - Left */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                HealthWise AI
              </h1>
              <p className="text-xs text-gray-600 dark:text-slate-400 font-medium">
                Your AI Health Assistant
              </p>
            </div>
          </div>

          {/* Menu Section - Center */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Dashboard Link */}
            <Button
              onClick={() => handleNavigation("/dashboard")}
              variant="ghost"
              className={cn(
                "text-gray-700 dark:text-white hover:text-blue-400 transition-colors duration-200 font-medium px-3 py-2",
                isActive("/dashboard") && "text-blue-400"
              )}
            >
              Dashboard
            </Button>

            {/* Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 dark:text-white hover:text-blue-400 transition-colors duration-200 font-medium flex items-center gap-1 px-3 py-2"
                >
                  Features
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/50 dark:border-slate-700/50 rounded-xl shadow-xl mt-2">
                {featuresItems.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    onClick={() => handleNavigation(item.url)}
                    className={cn(
                      "text-gray-700 dark:text-white hover:bg-gray-100/50 dark:hover:bg-slate-700/50 hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center gap-3 px-4 py-3",
                      isActive(item.url) &&
                        "text-blue-400 bg-gray-100/30 dark:bg-slate-700/30"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Emergency Link - Outside Dropdown */}
            <Button
              onClick={() => handleNavigation("/emergency")}
              variant="ghost"
              className={cn(
                "text-red-500 hover:text-red-400 transition-colors duration-200 font-semibold px-3 py-2 relative",
                isActive("/emergency") && "text-red-400"
              )}
            >
              Emergency
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                24/7
              </span>
            </Button>
          </div>

          {/* Actions Section - Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Light/Dark Mode Toggle - Always visible */}
            <div className="flex items-center">
              <button
                onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                className={cn(
                  "relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 shadow-lg",
                  isDarkMode
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 focus:ring-purple-400"
                    : "bg-gradient-to-r from-orange-400 to-yellow-400 focus:ring-yellow-400"
                )}
              >
                {/* Background decorative elements */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  {/* Stars for dark mode */}
                  <div
                    className={cn(
                      "absolute transition-opacity duration-500",
                      isDarkMode ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="absolute top-1.5 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-2.5 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-100"></div>
                    <div className="absolute top-1 left-6 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200"></div>
                  </div>

                  {/* Clouds for light mode */}
                  <div
                    className={cn(
                      "absolute transition-opacity duration-500",
                      isDarkMode ? "opacity-0" : "opacity-100"
                    )}
                  >
                    <div className="absolute top-2 left-8 w-2 h-1 bg-white/30 rounded-full"></div>
                    <div className="absolute top-3 left-10 w-1.5 h-0.5 bg-white/20 rounded-full"></div>
                  </div>
                </div>

                {/* Toggle button with icons */}
                <span
                  className={cn(
                    "relative inline-flex h-6 w-6 transform rounded-full transition-all duration-500 ease-in-out shadow-xl items-center justify-center",
                    isDarkMode
                      ? "translate-x-9 bg-slate-800"
                      : "translate-x-1 bg-white"
                  )}
                >
                  {/* Sun icon for light mode */}
                  <Sun
                    className={cn(
                      "h-3.5 w-3.5 transition-all duration-300",
                      isDarkMode
                        ? "opacity-0 rotate-90 text-yellow-400"
                        : "opacity-100 rotate-0 text-orange-500"
                    )}
                  />

                  {/* Moon icon for dark mode */}
                  <Moon
                    className={cn(
                      "absolute h-3.5 w-3.5 transition-all duration-300",
                      isDarkMode
                        ? "opacity-100 rotate-0 text-indigo-300"
                        : "opacity-0 -rotate-90 text-slate-600"
                    )}
                  />
                </span>
              </button>
            </div>

            {user ? (
              <>
                <Button
                  onClick={() => navigate("/profile")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  Profile
                </Button>

                {/* Settings Icon Only */}
                <Button
                  onClick={() => navigate("/settings")}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-blue-400 transition-colors duration-200 p-2"
                >
                  <Settings className="h-5 w-5" />
                </Button>

                {/* Sign Out */}
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 transition-colors duration-200 p-2"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              /* Sign In Button when not authenticated */
              <Button
                onClick={() => navigate("/auth/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden mt-2 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-xl">
        <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
          {/* Dashboard Link */}
          <Button
            onClick={() => handleNavigation("/dashboard")}
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
              "text-white hover:text-blue-400 hover:bg-slate-700/50",
              isActive("/dashboard") && "bg-slate-700/50 text-blue-400"
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <Home className="h-5 w-5" />
              <span className="flex-1 text-left">Dashboard</span>
            </div>
          </Button>

          {/* Features Items */}
          <div className="space-y-1">
            <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Features
            </div>
            {featuresItems.map((item) => (
              <Button
                key={item.title}
                onClick={() => handleNavigation(item.url)}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
                  "text-white hover:text-blue-400 hover:bg-slate-700/50",
                  isActive(item.url) && "bg-slate-700/50 text-blue-400"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.title}</span>
                </div>
              </Button>
            ))}
          </div>

          {/* Emergency Link - Separate */}
          <Button
            onClick={() => handleNavigation("/emergency")}
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold",
              "text-red-500 hover:text-red-400 hover:bg-red-950/30",
              isActive("/emergency") && "bg-red-950/30 text-red-400"
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <AlertTriangle className="h-5 w-5" />
              <span className="flex-1 text-left">Emergency</span>
              <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                24/7
              </span>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
}
