import { cn } from "../../utils/cn";

interface CategoryCardProps {
  name: string;
  description: string;
  count?: number;
  onClick?: () => void;
}

export function CategoryCard({ name, description, count, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none",
        "dark:border-slate-800 dark:bg-slate-900"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{name}</h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>

        {count !== undefined && (
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              "bg-slate-100 text-slate-700",
              "dark:bg-slate-800 dark:text-slate-300"
            )}
          >
            {count} questions
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition group-hover:opacity-100 dark:text-blue-400">
        Voir →
      </div>
    </button>
  );
}
