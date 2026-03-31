import { cn } from "../../utils/cn";

interface CategoryListItemProps {
  name: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryListItem({
  name,
  count,
  isActive = false,
  onClick,
}: CategoryListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none",
        isActive
          ? cn("bg-blue-50 text-blue-700", "dark:bg-blue-950/40 dark:text-blue-300")
          : cn("text-slate-700 hover:bg-slate-100", "dark:text-slate-300 dark:hover:bg-slate-800")
      )}
    >
      <span className="truncate">{name}</span>

      {count !== undefined && (
        <span
          className={cn(
            "ml-2 rounded-full px-2 py-0.5 text-xs font-medium",
            isActive
              ? cn("bg-blue-100 text-blue-700", "dark:bg-blue-900 dark:text-blue-300")
              : cn("bg-slate-200 text-slate-600", "dark:bg-slate-700 dark:text-slate-300")
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
