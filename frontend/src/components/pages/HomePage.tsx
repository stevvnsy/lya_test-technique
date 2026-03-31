import { useEffect, useMemo, useState } from "react";
import { useCategoryDrawer, useFaqSearch, useMobileSidebar, useQuestionDrawer } from "../../hooks";
import { mockCategories } from "../../mocks/categories";
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

  const categories = mockCategories;

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

  const handleCreateCategory = (values: CategoryFormValues) => {
    console.log("Nouvelle catégorie", values);
    categoryDrawer.close();
  };

  const handleCreateQuestion = (values: QuestionFormValues) => {
    console.log("Nouvelle question", values);
    questionDrawer.close();
  };

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
        <FaqContent
          categories={categories}
          activeCategoryId={activeCategoryId}
          openQuestionId={openQuestionId}
          onToggleQuestion={handleToggleQuestion}
        />
      </AppShell>

      <CategoryFormDrawer
        isOpen={categoryDrawer.isOpen}
        onClose={categoryDrawer.close}
        onSubmit={handleCreateCategory}
      />

      <QuestionFormDrawer
        isOpen={questionDrawer.isOpen}
        onClose={questionDrawer.close}
        categories={categories}
        initialCategoryId={questionDrawer.initialCategoryId}
        onSubmit={handleCreateQuestion}
      />
    </>
  );
}
