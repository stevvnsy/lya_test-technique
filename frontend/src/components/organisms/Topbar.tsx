import type { ReactNode } from "react";
import { IconButton, ThemeToggle } from "../atoms";
import { SearchBar } from "../molecules";
import { cn } from "../../utils/cn";

interface TopbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  isSearchOpen: boolean;
  searchOverlay: ReactNode;
  actions?: ReactNode;
  onOpenMobileSidebar?: () => void;
}

export function Topbar({
  searchValue,
  onSearchChange,
  onSearchFocus,
  isSearchOpen,
  searchOverlay,
  actions,
  onOpenMobileSidebar,
}: TopbarProps) {
  return (
    <div
      className={cn(
        "relative z-30 rounded-3xl border bg-white p-4 shadow-lg",
        "border-slate-200 dark:border-slate-800 dark:bg-slate-900",
        isSearchOpen && "z-50"
      )}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="flex items-center gap-3">
          <div className="xl:hidden">
            <IconButton onClick={onOpenMobileSidebar} aria-label="Ouvrir le menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </IconButton>
          </div>

          <div className="relative z-50 flex-1">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onFocus={onSearchFocus}
              placeholder="Rechercher dans toute la FAQ..."
            />

            {isSearchOpen && searchOverlay}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {actions}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
