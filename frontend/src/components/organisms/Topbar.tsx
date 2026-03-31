import type { ReactNode } from "react";
import { IconButton, ThemeToggle } from "../atoms";
import { SearchBar } from "../molecules";
import { cn } from "../../utils/cn";
import { Bars3Icon } from "@heroicons/react/24/outline";

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
        <div className="flex flex-1 items-center gap-3">
          <div className="xl:hidden">
            <IconButton onClick={onOpenMobileSidebar} aria-label="Ouvrir le menu">
              <Bars3Icon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
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
