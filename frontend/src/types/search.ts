export interface SearchResult {
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
}

export interface SearchResultGroup {
  id: number;
  name: string;
  description: string;
  questions: SearchResult[];
}
