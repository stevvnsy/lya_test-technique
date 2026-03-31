import { cn } from "../../utils/cn";

type SearchResult = {
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  categoryName: string;
};

interface SearchOverlayProps {
  query: string;
  results: SearchResult[];
  isLoading?: boolean;
  onSelectResult?: (result: SearchResult) => void;
}

export function SearchOverlay({
  query,
  results,
  isLoading = false,
  onSelectResult,
}: SearchOverlayProps) {
  const hasQuery = query.trim().length > 0;

  return (
    <div
      className={cn(
        "absolute top-[calc(100%+0.75rem)] right-0 left-0 z-[60] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl",
        "dark:border-slate-800 dark:bg-slate-900"
      )}
    >
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Recherche FAQ</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {hasQuery
            ? `Résultats pour “${query}”`
            : "Commence à taper pour rechercher dans toute la FAQ"}
        </p>
      </div>

      <div className="max-h-[420px] overflow-y-auto p-2">
        {!hasQuery ? (
          <div className="rounded-2xl p-6 text-sm text-slate-500 dark:text-slate-400">
            Recherche par question, réponse ou mot-clé.
          </div>
        ) : isLoading ? (
          <div className="flex flex-col gap-3 p-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="mb-3 h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mb-2 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800/70" />
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-col gap-2">
            {results.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() => onSelectResult?.(result)}
                className={cn(
                  "w-full rounded-2xl border border-transparent p-4 text-left transition",
                  "hover:border-slate-200 hover:bg-slate-50",
                  "focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none",
                  "dark:hover:border-slate-800 dark:hover:bg-slate-950"
                )}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {result.categoryName}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {result.question}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                  {result.answer}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl p-6 text-sm text-slate-500 dark:text-slate-400">
            Aucun résultat trouvé.
          </div>
        )}
      </div>
    </div>
  );
}
