import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-blue-600 text-white shadow-sm",
    "hover:bg-blue-700",
    "focus-visible:ring-4 focus-visible:ring-blue-200",
    "dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-900/50"
  ),
  secondary: cn(
    "border border-slate-200 bg-white text-slate-700 shadow-sm",
    "hover:bg-slate-50",
    "focus-visible:ring-4 focus-visible:ring-slate-200",
    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-slate-700"
  ),
  ghost: cn(
    "bg-transparent text-slate-700",
    "hover:bg-slate-100",
    "focus-visible:ring-4 focus-visible:ring-slate-200",
    "dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-700"
  ),
  danger: cn(
    "bg-red-600 text-white shadow-sm",
    "hover:bg-red-700",
    "focus-visible:ring-4 focus-visible:ring-red-200",
    "dark:bg-red-500 dark:hover:bg-red-400 dark:focus-visible:ring-red-900/50"
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200",
        "focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      <span>{children}</span>
    </button>
  );
}
