import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function IconButton({
  className,
  isActive = false,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200",
        "hover:bg-slate-50",
        "focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none",
        "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-950/40",
        isActive && "bg-slate-100 dark:bg-slate-800",
        className
      )}
      {...props}
    />
  );
}
