import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type InputState = "default" | "error" | "success";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputState?: InputState;
  fullWidth?: boolean;
}

const stateClasses: Record<InputState, string> = {
  default: cn(
    "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
    "focus:border-blue-500 focus:ring-blue-100",
    "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
    "dark:focus:border-blue-400 dark:focus:ring-blue-950/50"
  ),
  error: cn(
    "border-red-300 bg-white text-slate-900 placeholder:text-slate-400",
    "focus:border-red-500 focus:ring-red-100",
    "dark:border-red-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
    "dark:focus:border-red-500 dark:focus:ring-red-950/50"
  ),
  success: cn(
    "border-emerald-300 bg-white text-slate-900 placeholder:text-slate-400",
    "focus:border-emerald-500 focus:ring-emerald-100",
    "dark:border-emerald-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
    "dark:focus:border-emerald-500 dark:focus:ring-emerald-950/50"
  ),
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", inputState = "default", fullWidth = true, disabled, ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "h-11 rounded-2xl border px-4 text-sm shadow-sm transition-all duration-200 outline-none",
          "focus:ring-4",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:shadow-none",
          fullWidth && "w-full",
          stateClasses[inputState],
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
