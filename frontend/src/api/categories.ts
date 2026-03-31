import { apiFetch } from "./client";
import type { Category } from "../types";
import type { CategoryFormValues } from "../schemas";

export function getCategories() {
  return apiFetch<Category[]>("/categories", {
    method: "GET",
  });
}

export function getCategoryById(categoryId: number) {
  return apiFetch<Category>(`/categories/${categoryId}`, {
    method: "GET",
  });
}

export function createCategory(values: CategoryFormValues) {
  return apiFetch<Category>("/categories", {
    method: "POST",
    body: values,
  });
}
