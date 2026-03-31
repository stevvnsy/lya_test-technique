import { cn } from "../../utils/cn";
import { SearchResult, SearchResultGroup } from "../../types/search";

interface SearchOverlayProps {
  query: string;
  results: SearchResult[];
  groupedResults: SearchResultGroup[];
  isLoading?: boolean;
  onSelectResult?: (result: SearchResult) => void;
}

export function SearchOverlay({
  query,
  results,
  groupedResults,
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

      <div className="overlay-scroll max-h-[420px] overflow-y-auto p-4">
        {!hasQuery ? (
          <div className="rounded-2xl p-4 text-sm text-slate-500 dark:text-slate-400">
            Recherche par question, réponse ou mot-clé.
          </div>
        ) : isLoading ? (
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800/70" />
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-col gap-8">
            {groupedResults.map((group) => (
              <section
                key={group.id}
                className="space-y-4 border-t border-slate-200 pt-6 first:border-t-0 first:pt-0 dark:border-slate-800"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {group.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {group.description}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {group.questions.length} résultat
                    {group.questions.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {group.questions.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => onSelectResult?.(result)}
                      className={cn(
                        "w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-200",
                        "hover:bg-slate-100 hover:shadow-sm",
                        "focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none",
                        "dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-slate-800/60 dark:focus-visible:ring-blue-950/40"
                      )}
                    >
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {result.question}
                      </h4>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {result.answer}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl p-4 text-sm text-slate-500 dark:text-slate-400">
            Aucun résultat trouvé.
          </div>
        )}
      </div>
    </div>
  );
}
