import { useEffect, useRef, useState } from "react";
import { IconButton } from "../atoms";
import { cn } from "../../utils/cn";

interface ActionMenuItem {
  label: string;
  onClick: () => void;
}

interface ActionMenuProps {
  items: ActionMenuItem[];
}

export function ActionMenu({ items }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <IconButton onClick={() => setIsOpen((prev) => !prev)} aria-label="Actions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </IconButton>

      <div
        className={cn(
          "absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border bg-white p-2 shadow-xl transition-all duration-200",
          "border-slate-200 dark:border-slate-800 dark:bg-slate-900",
          isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              setIsOpen(false);
            }}
            className={cn(
              "w-full rounded-xl px-3 py-2 text-left text-sm transition-colors",
              "text-slate-700 hover:bg-slate-100",
              "dark:text-slate-200 dark:hover:bg-slate-800"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
