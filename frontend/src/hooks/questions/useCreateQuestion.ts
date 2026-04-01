import { useState } from "react";
import { createQuestion } from "../../api/questions";
import type { QuestionFormValues } from "../../schemas";
import { appToast } from "../../utils/toast";

export function useCreateQuestion() {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (values: QuestionFormValues) => {
    const toastId = appToast.loading("Ajout de la question...");
    setIsLoading(true);

    try {
      const created = await createQuestion(values);
      appToast.updateSuccess(toastId, "Question ajoutée avec succès.");
      return created;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Impossible d’ajouter la question.";
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
