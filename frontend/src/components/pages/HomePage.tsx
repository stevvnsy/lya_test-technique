import { useEffect, useMemo, useState } from "react";
import {
  useCategoriesApi,
  useCategoryDrawer,
  useCreateCategory,
  useCreateQuestion,
  useFaqSearch,
  useMobileSidebar,
  useQuestionDrawer,
} from "../../hooks";
import { ALL_CATEGORIES_ID, SearchResult, SidebarCategory } from "../../types";
import { CategoryFormValues, QuestionFormValues } from "../../schemas";
import { AppShell } from "../templates";
import { FaqContent, SearchOverlay } from "../organisms";
import { Button } from "../atoms";
import { CategoryFormDrawer, QuestionFormDrawer } from "../forms";

export function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number>(ALL_CATEGORIES_ID);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const categoryDrawer = useCategoryDrawer();
  const questionDrawer = useQuestionDrawer();
  const mobileSidebar = useMobileSidebar();

  const createCategoryMutation = useCreateCategory();
  const createQuestionMutation = useCreateQuestion();

  const { data: categories, isLoading, error, reload } = useCategoriesApi();

  const {
    isSearchOpen,
    isSearchLoading,
    searchResults,
    groupedSearchResults,
    openSearch,
    closeSearch,
  } = useFaqSearch({
    categories,
    searchValue,
  });

  const sidebarCategories: SidebarCategory[] = useMemo(
    () => [
      {
        id: ALL_CATEGORIES_ID,
        name: "Toutes les catégories",
        count: categories.reduce((total, category) => total + category.questions.length, 0),
      },
      ...categories.map((category) => ({
        id: category.id,
        name: category.name,
        count: category.questions.length,
      })),
    ],
    [categories]
  );

  const activeCategory = useMemo(
    () =>
      activeCategoryId === ALL_CATEGORIES_ID
        ? null
        : (categories.find((category) => category.id === activeCategoryId) ?? categories[0]),
    [activeCategoryId, categories]
  );

  const allQuestions = useMemo(
    () =>
      categories.flatMap((category) =>
        category.questions.map((question) => ({
          ...question,
          categoryId: category.id,
          categoryName: category.name,
        }))
      ),
    [categories]
  );

  useEffect(() => {
    const currentQuestions =
      activeCategoryId === ALL_CATEGORIES_ID ? allQuestions : (activeCategory?.questions ?? []);

    const hasOpenQuestionInView = currentQuestions.some(
      (question) => question.id === openQuestionId
    );

    if (!hasOpenQuestionInView) {
      const firstQuestionId = currentQuestions[0]?.id ?? null;
      setOpenQuestionId(firstQuestionId);
    }
  }, [activeCategoryId, activeCategory, allQuestions, openQuestionId]);

  const handleSelectSearchResult = (result: SearchResult) => {
    setActiveCategoryId(result.categoryId);
    setOpenQuestionId(result.id);
    setSearchValue("");
    closeSearch();
  };

  const handleToggleQuestion = (questionId: number) => {
    setOpenQuestionId((current) => (current === questionId ? null : questionId));
  };

  const handleOpenQuestionDrawer = () => {
    if (activeCategoryId !== ALL_CATEGORIES_ID) {
      questionDrawer.open(activeCategoryId);
    } else {
      questionDrawer.open("");
    }
  };

  const handleCreateCategory = async (values: CategoryFormValues) => {
    await createCategoryMutation.mutate(values);
    await reload();
    categoryDrawer.close();
  };

  const handleCreateQuestion = async (values: QuestionFormValues) => {
    await createQuestionMutation.mutate(values);
    await reload();
    questionDrawer.close();
  };

  const isDataReady = categories.length > 0;

  return (
    <>
      <AppShell
        categories={sidebarCategories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
        searchValue={searchValue}
        onSearchChange={(value) => {
          setSearchValue(value);
          openSearch();
        }}
        isSearchOpen={isSearchOpen}
        onOpenSearch={openSearch}
        onCloseSearch={closeSearch}
        isMobileSidebarOpen={mobileSidebar.isOpen}
        onOpenMobileSidebar={mobileSidebar.open}
        onCloseMobileSidebar={mobileSidebar.close}
        searchOverlay={
          <SearchOverlay
            query={searchValue}
            results={searchResults}
            groupedResults={groupedSearchResults}
            isLoading={isSearchLoading}
            onSelectResult={handleSelectSearchResult}
          />
        }
        actions={
          <>
            <Button id="action-add-category" variant="secondary" onClick={categoryDrawer.open}>
              Ajouter une catégorie
            </Button>

            <Button id="action-add-question" onClick={handleOpenQuestionDrawer}>
              Ajouter une question
            </Button>
          </>
        }
      >
        {isLoading ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="space-y-4">
              <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-72 animate-pulse rounded bg-slate-100 dark:bg-slate-800/70" />
              <div className="space-y-3 pt-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-20 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800/60"
                  />
                ))}
              </div>
            </div>
          </section>
        ) : error ? (
          <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900/50 dark:bg-slate-900">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Impossible de charger la FAQ
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{error}</p>
              </div>

              <Button onClick={() => void reload()}>Réessayer</Button>
            </div>
          </section>
        ) : isDataReady ? (
          <FaqContent
            categories={categories}
            activeCategoryId={activeCategoryId}
            openQuestionId={openQuestionId}
            onToggleQuestion={handleToggleQuestion}
          />
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Aucune catégorie disponible.
            </p>
          </section>
        )}
      </AppShell>

      <CategoryFormDrawer
        isOpen={categoryDrawer.isOpen}
        onClose={categoryDrawer.close}
        onSubmit={handleCreateCategory}
        isSubmitting={createCategoryMutation.isLoading}
      />

      <QuestionFormDrawer
        isOpen={questionDrawer.isOpen}
        onClose={questionDrawer.close}
        categories={categories}
        initialCategoryId={questionDrawer.initialCategoryId}
        onSubmit={handleCreateQuestion}
        isSubmitting={createQuestionMutation.isLoading}
      />
    </>
  );
}
