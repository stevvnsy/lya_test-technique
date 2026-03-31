import { z } from "zod";

export const questionSchema = z.object({
  categoryId: z.number("La catégorie est requise"),
  question: z.string().min(1, "La question est requise"),
  answer: z.string().min(1, "La réponse est requise"),
});

export type QuestionFormValues = z.infer<typeof questionSchema>;
