import type { ReactNode } from "react";
import { Sidebar } from "../organisms";
import { SidebarCategory } from "../../types/category";
import { Topbar } from "../organisms/Topbar";

interface AppShellProps {
  children: ReactNode;
  categories: SidebarCategory[];
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
          <Topbar
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onSearchFocus={onOpenSearch}
            isSearchOpen={isSearchOpen}
            searchOverlay={searchOverlay}
            actions={actions}
          />

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
