import { QuestionAccordion } from "./QuestionAccordion";
import { ALL_CATEGORIES_ID, type Category } from "../../types";

interface FaqContentProps {
  categories: Category[];
  activeCategoryId: number;
  openQuestionId: number | null;
  onToggleQuestion: (questionId: number) => void;
}

export function FaqContent({
  categories,
  activeCategoryId,
  openQuestionId,
  onToggleQuestion,
}: FaqContentProps) {
  const activeCategory =
    activeCategoryId === ALL_CATEGORIES_ID
      ? null
      : (categories.find((category) => category.id === activeCategoryId) ?? categories[0]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 dark:border-slate-800">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {activeCategoryId === ALL_CATEGORIES_ID ? "Vue globale" : "Catégorie sélectionnée"}
        </p>

        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {activeCategoryId === ALL_CATEGORIES_ID ? "Toutes les catégories" : activeCategory?.name}
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {activeCategoryId === ALL_CATEGORIES_ID
            ? "Retrouvez toutes les questions de la FAQ, regroupées par catégorie."
            : activeCategory?.description}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-10">
        {activeCategoryId === ALL_CATEGORIES_ID ? (
          categories.map((category) => (
            <section
              key={category.id}
              className="space-y-4 border-t border-slate-200 pt-8 first:border-t-0 first:pt-0 dark:border-slate-800"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {category.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {category.questions.length} question
                  {category.questions.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {category.questions.map((question) => (
                  <QuestionAccordion
                    questionId={`question-${question.id}`}
                    key={question.id}
                    question={question.question}
                    answer={question.answer}
                    isOpen={openQuestionId === question.id}
                    onToggle={() => onToggleQuestion(question.id)}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="flex flex-col gap-4">
            {activeCategory?.questions.map((question) => (
              <QuestionAccordion
                questionId={`question-${question.id}`}
                key={question.id}
                question={question.question}
                answer={question.answer}
                isOpen={openQuestionId === question.id}
                onToggle={() => onToggleQuestion(question.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
