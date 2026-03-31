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
  actions?: ReactNode;
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
  actions,
}: AppShellProps) {
  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="flex h-full gap-6 p-6">
        <aside className="hidden h-full w-72 shrink-0 lg:block">
          <Sidebar
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={onSelectCategory}
            className="h-full"
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden">
          <div
            className={cn(
              "relative z-30 rounded-3xl border bg-white p-4 shadow-lg",
              "border-slate-200 dark:border-slate-800 dark:bg-slate-900",
              isSearchOpen && "z-50"
            )}
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
              <div className="relative z-50 flex-1">
                <SearchBar
                  value={searchValue}
                  onChange={onSearchChange}
                  onFocus={onOpenSearch}
                  placeholder="Rechercher dans toute la FAQ..."
                />

                {isSearchOpen && searchOverlay}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                {actions}
                <ThemeToggle />
              </div>
            </div>
          </div>

          <main className="scroll-area min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="flex flex-col gap-8 pb-6">{children}</div>
          </main>
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
