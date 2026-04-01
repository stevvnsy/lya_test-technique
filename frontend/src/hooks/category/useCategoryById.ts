import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!enabled || categoryId == null) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const category = await getCategoryById(categoryId);

        if (!isMounted) {
          return;
        }

        setData(category);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setError(error instanceof Error ? error.message : "Impossible de charger la catégorie.");
        setData(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, [categoryId, enabled]);

  return {
    data,
    isLoading,
    error,
  };
}
