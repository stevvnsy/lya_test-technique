import type { ReactNode } from "react";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { SearchBar } from "../molecules";
import { Sidebar } from "../organisms";
import { cn } from "../../utils/cn";

interface Category {
  id: number;
  name: string;
  count?: number;
}

interface AppShellProps {
  children: ReactNode;
  categories: Category[];
  activeCategoryId?: number;
  onSelectCategory?: (id: number) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  isSearchOpen: boolean;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  searchOverlay: ReactNode;
}

export function AppShell({
  children,
  categories,
  activeCategoryId,
  onSelectCategory,
  searchValue,
  onSearchChange,
  isSearchOpen,
  onOpenSearch,
  onCloseSearch,
  searchOverlay,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen gap-6 p-6">
        <div className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-6 h-[calc(100vh-3rem)]">
            <Sidebar
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelectCategory={onSelectCategory}
              className="h-full"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div
            className={cn(
              "sticky top-6 flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm",
              "dark:border-slate-800 dark:bg-slate-900",
              isSearchOpen ? "z-50" : "z-30"
            )}
          >
            <div className="relative z-50 flex-1">
              <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                onFocus={onOpenSearch}
                placeholder="Rechercher dans toute la FAQ..."
              />

              {isSearchOpen && searchOverlay}
            </div>

            <ThemeToggle />
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-6">{children}</div>
        </div>
      </div>

      {isSearchOpen && (
        <button
          type="button"
          aria-label="Fermer la recherche"
          onClick={onCloseSearch}
          className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-md dark:bg-black/60"
        />
      )}
    </div>
  );
}
