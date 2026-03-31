import { cn } from "../../utils/cn";

interface QuestionAccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function QuestionAccordion({ question, answer, isOpen, onToggle }: QuestionAccordionProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition-all duration-200",
        "dark:border-slate-800 dark:bg-slate-950/50"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors",
          "hover:bg-slate-100 dark:hover:bg-slate-800/60",
          "focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none dark:focus-visible:ring-blue-950/40"
        )}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-slate-900 sm:text-base dark:text-slate-100">
          {question}
        </span>

        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200",
            "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-800">
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
