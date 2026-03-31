import { Question } from "./question";

export interface Category {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}

export interface SidebarCategory {
  id: number;
  name: string;
  count: number;
}
