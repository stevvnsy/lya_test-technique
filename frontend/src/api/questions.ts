import { apiFetch } from "./client";
import type { QuestionFormValues } from "../schemas";
import type { SearchResult } from "../types";

export function searchQuestions(query: string) {
  const params = new URLSearchParams({ q: query });

  return apiFetch<SearchResult[]>(`/questions/search?${params.toString()}`, {
    method: "GET",
  });
}

export function createQuestion(values: QuestionFormValues) {
  const { categoryId, question, answer } = values;

  return apiFetch(`/categories/${categoryId}/questions`, {
    method: "POST",
    body: {
      question,
      answer,
    },
  });
}
