import { useState } from "react";
import { createCategory } from "../../api/categories";
import type { CategoryFormValues } from "../../schemas";
import { appToast } from "../../utils/toast";

export function useCreateCategory() {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (values: CategoryFormValues) => {
    const toastId = appToast.loading("Création de la catégorie...");
    setIsLoading(true);

    try {
      const created = await createCategory(values);
      appToast.updateSuccess(toastId, "Catégorie créée avec succès.");
      return created;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Impossible de créer la catégorie.";
      appToast.updateError(toastId, message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
}
