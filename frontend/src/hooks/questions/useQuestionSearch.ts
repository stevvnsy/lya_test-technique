import { useEffect, useMemo, useState } from "react";
import { searchQuestions } from "../../api/questions";
import type { SearchResult, SearchResultGroup } from "../../types";

interface UseQuestionsSearchParams {
  searchValue: string;
}

export function useQuestionsSearch({ searchValue }: UseQuestionsSearchParams) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const query = searchValue.trim();

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setIsSearchLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    setIsSearchLoading(true);
    setError(null);

    const timeout = window.setTimeout(async () => {
      try {
        const results = await searchQuestions(query);

        if (!isMounted) {
          return;
        }

        setSearchResults(results);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Impossible de rechercher les questions."
        );
        setSearchResults([]);
      } finally {
        if (isMounted) {
          setIsSearchLoading(false);
        }
      }
    }, 300);

    return () => {
      isMounted = false;
      window.clearTimeout(timeout);
    };
  }, [query]);

  const groupedSearchResults = useMemo<SearchResultGroup[]>(() => {
    const groups = new Map<number, SearchResultGroup>();

    for (const result of searchResults) {
      if (!groups.has(result.categoryId)) {
        groups.set(result.categoryId, {
          id: result.categoryId,
          name: result.categoryName,
          description: result.categoryDescription,
          questions: [],
        });
      }

      groups.get(result.categoryId)?.questions.push(result);
    }

    return Array.from(groups.values());
  }, [searchResults]);

  return {
    query,
    isSearchOpen,
    isSearchLoading,
    searchResults,
    groupedSearchResults,
    error,
    openSearch: () => setIsSearchOpen(true),
    closeSearch: () => setIsSearchOpen(false),
    setIsSearchOpen,
  };
}
