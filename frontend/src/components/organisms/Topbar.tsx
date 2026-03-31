import type { ReactNode } from "react";
import { ThemeToggle } from "../atoms";
import { SearchBar } from "../molecules";
import { cn } from "../../utils/cn";

interface TopbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  isSearchOpen: boolean;
  searchOverlay: ReactNode;
  actions?: ReactNode;
}

export function Topbar({
  searchValue,
  onSearchChange,
  onSearchFocus,
  isSearchOpen,
  searchOverlay,
  actions,
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
        <div className="relative z-50 flex-1">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onFocus={onSearchFocus}
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
  );
}
