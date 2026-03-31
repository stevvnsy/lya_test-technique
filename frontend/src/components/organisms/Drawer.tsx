import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  widthClassName?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  widthClassName = "w-full max-w-xl",
}: DrawerProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[90] bg-slate-900/45 backdrop-blur-md transition-opacity duration-300",
          "dark:bg-black/60",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed top-0 right-0 z-[100] flex h-screen flex-col border-l bg-white shadow-2xl transition-transform duration-300 ease-out",
          "border-slate-200 dark:border-slate-800 dark:bg-slate-900",
          widthClassName,
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isOpen}
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>

            {description && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
              "focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none",
              "dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:focus-visible:ring-blue-950/40"
            )}
            aria-label="Fermer le panneau"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>
      </aside>
    </>
  );
}
