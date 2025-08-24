import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated Input Component
interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  success?: boolean;
  isPassword?: boolean;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  (
    {
      className,
      label,
      icon: Icon,
      error,
      success,
      isPassword,
      type,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue
    );

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-2">
        <div className="relative">
          {/* Floating Label */}
          {label && (
            <motion.label
              htmlFor={props.id}
              className={cn(
                "absolute text-sm transition-all duration-200 pointer-events-none",
                isFocused || hasValue
                  ? "top-0 left-3 -translate-y-1/2 text-xs bg-white dark:bg-gray-800 px-2 z-10"
                  : "top-1/2 left-10 -translate-y-1/2 text-gray-500",
                error && "text-red-500",
                success && "text-green-500",
                isFocused && !error && "text-blue-500"
              )}
              initial={false}
              animate={{
                scale: isFocused || hasValue ? 0.85 : 1,
                color: error
                  ? "#ef4444"
                  : success
                  ? "#10b981"
                  : isFocused
                  ? "#3b82f6"
                  : "#6b7280",
              }}
            >
              {label}
            </motion.label>
          )}

          {/* Icon */}
          {Icon && (
            <Icon
              className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors",
                error
                  ? "text-red-500"
                  : success
                  ? "text-green-500"
                  : isFocused
                  ? "text-blue-500"
                  : "text-gray-400"
              )}
            />
          )}

          {/* Input Field */}
          <motion.input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full h-12 px-10 border-2 rounded-lg transition-all duration-200",
              "focus:outline-none focus:ring-0",
              "bg-white dark:bg-gray-800",
              error
                ? "border-red-300 focus:border-red-500"
                : success
                ? "border-green-300 focus:border-green-500"
                : "border-gray-200 focus:border-blue-500 dark:border-gray-700 dark:focus:border-blue-400",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            whileFocus={{ scale: 1.02 }}
            {...props}
          />

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 flex items-center gap-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

// Social Login Button Component
interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "github" | "facebook" | "twitter";
  icon?: LucideIcon;
  isLoading?: boolean;
}

const socialConfig = {
  google: {
    label: "Google",
    bgColor: "bg-white hover:bg-gray-50",
    textColor: "text-gray-700",
    borderColor: "border-gray-300",
    iconColor: "text-red-500",
  },
  github: {
    label: "GitHub",
    bgColor: "bg-gray-900 hover:bg-gray-800",
    textColor: "text-white",
    borderColor: "border-gray-700",
    iconColor: "text-white",
  },
  facebook: {
    label: "Facebook",
    bgColor: "bg-blue-600 hover:bg-blue-700",
    textColor: "text-white",
    borderColor: "border-blue-600",
    iconColor: "text-white",
  },
  twitter: {
    label: "Twitter",
    bgColor: "bg-sky-500 hover:bg-sky-600",
    textColor: "text-white",
    borderColor: "border-sky-500",
    iconColor: "text-white",
  },
};

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ provider, icon: Icon, isLoading, children, className, ...props }, ref) => {
    const config = socialConfig[provider];

    return (
      <motion.button
        ref={ref}
        type="button"
        className={cn(
          "w-full h-12 border-2 rounded-lg font-medium transition-all duration-200",
          "flex items-center justify-center gap-3",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          config.bgColor,
          config.textColor,
          config.borderColor,
          isLoading && "opacity-50 cursor-not-allowed",
          className
        )}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          Icon && <Icon className={`h-5 w-5 ${config.iconColor}`} />
        )}
        {children || `Continue with ${config.label}`}
      </motion.button>
    );
  }
);

SocialButton.displayName = "SocialButton";

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
}

export const LoadingSpinner = ({
  size = "md",
  color = "primary",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    primary: "border-blue-600 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-600 border-t-transparent",
  };

  return (
    <div
      className={cn(
        "border-2 rounded-full animate-spin",
        sizeClasses[size],
        colorClasses[color]
      )}
    />
  );
};

// Auth Card Wrapper Component
interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export const AuthCard = ({
  children,
  title,
  description,
  icon: Icon,
  className,
}: AuthCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full max-w-md relative z-10", className)}
    >
      <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl rounded-xl p-6">
        <div className="text-center mb-6">
          {Icon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
            >
              <Icon className="h-8 w-8 text-white" />
            </motion.div>
          )}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
};

// Animated Button Component
interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-transparent",
      secondary:
        "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white border-transparent",
      outline:
        "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
    };

    const sizeClasses = {
      sm: "h-10 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "border-2 rounded-lg font-medium transition-all duration-200",
          "flex items-center justify-center gap-2",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        whileHover={{ scale: props.disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: props.disabled || isLoading ? 1 : 0.98 }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner
            size="sm"
            color={variant === "primary" ? "white" : "gray"}
          />
        ) : (
          LeftIcon && <LeftIcon className="h-4 w-4" />
        )}
        {children}
        {!isLoading && RightIcon && <RightIcon className="h-4 w-4" />}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

// Password Strength Indicator
interface PasswordStrengthProps {
  password: string;
  showText?: boolean;
}

export const PasswordStrength = ({
  password,
  showText = true,
}: PasswordStrengthProps) => {
  const getStrength = (password: string) => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[^a-zA-Z\d]/.test(password),
    ];
    strength = checks.filter(Boolean).length;
    return strength;
  };

  const strength = getStrength(password);
  const percentage = (strength / 5) * 100;

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return { text: "Weak", color: "text-red-500" };
    if (strength <= 3) return { text: "Fair", color: "text-yellow-500" };
    if (strength <= 4) return { text: "Good", color: "text-blue-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const strengthInfo = getStrengthText(strength);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">Password strength</span>
        {showText && (
          <span className={strengthInfo.color}>{strengthInfo.text}</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className={cn(
            "h-full transition-all duration-300",
            strength <= 2
              ? "bg-red-500"
              : strength <= 3
              ? "bg-yellow-500"
              : strength <= 4
              ? "bg-blue-500"
              : "bg-green-500"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default {
  AnimatedInput,
  SocialButton,
  LoadingSpinner,
  AuthCard,
  AnimatedButton,
  PasswordStrength,
};
