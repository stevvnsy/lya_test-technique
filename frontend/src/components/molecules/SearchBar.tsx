import { useId } from "react";
import { Input } from "../atoms";
import { cn } from "../../utils/cn";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onFocus,
  placeholder = "Rechercher...",
  className,
  disabled = false,
}: SearchBarProps) {
  const inputId = useId();
  const hasValue = value.trim().length > 0;

  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor={inputId} className="sr-only">
        Recherche
      </label>

      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-slate-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>

      <Input
        id={inputId}
        value={value}
        onFocus={onFocus}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="pr-12 pl-11"
      />

      {hasValue && !disabled && (
        <button
          type="button"
          onClick={() => onChange("")}
          className={cn(
            "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-full",
            "text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600",
            "focus-visible:ring-4 focus-visible:ring-slate-200 focus-visible:outline-none",
            "dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:focus-visible:ring-slate-700"
          )}
          aria-label="Effacer la recherche"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
