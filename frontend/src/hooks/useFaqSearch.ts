import { useEffect, useMemo, useState } from "react";
import type { Category } from "../types/category";
import type { SearchResult, SearchResultGroup } from "../types/search";

interface UseFaqSearchParams {
  categories: Category[];
  searchValue: string;
}

export function useFaqSearch({ categories, searchValue }: UseFaqSearchParams) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const query = searchValue.trim().toLowerCase();

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!query) {
      return [];
    }

    return categories.flatMap((category) =>
      category.questions
        .filter(
          (item) =>
            item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)
        )
        .map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
          categoryId: category.id,
          categoryName: category.name,
          categoryDescription: category.description,
        }))
    );
  }, [categories, query]);

  const groupedSearchResults = useMemo<SearchResultGroup[]>(() => {
    if (!query) {
      return [];
    }

    return categories
      .map((category) => {
        const questions = category.questions
          .filter(
            (item) =>
              item.question.toLowerCase().includes(query) ||
              item.answer.toLowerCase().includes(query)
          )
          .map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
            categoryId: category.id,
            categoryName: category.name,
            categoryDescription: category.description,
          }));

        return {
          id: category.id,
          name: category.name,
          description: category.description,
          questions,
        };
      })
      .filter((group) => group.questions.length > 0);
  }, [categories, query]);

  useEffect(() => {
    if (!query) {
      setIsSearchLoading(false);
      return;
    }

    setIsSearchLoading(true);

    const timeout = window.setTimeout(() => {
      setIsSearchLoading(false);
    }, 350);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [query]);

  return {
    query,
    isSearchOpen,
    isSearchLoading,
    searchResults,
    groupedSearchResults,
    openSearch: () => setIsSearchOpen(true),
    closeSearch: () => setIsSearchOpen(false),
    setIsSearchOpen,
  };
}
