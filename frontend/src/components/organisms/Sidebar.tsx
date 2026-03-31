import { CategoryListItem } from "../molecules";
import { cn } from "../../utils/cn";

interface Category {
  id: number;
  name: string;
  count?: number;
}

interface SidebarProps {
  categories: Category[];
  activeCategoryId?: number;
  onSelectCategory?: (id: number) => void;
  className?: string;
}

export function Sidebar({
  categories,
  activeCategoryId,
  onSelectCategory,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm",
        "dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 px-2">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Catégories</h2>
      </div>

      {/* List */}
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {categories.map((category) => (
          <CategoryListItem
            key={category.id}
            name={category.name}
            count={category.count}
            isActive={category.id === activeCategoryId}
            onClick={() => onSelectCategory?.(category.id)}
          />
        ))}
      </div>
    </aside>
  );
}
