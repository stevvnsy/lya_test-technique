import { cn } from "../../utils/cn";
import { Sidebar } from "./Sidebar";
import type { SidebarCategory } from "../../types/category";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: SidebarCategory[];
  activeCategoryId?: number;
  onSelectCategory?: (id: number) => void;
}

export function MobileSidebar({
  isOpen,
  onClose,
  categories,
  activeCategoryId,
  onSelectCategory,
}: MobileSidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[90] bg-slate-900/45 backdrop-blur-md transition-opacity duration-300 lg:hidden dark:bg-black/60",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-[100] h-screen w-[88vw] max-w-sm border-r bg-white p-4 shadow-2xl transition-transform duration-300 ease-out lg:hidden dark:border-slate-800 dark:bg-slate-900",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Navigation</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Parcourir les catégories</p>
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
            aria-label="Fermer le menu"
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

        <Sidebar
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(id) => {
            onSelectCategory?.(id);
            onClose();
          }}
          className="h-[calc(100vh-7rem)]"
        />
      </aside>
    </>
  );
}
