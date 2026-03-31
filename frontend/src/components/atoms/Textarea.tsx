import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type TextareaState = "default" | "error" | "success";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textareaState?: TextareaState;
  fullWidth?: boolean;
}

const stateClasses: Record<TextareaState, string> = {
  default: cn(
    "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
    "focus:border-blue-500 focus:ring-blue-100",
    "dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500",
    "dark:focus:border-blue-400 dark:focus:ring-blue-950/50"
  ),
  error: cn(
    "border-red-300 bg-white text-slate-900 placeholder:text-slate-400",
    "focus:border-red-500 focus:ring-red-100",
    "dark:border-red-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500",
    "dark:focus:border-red-500 dark:focus:ring-red-950/50"
  ),
  success: cn(
    "border-emerald-300 bg-white text-slate-900 placeholder:text-slate-400",
    "focus:border-emerald-500 focus:ring-emerald-100",
    "dark:border-emerald-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500",
    "dark:focus:border-emerald-500 dark:focus:ring-emerald-950/50"
  ),
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, textareaState = "default", fullWidth = true, disabled, rows = 5, ...props },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={cn(
          "rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 outline-none",
          "resize-none focus:ring-4",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:shadow-none",
          fullWidth && "w-full",
          stateClasses[textareaState],
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
