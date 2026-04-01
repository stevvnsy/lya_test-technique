import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import type { Category } from "../../types";
import { appToast } from "../../utils/toast";

export function useCategoriesApi() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const categories = await getCategories();
      setData(categories);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Impossible de charger les catégories.";
      setError(message);
      appToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return {
    data,
    isLoading,
    error,
    reload: load,
    setData,
  };
}
