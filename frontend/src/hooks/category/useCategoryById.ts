import { useCallback, useEffect, useState } from "react";
import { getCategoryById } from "../../api/categories";
import type { Category } from "../../types";

interface UseCategoryByIdParams {
  categoryId?: number | null;
  enabled?: boolean;
}

export function useCategoryById({ categoryId, enabled = true }: UseCategoryByIdParams) {
  const [data, setData] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!enabled || categoryId == null) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const category = await getCategoryById(categoryId);
      setData(category);
      return category;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Impossible de charger la catégorie.");
      setData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, enabled]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    data,
    isLoading,
    error,
    reload: load,
    setData,
  };
}
